-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Services table
create table services (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  duration integer not null default 30, -- minutes
  price integer not null, -- cents (EUR)
  category text not null default 'Corte',
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Barbers table
create table barbers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  bio text,
  photo_url text,
  specialties text[] default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Clients table
create table clients (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text unique not null,
  phone text,
  total_visits integer not null default 0,
  last_visit date,
  created_at timestamptz not null default now()
);

-- Appointments table
create table appointments (
  id uuid primary key default uuid_generate_v4(),
  client_name text not null,
  client_email text not null,
  client_phone text,
  service_id uuid not null references services(id),
  barber_id uuid not null references barbers(id),
  date date not null,
  time time not null,
  status text not null default 'pending' check (status in ('pending','confirmed','completed','cancelled')),
  payment_status text not null default 'unpaid' check (payment_status in ('unpaid','paid','refunded')),
  stripe_payment_intent_id text,
  notes text,
  created_at timestamptz not null default now()
);

-- Index for fast availability queries
create index appointments_date_barber on appointments(date, barber_id);
create index appointments_client_email on appointments(client_email);

-- Seed services
insert into services (name, description, duration, price, category) values
  ('Corte Clásico', 'Corte de cabello tradicional con tijeras y navaja para un acabado impecable', 45, 2500, 'Corte'),
  ('Corte + Barba', 'Combinación premium: corte de cabello y arreglo de barba con navaja', 75, 4000, 'Combo'),
  ('Arreglo de Barba', 'Perfilado y arreglo de barba con navaja caliente y aceites esenciales', 30, 2000, 'Barba'),
  ('Afeitado Clásico', 'Afeitado con navaja caliente, toalla de vapor y productos premium', 45, 3000, 'Barba'),
  ('Corte Fade', 'Degradado preciso con máquina para un look moderno y definido', 60, 3500, 'Corte'),
  ('Tratamiento Capilar', 'Hidratación profunda, masaje capilar y productos de alta gama', 60, 4500, 'Tratamiento');

-- Seed barbers
insert into barbers (name, bio, specialties) values
  ('Marco Reyes', 'Maestro barbero con 15 años de experiencia en técnicas clásicas y modernas', ARRAY['Fade', 'Barba clásica', 'Afeitado con navaja']),
  ('Alejandro Silva', 'Especialista en cortes contemporáneos y diseños artísticos', ARRAY['Diseños', 'Fades', 'Cortes modernos']),
  ('Carlos Mendez', 'Experto en tratamientos capilares y estilos vintage', ARRAY['Tratamientos', 'Estilos vintage', 'Pompadour']);

-- Function to update client stats after appointment
create or replace function update_client_stats()
returns trigger as $$
begin
  if new.status = 'completed' then
    insert into clients (name, email, phone, total_visits, last_visit)
    values (new.client_name, new.client_email, new.client_phone, 1, new.date)
    on conflict (email) do update set
      total_visits = clients.total_visits + 1,
      last_visit = new.date,
      name = new.client_name,
      phone = coalesce(new.client_phone, clients.phone);
  end if;
  return new;
end;
$$ language plpgsql;

create trigger appointment_completed
  after update on appointments
  for each row
  when (old.status != 'completed' and new.status = 'completed')
  execute function update_client_stats();

-- RLS Policies (enable for production)
-- alter table services enable row level security;
-- alter table barbers enable row level security;
-- alter table appointments enable row level security;
-- alter table clients enable row level security;
