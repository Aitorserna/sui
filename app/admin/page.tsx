'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Calendar, Users, DollarSign, Clock, Scissors,
  LayoutDashboard, Settings, LogOut, ChevronDown,
  Plus, Edit, Trash, Check, X, RefreshCw,
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardContent } from '@/components/ui/Card'
import { formatCurrency, formatDate } from '@/lib/utils'
import type { Appointment, Service, Client } from '@/lib/types'

type Tab = 'dashboard' | 'appointments' | 'services' | 'clients'

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmada',
  completed: 'Completada',
  cancelled: 'Cancelada',
}

const STATUS_VARIANTS: Record<string, 'yellow' | 'green' | 'gold' | 'red' | 'gray'> = {
  pending: 'yellow',
  confirmed: 'green',
  completed: 'gold',
  cancelled: 'red',
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [adminKey, setAdminKey] = useState('')
  const [loginError, setLoginError] = useState('')
  const [tab, setTab] = useState<Tab>('dashboard')
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [services, setServices] = useState<Service[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [stats, setStats] = useState({ today_appointments: 0, today_revenue: 0, month_revenue: 0, total_clients: 0, pending_appointments: 0 })
  const [loading, setLoading] = useState(false)
  const [editingService, setEditingService] = useState<Partial<Service> | null>(null)
  const [showServiceForm, setShowServiceForm] = useState(false)

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    'x-admin-key': adminKey,
  }), [adminKey])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [apptRes, statsRes] = await Promise.all([
        fetch('/api/admin/appointments', { headers: headers() }),
        fetch('/api/admin/stats', { headers: headers() }),
      ])
      const apptData = await apptRes.json()
      const statsData = await statsRes.json()
      setAppointments(apptData.appointments || [])
      setStats(statsData)
    } finally {
      setLoading(false)
    }
  }, [headers])

  const loadServices = useCallback(async () => {
    const res = await fetch('/api/admin/services', { headers: headers() })
    const data = await res.json()
    setServices(data.services || [])
  }, [headers])

  const loadClients = useCallback(async () => {
    const res = await fetch('/api/admin/clients', { headers: headers() })
    const data = await res.json()
    setClients(data.clients || [])
  }, [headers])

  useEffect(() => {
    if (!authenticated) return
    loadData()
    loadServices()
    loadClients()
  }, [authenticated, loadData, loadServices, loadClients])

  const login = () => {
    if (password === 'admin123' || password.length > 0) {
      setAdminKey(password)
      setAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Contraseña incorrecta')
    }
  }

  const updateAppointmentStatus = async (id: string, status: string) => {
    await fetch('/api/admin/appointments', {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({ id, status }),
    })
    loadData()
  }

  const saveService = async () => {
    if (!editingService) return
    const method = editingService.id ? 'PATCH' : 'POST'
    await fetch('/api/admin/services', {
      method,
      headers: headers(),
      body: JSON.stringify(editingService),
    })
    setShowServiceForm(false)
    setEditingService(null)
    loadServices()
  }

  const deleteService = async (id: string) => {
    await fetch(`/api/admin/services?id=${id}`, { method: 'DELETE', headers: headers() })
    loadServices()
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-7 h-7 text-black" />
            </div>
            <h1 className="text-white text-2xl font-bold">Panel de Administración</h1>
            <p className="text-white/40 text-sm mt-1">Noir Barber</p>
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-white/10 p-6">
            <div className="mb-4">
              <label className="block text-white/60 text-xs uppercase tracking-wider mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && login()}
                className="w-full bg-zinc-800 border border-white/10 focus:border-gold-500 text-white rounded-lg px-4 py-3 outline-none"
                placeholder="••••••••"
                autoFocus
              />
              {loginError && <p className="text-red-400 text-xs mt-2">{loginError}</p>}
            </div>
            <Button onClick={login} size="lg" className="w-full">
              Entrar
            </Button>
            <p className="text-white/20 text-xs text-center mt-3">Demo: cualquier contraseña funciona</p>
          </div>
        </div>
      </div>
    )
  }

  const navItems: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'appointments', label: 'Citas', icon: Calendar },
    { id: 'services', label: 'Servicios', icon: Scissors },
    { id: 'clients', label: 'Clientes', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-black flex">
      {/* Sidebar */}
      <div className="w-64 bg-zinc-950 border-r border-white/10 flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gold-500 rounded-full flex items-center justify-center">
              <Scissors className="w-4 h-4 text-black" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Noir Barber</p>
              <p className="text-white/30 text-xs">Administrador</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                tab === id
                  ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
              {id === 'appointments' && stats.pending_appointments > 0 && (
                <span className="ml-auto bg-gold-500 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {stats.pending_appointments}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button
            onClick={loadData}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Actualizar
          </button>
          <button
            onClick={() => { setAuthenticated(false); setPassword('') }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Dashboard */}
          {tab === 'dashboard' && (
            <div>
              <h1 className="text-white text-2xl font-bold mb-8">Dashboard</h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Citas hoy', value: stats.today_appointments, icon: Calendar, color: 'text-blue-400' },
                  { label: 'Ingresos hoy', value: formatCurrency(stats.today_revenue), icon: DollarSign, color: 'text-gold-400' },
                  { label: 'Ingresos mes', value: formatCurrency(stats.month_revenue), icon: DollarSign, color: 'text-green-400' },
                  { label: 'Total clientes', value: stats.total_clients, icon: Users, color: 'text-purple-400' },
                ].map((s) => (
                  <Card key={s.label}>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white/40 text-xs uppercase tracking-wider">{s.label}</span>
                        <s.icon className={`w-5 h-5 ${s.color}`} />
                      </div>
                      <p className="text-white text-2xl font-bold">{s.value}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent appointments */}
              <h2 className="text-white font-semibold mb-4">Próximas citas</h2>
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['Cliente', 'Servicio', 'Barbero', 'Fecha', 'Hora', 'Estado', 'Pago', 'Acción'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-white/40 text-xs uppercase tracking-wider font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.slice(0, 10).map((a) => (
                        <tr key={a.id} className="border-b border-white/5 hover:bg-white/2">
                          <td className="px-4 py-3">
                            <div>
                              <p className="text-white font-medium">{a.client_name}</p>
                              <p className="text-white/30 text-xs">{a.client_email}</p>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-white/70">{(a.service as { name?: string } | null)?.name}</td>
                          <td className="px-4 py-3 text-white/70">{(a.barber as { name?: string } | null)?.name}</td>
                          <td className="px-4 py-3 text-white/70">{a.date}</td>
                          <td className="px-4 py-3 text-white/70">{a.time}</td>
                          <td className="px-4 py-3">
                            <Badge variant={STATUS_VARIANTS[a.status] || 'gray'}>
                              {STATUS_LABELS[a.status] || a.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={a.payment_status === 'paid' ? 'green' : a.payment_status === 'refunded' ? 'red' : 'gray'}>
                              {a.payment_status === 'paid' ? 'Pagado' : a.payment_status === 'refunded' ? 'Reembolsado' : 'Sin pagar'}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {a.status === 'pending' && (
                                <>
                                  <button onClick={() => updateAppointmentStatus(a.id, 'confirmed')} className="p-1 text-green-400 hover:bg-green-400/10 rounded" title="Confirmar">
                                    <Check className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => updateAppointmentStatus(a.id, 'cancelled')} className="p-1 text-red-400 hover:bg-red-400/10 rounded" title="Cancelar">
                                    <X className="w-4 h-4" />
                                  </button>
                                </>
                              )}
                              {a.status === 'confirmed' && (
                                <button onClick={() => updateAppointmentStatus(a.id, 'completed')} className="p-1 text-gold-400 hover:bg-gold-400/10 rounded" title="Completar">
                                  <Check className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {appointments.length === 0 && (
                    <p className="text-white/30 text-sm text-center py-8">No hay citas aún</p>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* Appointments */}
          {tab === 'appointments' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-white text-2xl font-bold">Citas</h1>
                <button onClick={loadData} className="text-white/40 hover:text-white/70 transition-colors">
                  <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                </button>
              </div>
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['Cliente', 'Servicio', 'Barbero', 'Fecha', 'Hora', 'Estado', 'Pago', 'Acciones'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-white/40 text-xs uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((a) => (
                        <tr key={a.id} className="border-b border-white/5 hover:bg-white/2">
                          <td className="px-4 py-3">
                            <div>
                              <p className="text-white font-medium">{a.client_name}</p>
                              <p className="text-white/30 text-xs">{a.client_email}</p>
                              {a.client_phone && <p className="text-white/30 text-xs">{a.client_phone}</p>}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-white/70">{(a.service as { name?: string; price?: number } | null)?.name}</td>
                          <td className="px-4 py-3 text-white/70">{(a.barber as { name?: string } | null)?.name}</td>
                          <td className="px-4 py-3 text-white/70 whitespace-nowrap">{a.date}</td>
                          <td className="px-4 py-3 text-white/70">{a.time?.slice(0, 5)}</td>
                          <td className="px-4 py-3">
                            <Badge variant={STATUS_VARIANTS[a.status] || 'gray'}>
                              {STATUS_LABELS[a.status]}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant={a.payment_status === 'paid' ? 'green' : a.payment_status === 'refunded' ? 'red' : 'gray'}>
                              {a.payment_status === 'paid' ? 'Pagado' : a.payment_status === 'refunded' ? 'Reembolsado' : 'Sin pagar'}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-1">
                              {a.status === 'pending' && (
                                <>
                                  <button onClick={() => updateAppointmentStatus(a.id, 'confirmed')} className="px-2 py-1 text-xs text-green-400 border border-green-400/30 hover:bg-green-400/10 rounded transition-colors">
                                    Confirmar
                                  </button>
                                  <button onClick={() => updateAppointmentStatus(a.id, 'cancelled')} className="px-2 py-1 text-xs text-red-400 border border-red-400/30 hover:bg-red-400/10 rounded transition-colors">
                                    Cancelar
                                  </button>
                                </>
                              )}
                              {a.status === 'confirmed' && (
                                <button onClick={() => updateAppointmentStatus(a.id, 'completed')} className="px-2 py-1 text-xs text-gold-400 border border-gold-400/30 hover:bg-gold-400/10 rounded transition-colors">
                                  Completar
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {appointments.length === 0 && (
                    <p className="text-white/30 text-sm text-center py-12">No hay citas</p>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* Services */}
          {tab === 'services' && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-white text-2xl font-bold">Servicios</h1>
                <Button
                  size="sm"
                  onClick={() => { setEditingService({ is_active: true, duration: 45, category: 'Corte' }); setShowServiceForm(true) }}
                >
                  <Plus className="w-4 h-4" /> Nuevo servicio
                </Button>
              </div>

              {showServiceForm && editingService && (
                <Card gold className="mb-6 p-6">
                  <CardContent className="p-0">
                    <h3 className="text-white font-semibold mb-4">{editingService.id ? 'Editar servicio' : 'Nuevo servicio'}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { key: 'name', label: 'Nombre', type: 'text' },
                        { key: 'category', label: 'Categoría', type: 'text' },
                        { key: 'price', label: 'Precio (céntimos)', type: 'number' },
                        { key: 'duration', label: 'Duración (min)', type: 'number' },
                      ].map(({ key, label, type }) => (
                        <div key={key}>
                          <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">{label}</label>
                          <input
                            type={type}
                            value={(editingService as Record<string, unknown>)[key] as string || ''}
                            onChange={(e) => setEditingService({ ...editingService, [key]: type === 'number' ? parseInt(e.target.value) : e.target.value })}
                            className="w-full bg-zinc-800 border border-white/10 focus:border-gold-500 text-white rounded-lg px-3 py-2 text-sm outline-none"
                          />
                        </div>
                      ))}
                      <div className="sm:col-span-2">
                        <label className="block text-white/50 text-xs uppercase tracking-wider mb-1.5">Descripción</label>
                        <textarea
                          value={editingService.description || ''}
                          onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                          className="w-full bg-zinc-800 border border-white/10 focus:border-gold-500 text-white rounded-lg px-3 py-2 text-sm outline-none resize-none"
                          rows={2}
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 mt-4">
                      <Button size="sm" onClick={saveService}>Guardar</Button>
                      <Button size="sm" variant="ghost" onClick={() => { setShowServiceForm(false); setEditingService(null) }}>Cancelar</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((s) => (
                  <Card key={s.id} className={s.is_active ? '' : 'opacity-50'}>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <span className="text-xs px-2 py-1 bg-gold-500/10 text-gold-400 rounded">{s.category}</span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => { setEditingService(s); setShowServiceForm(true) }}
                            className="p-1.5 text-white/40 hover:text-white/70 hover:bg-white/5 rounded transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteService(s.id)}
                            className="p-1.5 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                          >
                            <Trash className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-white font-semibold mb-1">{s.name}</h3>
                      <p className="text-white/40 text-xs mb-3 leading-relaxed">{s.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-white/30 text-xs">
                          <Clock className="w-3 h-3" /> {s.duration} min
                        </div>
                        <span className="text-gold-400 font-bold">{formatCurrency(s.price)}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Clients */}
          {tab === 'clients' && (
            <div>
              <h1 className="text-white text-2xl font-bold mb-8">Clientes</h1>
              <Card>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['Cliente', 'Email', 'Teléfono', 'Visitas', 'Última visita'].map((h) => (
                          <th key={h} className="px-4 py-3 text-left text-white/40 text-xs uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {clients.map((c) => (
                        <tr key={c.id} className="border-b border-white/5 hover:bg-white/2">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 text-xs font-bold shrink-0">
                                {c.name[0]}
                              </div>
                              <span className="text-white font-medium">{c.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-white/60">{c.email}</td>
                          <td className="px-4 py-3 text-white/60">{c.phone || '—'}</td>
                          <td className="px-4 py-3">
                            <span className="text-gold-400 font-semibold">{c.total_visits}</span>
                          </td>
                          <td className="px-4 py-3 text-white/60">{c.last_visit || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {clients.length === 0 && (
                    <p className="text-white/30 text-sm text-center py-12">No hay clientes aún</p>
                  )}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
