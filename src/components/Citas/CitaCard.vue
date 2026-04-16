<script setup lang="ts">
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'
import { Play } from 'lucide-vue-next'
import { formatHora } from '@/utils/format'
import type { Cita, EstadoCita, BadgeVariant } from '@/Types'

const props = defineProps<{
  cita: Cita
}>()

const emit = defineEmits<{
  viewPatient: [pacienteId: string]
  startConsultation: [citaId: string]
  changeStatus: [citaId: string, status: EstadoCita]
}>()

function getEstadoBadgeVariant(estado: EstadoCita): BadgeVariant {
  const variants: Record<EstadoCita, BadgeVariant> = {
    programada: 'info',
    en_espera: 'warning',
    finalizada: 'success',
    cancelada: 'danger'
  }
  return variants[estado]
}

function getEstadoLabel(estado: EstadoCita): string {
  const labels: Record<EstadoCita, string> = {
    programada: 'Programada',
    en_espera: 'En Espera',
    finalizada: 'Finalizada',
    cancelada: 'Cancelada'
  }
  return labels[estado]
}
</script>

<template>
  <div class="p-4 hover:bg-neutral-50 transition-colors duration-150">
    <div class="flex items-start gap-4">
      <!-- Time -->
      <div class="shrink-0 w-20 text-center">
        <p class="text-lg font-bold text-neutral-900">{{ formatHora(cita.hora) }}</p>
      </div>

      <!-- Timeline visual -->
      <div class="hidden sm:flex flex-col items-center shrink-0">
        <div
          :class="[
            'w-3 h-3 rounded-full border-2',
            cita.estado === 'finalizada' ? 'bg-emerald-500 border-emerald-500' :
            cita.estado === 'en_espera' ? 'bg-amber-500 border-amber-500' :
            cita.estado === 'cancelada' ? 'bg-red-500 border-red-500' :
            'bg-white border-primary-500'
          ]"
        />
        <div class="w-0.5 h-16 bg-neutral-200 -mt-px" />
      </div>

      <!-- Appointment content -->
      <div class="flex-1 min-w-0">
        <div class="bg-neutral-50 rounded-xl p-4 border border-neutral-200 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div class="min-w-0">
              <button
                class="font-semibold text-neutral-900 hover:text-primary-500 transition-colors text-left"
                @click="emit('viewPatient', cita.pacienteId)"
              >
                {{ cita.pacienteNombre }}
              </button>
              <p class="text-sm text-neutral-600 mt-1">{{ cita.motivo }}</p>
              <div class="mt-2">
                <Badge :variant="getEstadoBadgeVariant(cita.estado)">
                  {{ getEstadoLabel(cita.estado) }}
                </Badge>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-2 shrink-0">
              <Button
                v-if="cita.estado === 'en_espera'"
                @click="emit('startConsultation', cita.id)"
                size="sm"
              >
                <Play class="w-4 h-4" />
                Iniciar Consulta
              </Button>
              <Button
                v-else-if="cita.estado === 'programada'"
                @click="emit('changeStatus', cita.id, 'en_espera')"
                variant="secondary"
                size="sm"
              >
                Marcar en espera
              </Button>
              <Button
                v-else-if="cita.estado === 'finalizada'"
                variant="ghost"
                size="sm"
                disabled
              >
                Completada
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
