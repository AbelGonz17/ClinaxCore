<script setup lang="ts">
import { ref } from "vue";
import Button from "@/components/ui/Button.vue";
import Modal from "@/components/ui/Modal.vue";
import { CalendarPlus, Check } from "lucide-vue-next";

const emit = defineEmits<{
  close: [];
  save: [cita: NuevaCitaForm];
}>();

interface NuevaCitaForm {
  pacienteNombre: string;
  edad: string;
  telefonoCuidador: string;
  fecha: string;
  hora: string;
  tipo: string;
  motivo: string;
}

const tipos = [
  "Primera consulta",
  "Control",
  "Seguimiento",
  "Urgencia",
  "Procedimiento",
  "Laboratorio",
];

const form = ref<NuevaCitaForm>({
  pacienteNombre: "",
  edad: "",
  telefonoCuidador: "",
  fecha: new Date().toISOString().split("T")[0] || "",
  hora: "09:00",
  tipo: "Primera consulta",
  motivo: "",
});

function handleSubmit() {
  if (!form.value.pacienteNombre || !form.value.motivo) return;
  emit("save", { ...form.value });
  emit("close");
}
</script>

<template>
  <Modal maxWidth="max-w-xl" @close="emit('close')">
    <template #header>
      <div class="flex items-center gap-3">
        <div
          class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center"
        >
          <CalendarPlus class="w-5 h-5 text-blue-600" />
        </div>
        <h2 class="text-lg font-bold text-slate-800 tracking-tight">
          Nueva cita
        </h2>
      </div>
    </template>

    <div class="flex flex-col gap-5">
      <!-- Paciente -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold uppercase text-slate-500"
          >Paciente</label
        >
        <input
          v-model="form.pacienteNombre"
          type="text"
          placeholder="Buscar paciente por nombre o cédula..."
          class="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700"
        />
      </div>

      <!-- Edad y Teléfono -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-bold uppercase text-slate-500">Edad</label>
          <input
            v-model="form.edad"
            type="number"
            placeholder="Ej: 89"
            class="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-bold uppercase text-slate-500"
            >Teléfono Cuidador</label
          >
          <input
            v-model="form.telefonoCuidador"
            type="text"
            placeholder="809-000-0000"
            class="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700"
          />
        </div>
      </div>

      <!-- Fecha y hora -->
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-bold uppercase text-slate-500"
            >Fecha</label
          >
          <input
            v-model="form.fecha"
            type="date"
            class="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-bold uppercase text-slate-500">Hora</label>
          <input
            v-model="form.hora"
            type="time"
            class="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-medium text-slate-700"
          />
        </div>
      </div>

      <!-- Tipo de consulta -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold uppercase text-slate-500"
          >Tipo de consulta</label
        >
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="tipo in tipos"
            :key="tipo"
            @click="form.tipo = tipo"
            :class="[
              'px-3 py-2 text-xs rounded-xl border transition-all duration-200 text-center font-medium',
              form.tipo === tipo
                ? 'bg-blue-50 border-blue-400 text-blue-700 shadow-sm shadow-blue-100'
                : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300',
            ]"
          >
            {{ tipo }}
          </button>
        </div>
      </div>

      <!-- Motivo -->
      <div class="flex flex-col gap-1.5">
        <label class="text-xs font-bold uppercase text-slate-500"
          >Motivo de consulta</label
        >
        <textarea
          v-model="form.motivo"
          rows="3"
          placeholder="Describe el motivo de la cita..."
          class="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none font-medium text-slate-700"
        />
      </div>
    </div>

    <template #footer>
      <Button
        variant="secondary"
        @click="emit('close')"
        class="rounded-xl font-semibold"
      >
        Cancelar
      </Button>
      <Button
        @click="handleSubmit"
        class="rounded-xl font-bold bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/30"
      >
        <Check class="w-4 h-4 mr-2" />
        Agendar cita
      </Button>
    </template>
  </Modal>
</template>
