-- Le Barber: update services, single barber, deposit-only payments

-- Clear and reseed services
delete from services;
insert into services (name, description, duration, price, category) values
  ('Corte Clásico',    'Corte de cabello tradicional con tijeras, acabado impecable y producto de peinado incluido', 45,  1200, 'Corte'),
  ('Fade',             'Degradado preciso a máquina con transición perfecta. El sello de la casa',                  60,  1200, 'Corte'),
  ('Corte + Barba',    'Corte de cabello más arreglo y perfilado de barba. El combo más popular',                   75,  1700, 'Combo'),
  ('Corte + Cejas',    'Corte de cabello más depilación y perfilado de cejas',                                      60,  1500, 'Combo'),
  ('Arreglo de Barba', 'Perfilado, arreglo y definición de barba con navaja y aceites',                             30,   500, 'Barba'),
  ('Cejas',            'Depilación y perfilado de cejas para un look limpio y definido',                             15,   300, 'Cejas'),
  ('Cuidado Capilar',  'Diagnóstico y tratamiento del cuero cabelludo, hidratación y masaje',                       60,  1200, 'Tratamiento'),
  ('Peinado Masculino','Asesoramiento de estilo y peinado con productos profesionales',                              30,  1000, 'Peinado');

-- Clear and reseed barbers (only Marcos)
delete from barbers;
insert into barbers (name, bio, specialties) values
  ('Marcos Martínez',
   'Barbero profesional especialista en fades, cortes clásicos, cejas y barbas. También experto en cuidado capilar y peinado masculino. La disponibilidad varía según la semana — tu cita queda confirmada una vez que Marcos la aprueba.',
   ARRAY['Fade', 'Corte Clásico', 'Cejas', 'Barba', 'Cuidado Capilar', 'Peinado Masculino']);
