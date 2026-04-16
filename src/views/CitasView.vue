<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAgendaStore } from '@/stores/agendaStore'
import NuevaCitaModal from '@/components/NuevaCitaModal.vue'
import Button from '@/components/ui/Button.vue'
import CitaCard from '@/components/Citas/CitaCard.vue'
import { ChevronLeft, ChevronRight, Calendar, Clock, User, CalendarX, Plus } from 'lucide-vue-next'
import type { EstadoCita } from '@/Types'

const emit = defineEmits<{
  navigate: [view: string, data?: unknown]
}>()

const agendaStore = useAgendaStore()
const { citasDelDia, resumenDelDia, fechaFormateada, esHoy, filtros } = storeToRefs(agendaStore)
const mostrarModalNuevaCita = ref(false)

function iniciarConsulta(citaId: string) {
  agendaStore.iniciarConsulta(citaId)
  emit('navigate', 'consulta', { citaId })
}

function handleChangeStatus(citaId: string, status: EstadoCita) {
  agendaStore.cambiarEstadoCita(citaId, status)
}

function handleViewPatient(pacienteId: string) {
  emit('navigate', 'paciente', { id: pacienteId })
}

function handleNuevaCita(form: {
  pacienteNombre: string
  fecha: string
  hora: string
  tipo: string
  motivo: string
}) {
  agendaStore.agregarCita(form)
  mostrarModalNuevaCita.value = false
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header with date selector -->
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">Agenda de Citas</h1>
        <p class="text-neutral-500 mt-1 capitalize">{{ fechaFormateada }}</p>
      </div>

      <!-- Navigation controls -->
      <div class="flex items-center gap-3">
        <Button
          v-if="!esHoy"
          @click="agendaStore.irAHoy()"
          variant="secondary"
          size="sm"
        >
          Hoy
        </Button>

        <div class="flex items-center bg-white rounded-lg border border-neutral-200 shadow-sm">
          <button
            @click="agendaStore.diaAnterior()"
            class="p-2.5 hover:bg-neutral-50 rounded-l-lg transition-colors"
          >
            <ChevronLeft class="w-5 h-5 text-neutral-600" />
          </button>
          <div class="px-4 py-2 border-x border-neutral-200 flex items-center gap-2">
            <Calendar class="w-4 h-4 text-neutral-400" />
            <input
              type="date"
              :value="filtros.fecha.toISOString().split('T')[0]"
              @change="agendaStore.setFecha(new Date(($event.target as HTMLInputElement).value))"
              class="text-sm text-neutral-700 bg-transparent border-none focus:outline-none cursor-pointer"
            />
          </div>
          <button
            @click="agendaStore.diaSiguiente()"
            class="p-2.5 hover:bg-neutral-50 rounded-r-lg transition-colors"
          >
            <ChevronRight class="w-5 h-5 text-neutral-600" />
          </button>
        </div>

        <!-- View selector -->
        <div class="hidden sm:flex items-center bg-white rounded-lg border border-neutral-200 shadow-sm p-1">
          <button
            v-for="vista in ['dia', 'semana', 'mes'] as const"
            :key="vista"
            @click="agendaStore.setVista(vista)"
            :class="[
              'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
              filtros.vista === vista
                ? 'bg-primary-500 text-white'
                : 'text-neutral-600 hover:bg-neutral-100'
            ]"
          >
            {{ vista === 'dia' ? 'Día' : vista === 'semana' ? 'Semana' : 'Mes' }}
          </button>
        </div>

        <!-- Nueva Cita button -->
        <Button
          @click="mostrarModalNuevaCita = true"
          size="sm"
        >
          <Plus class="w-4 h-4" />
          Nueva cita
        </Button>
      </div>
    </div>

    <!-- Day summary -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Calendar class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-neutral-900">{{ resumenDelDia.total }}</p>
            <p class="text-sm text-neutral-500">Total citas</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
            <Clock class="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-neutral-900">{{ resumenDelDia.enEspera }}</p>
            <p class="text-sm text-neutral-500">En espera</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
            <User class="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-neutral-900">{{ resumenDelDia.finalizadas }}</p>
            <p class="text-sm text-neutral-500">Finalizadas</p>
          </div>
        </div>
      </div>
      <div class="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
            <Calendar class="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p class="text-2xl font-bold text-neutral-900">{{ resumenDelDia.programadas }}</p>
            <p class="text-sm text-neutral-500">Programadas</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Appointments timeline -->
    <div class="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
      <div class="p-4 border-b border-neutral-200">
        <h2 class="font-semibold text-neutral-900">Citas del día</h2>
      </div>

      <!-- Empty State -->
      <div
        v-if="citasDelDia.length === 0"
        class="py-16 px-4 text-center"
      >
        <div class="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
          <CalendarX class="w-8 h-8 text-neutral-400" />
        </div>
        <h3 class="text-lg font-medium text-neutral-900 mb-1">Sin citas programadas</h3>
        <p class="text-neutral-500">
          No hay citas para este día. Selecciona otra fecha o agenda una nueva cita.
        </p>
      </div>

      <!-- Appointments list -->
      <div v-else class="divide-y divide-neutral-100">
        <TransitionGroup name="cita">
          <CitaCard
            v-for="cita in citasDelDia"
            :key="cita.id"
            :cita="cita"
            @view-patient="handleViewPatient"
            @start-consultation="iniciarConsulta"
            @change-status="handleChangeStatus"
          />
        </TransitionGroup>
      </div>
    </div>

    <!-- Modal Nueva Cita -->
    <NuevaCitaModal
      v-if="mostrarModalNuevaCita"
      @close="mostrarModalNuevaCita = false"
      @save="handleNuevaCita"
    />
  </div>
</template>

<style scoped>
.cita-enter-active,
.cita-leave-active {
  transition: all 0.4s ease;
}

.cita-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.cita-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.cita-move {
  transition: transform 0.4s ease;
}
</style>