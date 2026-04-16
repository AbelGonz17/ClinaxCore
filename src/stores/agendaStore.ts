import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Cita, EstadoCita, FiltrosCita, VistaCita, ResumenCitas } from '@/Types'
import { formatFechaCompleta } from '@/utils/format'

const hoy = new Date()
const mockCitas: Cita[] = [
  {
    id: '1',
    pacienteId: '1',
    pacienteNombre: 'María García López',
    fecha: hoy,
    hora: '08:00',
    motivo: 'Consulta de control - Hipertensión',
    estado: 'finalizada'
  },
  {
    id: '2',
    pacienteId: '2',
    pacienteNombre: 'Juan Pérez Martínez',
    fecha: hoy,
    hora: '09:00',
    motivo: 'Seguimiento Post-Operatorio',
    estado: 'finalizada'
  },
  {
    id: '3',
    pacienteId: '3',
    pacienteNombre: 'Ana Rodríguez Sánchez',
    fecha: hoy,
    hora: '09:30',
    motivo: 'Revisión de exámenes de laboratorio',
    estado: 'en_espera'
  },
  {
    id: '4',
    pacienteId: '4',
    pacienteNombre: 'Carlos Méndez Torres',
    fecha: hoy,
    hora: '10:00',
    motivo: 'Control de diabetes',
    estado: 'programada'
  },
  {
    id: '5',
    pacienteId: '5',
    pacienteNombre: 'Laura Jiménez Vargas',
    fecha: hoy,
    hora: '10:30',
    motivo: 'Primera consulta - Dolor de espalda',
    estado: 'programada'
  },
  {
    id: '6',
    pacienteId: '1',
    pacienteNombre: 'Roberto Fernández',
    fecha: hoy,
    hora: '11:00',
    motivo: 'Certificado médico',
    estado: 'cancelada'
  },
  {
    id: '7',
    pacienteId: '2',
    pacienteNombre: 'Patricia Núñez',
    fecha: hoy,
    hora: '11:30',
    motivo: 'Evaluación dermatológica',
    estado: 'programada'
  },
  {
    id: '8',
    pacienteId: '3',
    pacienteNombre: 'Miguel Ángel Reyes',
    fecha: hoy,
    hora: '14:00',
    motivo: 'Control mensual - Asma',
    estado: 'programada'
  },
  {
    id: '9',
    pacienteId: '4',
    pacienteNombre: 'Carmen Lucia Díaz',
    fecha: hoy,
    hora: '15:00',
    motivo: 'Renovación de receta médica',
    estado: 'programada'
  }
]

export const useAgendaStore = defineStore('agenda', () => {
  const citas = ref<Cita[]>(mockCitas)
  const filtros = ref<FiltrosCita>({
    fecha: new Date(),
    vista: 'dia'
  })
  const isLoading = ref(false)
  const citaSeleccionada = ref<Cita | null>(null)

  const citasDelDia = computed(() => {
    const fechaFiltro = new Date(filtros.value.fecha)
    fechaFiltro.setHours(0, 0, 0, 0)

    return citas.value
      .filter(cita => {
        const fechaCita = new Date(cita.fecha)
        fechaCita.setHours(0, 0, 0, 0)
        return fechaCita.getTime() === fechaFiltro.getTime()
      })
      .sort((a, b) => a.hora.localeCompare(b.hora))
  })

  const resumenDelDia = computed<ResumenCitas>(() => {
    const citasDia = citasDelDia.value
    return {
      total: citasDia.length,
      programadas: citasDia.filter(c => c.estado === 'programada').length,
      enEspera: citasDia.filter(c => c.estado === 'en_espera').length,
      finalizadas: citasDia.filter(c => c.estado === 'finalizada').length,
      canceladas: citasDia.filter(c => c.estado === 'cancelada').length
    }
  })

  const fechaFormateada = computed(() => formatFechaCompleta(filtros.value.fecha))

  const esHoy = computed(() => {
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)
    const fechaFiltro = new Date(filtros.value.fecha)
    fechaFiltro.setHours(0, 0, 0, 0)
    return hoy.getTime() === fechaFiltro.getTime()
  })

  function setFecha(fecha: Date) {
    filtros.value.fecha = fecha
  }

  function setVista(vista: VistaCita) {
    filtros.value.vista = vista
  }

  function irAHoy() {
    filtros.value.fecha = new Date()
  }

  function diaAnterior() {
    const nuevaFecha = new Date(filtros.value.fecha)
    nuevaFecha.setDate(nuevaFecha.getDate() - 1)
    filtros.value.fecha = nuevaFecha
  }

  function diaSiguiente() {
    const nuevaFecha = new Date(filtros.value.fecha)
    nuevaFecha.setDate(nuevaFecha.getDate() + 1)
    filtros.value.fecha = nuevaFecha
  }

  function cambiarEstadoCita(citaId: string, nuevoEstado: EstadoCita) {
    const cita = citas.value.find(c => c.id === citaId)
    if (cita) {
      cita.estado = nuevoEstado
    }
  }

  function iniciarConsulta(citaId: string) {
    cambiarEstadoCita(citaId, 'en_espera')
    const cita = citas.value.find(c => c.id === citaId)
    if (cita) {
      citaSeleccionada.value = cita
    }
  }

  function finalizarConsulta(citaId: string) {
    cambiarEstadoCita(citaId, 'finalizada')
    citaSeleccionada.value = null
  }

  // ── Nueva función ──────────────────────────────────────────
  function agregarCita(form: {
    pacienteNombre: string
    fecha: string
    hora: string
    tipo: string
    motivo: string
  }) {
    const nuevaId = (citas.value.length + 1).toString()

    const nuevaCita: Cita = {
      id: nuevaId,
      pacienteId: crypto.randomUUID(),
      pacienteNombre: form.pacienteNombre,
      fecha: new Date(form.fecha + 'T00:00:00'),
      hora: form.hora,
      motivo: `${form.tipo} - ${form.motivo}`,
      estado: 'programada'
    }

    citas.value.push(nuevaCita)

    // Navegar a la fecha de la nueva cita automáticamente
    filtros.value.fecha = nuevaCita.fecha
  }
  // ──────────────────────────────────────────────────────────

  return {
    citas,
    filtros,
    isLoading,
    citaSeleccionada,
    citasDelDia,
    resumenDelDia,
    fechaFormateada,
    esHoy,
    setFecha,
    setVista,
    irAHoy,
    diaAnterior,
    diaSiguiente,
    cambiarEstadoCita,
    iniciarConsulta,
    finalizarConsulta,
    agregarCita
  }
})