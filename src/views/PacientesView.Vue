<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { usePacienteStore } from "@/stores/pacienteStore";
import Button from "@/components/ui/Button.vue";
import PacientesTable from "@/components/Pacientes/PacientesTable.vue";
import { Search, Plus, UserX } from "lucide-vue-next";

const emit = defineEmits<{
  navigate: [view: string, data?: unknown];
}>();

const pacienteStore = usePacienteStore();
const { pacientesFiltrados, totalPacientes, filtros } =
  storeToRefs(pacienteStore);

const mostrarFormulario = ref(false);

function verHistorial(pacienteId: string) {
  emit("navigate", "historial", { pacienteId });
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h1 class="text-2xl font-bold text-neutral-900">
          Directorio de Pacientes
        </h1>
        <p class="text-neutral-500 mt-1">
          {{ totalPacientes }} pacientes registrados
        </p>
      </div>
      <Button @click="mostrarFormulario = true" size="md">
        <Plus class="w-4 h-4" />
        Registrar Nuevo
      </Button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-4">
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Search -->
        <div class="relative flex-1 group">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-10"
          >
            <Search
              class="w-5 h-5 text-neutral-400 group-focus-within:text-primary-500 transition-colors"
            />
          </div>

          <input
            type="text"
            placeholder="Buscar por nombre o cédula..."
            class="block w-full pl-11 pr-4 py-2.5 bg-white border border-neutral-200 rounded-xl text-sm placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all shadow-sm"
            @input="
              pacienteStore.setBusqueda(
                ($event.target as HTMLInputElement).value,
              )
            "
          />
        </div>

        <!-- Last visit filter -->
        <select
          :value="filtros.ultimaVisita"
          @change="
            pacienteStore.setFiltroUltimaVisita(
              ($event.target as HTMLSelectElement).value as
                | 'todos'
                | 'hoy'
                | 'semana'
                | 'mes',
            )
          "
          class="px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all duration-200 min-w-[180px]"
        >
          <option value="todos">Todas las visitas</option>
          <option value="hoy">Visitaron hoy</option>
          <option value="semana">Esta semana</option>
          <option value="mes">Este mes</option>
        </select>
      </div>
    </div>

    <!-- Patients Table -->
    <div
      class="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden"
    >
      <!-- Empty State -->
      <div
        v-if="pacientesFiltrados.length === 0"
        class="py-16 px-4 text-center"
      >
        <div
          class="w-16 h-16 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4"
        >
          <UserX class="w-8 h-8 text-neutral-400" />
        </div>
        <h3 class="text-lg font-medium text-neutral-900 mb-1">
          No se encontraron pacientes
        </h3>
        <p class="text-neutral-500 mb-4">
          Intenta ajustar los filtros de búsqueda o registra un nuevo paciente.
        </p>
        <Button
          @click="pacienteStore.setBusqueda('')"
          variant="secondary"
          size="sm"
        >
          Limpiar filtros
        </Button>
      </div>

      <!-- Table -->
      <PacientesTable v-else @view-history="verHistorial" />
    </div>
  </div>
</template>
