import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Paciente, FiltrosPaciente } from '@/Types'

// Mock data
const mockPacientes: Paciente[] = [
  {
    id: '1',
    nombre: 'María García López',
    cedula: '001-1234567-8',
    edad: 45,
    sexo: 'F',
    telefono: '809-555-1234',
    estado: 'en_tratamiento',
    ultimaVisita: new Date(),
    fechaRegistro: new Date('2024-01-15')
  },
  {
    id: '2',
    nombre: 'Juan Pérez Martínez',
    cedula: '002-9876543-2',
    edad: 32,
    sexo: 'M',
    telefono: '809-555-5678',
    estado: 'alta',
    ultimaVisita: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    fechaRegistro: new Date('2023-11-20')
  },
  {
    id: '3',
    nombre: 'Ana Rodríguez Sánchez',
    cedula: '003-5555555-5',
    edad: 28,
    sexo: 'F',
    telefono: '809-555-9012',
    estado: 'en_tratamiento',
    ultimaVisita: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    fechaRegistro: new Date('2024-02-10')
  },
  {
    id: '4',
    nombre: 'Carlos Méndez Torres',
    cedula: '004-7777777-7',
    edad: 58,
    sexo: 'M',
    telefono: '809-555-3456',
    estado: 'en_tratamiento',
    ultimaVisita: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    fechaRegistro: new Date('2023-08-05')
  },
  {
    id: '5',
    nombre: 'Laura Jiménez Vargas',
    cedula: '005-8888888-8',
    edad: 41,
    sexo: 'F',
    telefono: '809-555-7890',
    estado: 'alta',
    ultimaVisita: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    fechaRegistro: new Date('2023-06-12')
  }
]

export const usePacienteStore = defineStore('paciente', () => {
  // Inicializar desde LocalStorage o usar Mocks
  const inicializarPacientes = () => {
    const guardados = localStorage.getItem('directorio_pacientes')
    if (guardados) {
      try {
        const parseados = JSON.parse(guardados)
        // Convertir strings de fecha a objetos Date para que el store funcione igual
        return parseados.map((p: any) => ({
          ...p,
          ultimaVisita: new Date(p.ultimaVisita),
          fechaRegistro: new Date(p.fechaRegistro)
        }))
      } catch (e) {
        console.error("Error parseando localStorage", e)
      }
    }
    return mockPacientes
  }

  const pacientes = ref<any[]>(inicializarPacientes())
  
  const filtros = ref<FiltrosPaciente>({
    busqueda: '',
    ultimaVisita: 'todos'
  })
  const isLoading = ref(false)

  // Vigilar cambios y guardar en LocalStorage automáticamente
  watch(pacientes, (nuevosPacientes) => {
    localStorage.setItem('directorio_pacientes', JSON.stringify(nuevosPacientes))
  }, { deep: true })

  const pacientesFiltrados = computed(() => {
    let resultado = [...pacientes.value]

    if (filtros.value.busqueda.trim()) {
      const busqueda = filtros.value.busqueda.toLowerCase()
      resultado = resultado.filter(
        p =>
          p.nombre.toLowerCase().includes(busqueda) ||
          p.cedula.toLowerCase().includes(busqueda)
      )
    }

    const ahora = new Date()
    const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate())
    
    if (filtros.value.ultimaVisita === 'hoy') {
      resultado = resultado.filter(p => {
        const visita = new Date(p.ultimaVisita)
        return visita >= hoy
      })
    } else if (filtros.value.ultimaVisita === 'semana') {
      const inicioSemana = new Date(hoy)
      inicioSemana.setDate(hoy.getDate() - 7)
      resultado = resultado.filter(p => new Date(p.ultimaVisita) >= inicioSemana)
    } else if (filtros.value.ultimaVisita === 'mes') {
      const inicioMes = new Date(hoy)
      inicioMes.setMonth(hoy.getMonth() - 1)
      resultado = resultado.filter(p => new Date(p.ultimaVisita) >= inicioMes)
    }

    return resultado
  })

  const totalPacientes = computed(() => pacientes.value.length)

  function setBusqueda(valor: string) {
    filtros.value.busqueda = valor
  }

  function setFiltroUltimaVisita(valor: FiltrosPaciente['ultimaVisita']) {
    filtros.value.ultimaVisita = valor
  }

  function agregarPaciente(datosPaciente: any) {
    const index = pacientes.value.findIndex(p => 
      p.cedula !== '---' && p.cedula !== 'Sin registro' && p.cedula === datosPaciente.cedula
    );

    if (index !== -1) {
      pacientes.value[index] = {
        ...pacientes.value[index],
        ...datosPaciente,
        ultimaVisita: new Date()
      };
    } else {
      const nuevoPaciente = {
        ...datosPaciente,
        id: datosPaciente.id || crypto.randomUUID(), 
        fechaRegistro: new Date(),
        ultimaVisita: new Date()
      };
      pacientes.value.unshift(nuevoPaciente);
    }
  }

  return {
    pacientes,
    filtros,
    isLoading,
    pacientesFiltrados,
    totalPacientes,
    setBusqueda,
    setFiltroUltimaVisita,
    agregarPaciente
  }
})