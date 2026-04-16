<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { usePacienteStore } from '@/stores/pacienteStore'
import Badge from '@/components/ui/Badge.vue'
import { Phone, ChevronRight } from 'lucide-vue-next'
import { getInitials, formatFecha } from '@/utils/format'

const emit = defineEmits<{
  viewHistory: [pacienteId: string]
}>()

const pacienteStore = usePacienteStore()
const { pacientesFiltrados } = storeToRefs(pacienteStore)
</script>

<template>
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="bg-neutral-50 border-b border-neutral-200">
          <th class="text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider px-6 py-4">
            Paciente
          </th>
          <th class="text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider px-6 py-4">
            Edad / Sexo
          </th>
          <th class="text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider px-6 py-4 hidden md:table-cell">
            Teléfono
          </th>
          <th class="text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider px-6 py-4 hidden lg:table-cell">
            Última Visita
          </th>
          <th class="text-left text-xs font-semibold text-neutral-600 uppercase tracking-wider px-6 py-4">
            Estado
          </th>
          <th class="text-right text-xs font-semibold text-neutral-600 uppercase tracking-wider px-6 py-4">
            Acciones
          </th>
        </tr>
      </thead>
      <TransitionGroup
        tag="tbody"
        name="list"
        class="divide-y divide-neutral-100"
      >
        <tr
          v-for="paciente in pacientesFiltrados"
          :key="paciente.id"
          @click="emit('viewHistory', paciente.id)"
          class="hover:bg-neutral-50 cursor-pointer transition-colors duration-150"
        >
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
                :class="paciente.sexo === 'F' ? 'bg-pink-100 text-pink-700' : 'bg-blue-100 text-blue-700'"
              >
                {{ getInitials(paciente.nombre) }}
              </div>
              <div class="min-w-0">
                <p class="font-medium text-neutral-900 truncate">{{ paciente.nombre }}</p>
                <p class="text-sm text-neutral-500 truncate">{{ paciente.cedula }}</p>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <span class="text-neutral-900">{{ paciente.edad }} años</span>
            <span class="text-neutral-400 mx-1">/</span>
            <span class="text-neutral-600">{{ paciente.sexo === 'M' ? 'Masculino' : 'Femenino' }}</span>
          </td>
          <td class="px-6 py-4 hidden md:table-cell">
            <div class="flex items-center gap-2 text-neutral-600">
              <Phone class="w-4 h-4 text-neutral-400" />
              {{ paciente.telefono }}
            </div>
          </td>
          <td class="px-6 py-4 hidden lg:table-cell text-neutral-600">
            {{ formatFecha(paciente.ultimaVisita) }}
          </td>
          <td class="px-6 py-4">
            <Badge :variant="paciente.estado === 'en_tratamiento' ? 'info' : 'success'">
              {{ paciente.estado === 'en_tratamiento' ? 'En Tratamiento' : 'Alta' }}
            </Badge>
          </td>
          <td class="px-6 py-4 text-right">
            <button
              class="p-2 rounded-lg text-neutral-400 hover:text-primary-500 hover:bg-primary-50 transition-colors"
              @click.stop="emit('viewHistory', paciente.id)"
            >
              <ChevronRight class="w-5 h-5" />
            </button>
          </td>
        </tr>
      </TransitionGroup>
    </table>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}

.list-move {
  transition: transform 0.3s ease;
}
</style>
