import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Cita, EstadoCita, FiltrosCita, VistaCita, ResumenCitas } from '@/Types'
import { formatFechaCompleta } from '@/utils/format'

const STORAGE_KEY = 'clinax_citas'

function cargarCitasDeStorage(): Cita[] {
  const guardado = localStorage.getItem(STORAGE_KEY)
  if (!guardado) return []
  
  try {
    const citas = JSON.parse(guardado) as Cita[]
    // Restaurar los objetos Date
    return citas.map(cita => ({
      ...cita,
      fecha: new Date(cita.fecha)
    }))
  } catch (e) {
    console.error("Error al cargar citas de localStorage", e)
    return []
  }
}

function guardarCitasEnStorage(citas: Cita[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(citas))
}

export const useAgendaStore = defineStore('agenda', () => {
  const citas = ref<Cita[]>(cargarCitasDeStorage())
  
  // Guardar en localStorage cada vez que haya un cambio
  watch(citas, (nuevasCitas) => {
    guardarCitasEnStorage(nuevasCitas)
  }, { deep: true })

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
    edad?: string
    sexo?: string
    telefonoCuidador?: string
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
      edad: form.edad,
      sexo: form.sexo,
      telefonoCuidador: form.telefonoCuidador,
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