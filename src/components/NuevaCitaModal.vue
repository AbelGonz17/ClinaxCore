<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/ui/Button.vue'
import { X, CalendarPlus, Check } from 'lucide-vue-next'
import type { EstadoCita } from '@/Types'

const emit = defineEmits<{
  close: []
  save: [cita: NuevaCitaForm]
}>()

interface NuevaCitaForm {
  pacienteNombre: string
  fecha: string
  hora: string
  tipo: string
  motivo: string
}

const tipos = [
  'Primera consulta', 'Control', 'Seguimiento',
  'Urgencia', 'Procedimiento', 'Laboratorio'
]

const form = ref<NuevaCitaForm>({
  pacienteNombre: '',
  fecha: new Date().toISOString().split('T')[0] || '', 
  hora: '09:00',
  tipo: 'Primera consulta',
  motivo: ''
})

function handleSubmit() {
  if (!form.value.pacienteNombre || !form.value.motivo) return
  emit('save', { ...form.value })
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      @click.self="emit('close')"
    >
      <div class="bg-white rounded-2xl border border-neutral-200 shadow-xl w-full max-w-lg">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
              <CalendarPlus class="w-5 h-5 text-blue-600" />
            </div>
            <h2 class="text-base font-semibold text-neutral-900">Nueva cita</h2>
          </div>
          <button
            @click="emit('close')"
            class="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Body -->
        <div class="px-6 py-5 flex flex-col gap-4">
          <!-- Paciente -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-neutral-700">Paciente</label>
            <input
              v-model="form.pacienteNombre"
              type="text"
              placeholder="Buscar paciente por nombre o cédula..."
              class="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
            />
          </div>

          <!-- Fecha y hora -->
          <div class="grid grid-cols-2 gap-3">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-neutral-700">Fecha</label>
              <input
                v-model="form.fecha"
                type="date"
                class="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
              />
            </div>
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-medium text-neutral-700">Hora</label>
              <input
                v-model="form.hora"
                type="time"
                class="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500"
              />
            </div>
          </div>

          <!-- Tipo de consulta -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-neutral-700">Tipo de consulta</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="tipo in tipos"
                :key="tipo"
                @click="form.tipo = tipo"
                :class="[
                  'px-3 py-2 text-xs rounded-lg border transition-all duration-150 text-center',
                  form.tipo === tipo
                    ? 'bg-blue-50 border-blue-400 text-blue-700 font-medium'
                    : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50'
                ]"
              >
                {{ tipo }}
              </button>
            </div>
          </div>

          <!-- Motivo -->
          <div class="flex flex-col gap-1.5">
            <label class="text-sm font-medium text-neutral-700">Motivo de consulta</label>
            <textarea
              v-model="form.motivo"
              rows="3"
              placeholder="Describe el motivo de la cita..."
              class="w-full px-3 py-2 text-sm rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 resize-none"
            />
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-end gap-2 px-6 py-4 border-t border-neutral-200">
          <Button variant="secondary" size="sm" @click="emit('close')">
            Cancelar
          </Button>
          <Button size="sm" @click="handleSubmit">
            <Check class="w-4 h-4" />
            Agendar cita
          </Button>
        </div>
      </div>
    </div>
  </Teleport>
</template>