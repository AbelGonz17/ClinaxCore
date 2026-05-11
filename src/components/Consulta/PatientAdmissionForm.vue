<script setup lang="ts">
import {
  User,
  Calendar,
  Phone,
  GraduationCap,
  Briefcase,
  Info,
  Clock,
  AlertCircle,
  Stethoscope,
  ChevronRight,
} from "lucide-vue-next";
import { computed } from "vue";
import Card from "@/components/ui/Card.vue";
import Combobox from "@/components/ui/Combobox.vue";

export interface PatientAdmissionData {
  nombre: string;
  edad: string;
  fechaNacimiento: string;
  telefonoCuidadora: string;
  escolaridad: string;
  ocupacionAnterior: string;
  fuente: string;
  fechaEvaluacion: string;
  motivoConsulta: string;
}

const props = defineProps<{
  modelValue: PatientAdmissionData;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: PatientAdmissionData];
  "iniciar-consulta": [];
}>();

const updateField = (field: keyof PatientAdmissionData, value: string) => {
  emit("update:modelValue", {
    ...props.modelValue,
    [field]: value,
  });
};

const isValid = computed(() => {
  return (
    props.modelValue.nombre.trim() !== "" &&
    props.modelValue.motivoConsulta.trim() !== ""
  );
});

const handleStart = () => {
  if (isValid.value) {
    emit("iniciar-consulta");
  }
};
</script>

<template>
  <Card class="flex flex-col md:flex-row">
    <!-- Panel Izquierdo: Formulario de Paciente -->
    <div class="p-8 md:w-2/3 bg-white relative">
      <div class="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
        <User class="w-32 h-32" />
      </div>

      <div class="mb-8 relative z-10">
        <h2
          class="text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-3"
        >
          <div
            class="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600"
          >
            <User class="w-5 h-5" />
          </div>
          Datos de Identificación
        </h2>
        <p class="text-slate-500 font-medium mt-1 ml-13">
          Complete la información general del paciente
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <div class="group md:col-span-2">
          <label
            class="text-[10px] font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5 ml-1"
          >
            Nombre Completo
          </label>
          <input
            type="text"
            :value="modelValue.nombre"
            @input="
              updateField('nombre', ($event.target as HTMLInputElement).value)
            "
            placeholder="Nombre del paciente"
            class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 font-semibold placeholder:font-normal placeholder:text-slate-400"
          />
        </div>

        <div class="group">
          <label
            class="text-[10px] font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5 ml-1"
          >
            Edad
          </label>
          <input
            type="number"
            :value="modelValue.edad"
            @input="
              updateField('edad', ($event.target as HTMLInputElement).value)
            "
            placeholder="Ej: 89"
            class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400"
          />
        </div>

        <div class="group">
          <label
            class="text-[10px] font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5 ml-1"
          >
            <Calendar class="w-3.5 h-3.5 text-blue-400" /> Fecha Nac.
          </label>
          <input
            type="date"
            :value="modelValue.fechaNacimiento"
            @input="
              updateField('fechaNacimiento', ($event.target as HTMLInputElement).value)
            "
            class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400"
          />
        </div>

        <div class="group">
          <label
            class="text-[10px] font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5 ml-1"
          >
            <Phone class="w-3.5 h-3.5 text-blue-400" /> Teléfono Cuidador
          </label>
          <input
            type="text"
            :value="modelValue.telefonoCuidadora"
            @input="
              updateField(
                'telefonoCuidadora',
                ($event.target as HTMLInputElement).value,
              )
            "
            placeholder="809-000-0000"
            class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400"
          />
        </div>

        <div class="group">
          <label
            class="text-[10px] font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5 ml-1"
          >
            Escolaridad
          </label>
          <Combobox
            :model-value="modelValue.escolaridad"
            @update:model-value="updateField('escolaridad', $event)"
            :options="[
              'Sin estudios',
              'Primaria',
              'Secundaria / Bachillerato',
              'Técnico Medio / Superior',
              'Universitario (Grado)',
              'Postgrado (Especialidad / Maestría)',
              'Doctorado (PhD)'
            ]"
            placeholder="Ej: Secundaria / Bachillerato"
          >
            <template #icon>
              <GraduationCap class="w-5 h-5" />
            </template>
          </Combobox>
        </div>

        <div class="group">
          <label
            class="text-[10px] font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5 ml-1"
          >
            <Briefcase class="w-3.5 h-3.5 text-amber-400" /> Ocupación Anterior
          </label>
          <input
            type="text"
            :value="modelValue.ocupacionAnterior"
            @input="
              updateField(
                'ocupacionAnterior',
                ($event.target as HTMLInputElement).value,
              )
            "
            placeholder="Ej: Ebanistería"
            class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400"
          />
        </div>

        <div class="group">
          <label
            class="text-[10px] font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5 ml-1"
          >
            <Info class="w-3.5 h-3.5 text-purple-400" /> Fuente
          </label>
          <input
            type="text"
            :value="modelValue.fuente"
            @input="
              updateField('fuente', ($event.target as HTMLInputElement).value)
            "
            placeholder="Ej: Mixta (Paciente y Esposa)"
            class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400"
          />
        </div>

        <div class="group">
          <label
            class="text-[10px] font-bold uppercase text-slate-400 mb-2 flex items-center gap-1.5 ml-1"
          >
            <Clock class="w-3.5 h-3.5 text-slate-400" /> Fecha Evaluación
          </label>
          <input
            type="date"
            :value="modelValue.fechaEvaluacion"
            @input="
              updateField(
                'fechaEvaluacion',
                ($event.target as HTMLInputElement).value,
              )
            "
            class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-slate-500 focus:bg-white focus:ring-4 focus:ring-slate-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400"
          />
        </div>
      </div>
    </div>

    <!-- Panel Derecho: Motivo de Consulta y Acción -->
    <div
      class="p-8 md:w-1/3 bg-gradient-to-br from-slate-800 to-slate-900 text-white relative overflow-hidden flex flex-col"
    >
      <div
        class="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"
      ></div>

      <div class="relative z-10 flex-1 flex flex-col">
        <div class="flex items-center gap-3 mb-6">
          <div
            class="p-2.5 bg-white/10 rounded-xl backdrop-blur-md border border-white/10"
          >
            <Stethoscope class="w-6 h-6 text-blue-300" />
          </div>
          <h3 class="text-xl font-bold text-white tracking-tight">
            Motivo de Consulta
          </h3>
        </div>

        <div class="flex-1 mb-8">
          <label class="sr-only">Motivo de consulta</label>
          <textarea
            :value="modelValue.motivoConsulta"
            @input="
              updateField(
                'motivoConsulta',
                ($event.target as HTMLTextAreaElement).value,
              )
            "
            rows="6"
            placeholder="Ej: Somnolencia excesiva (diurna y nocturna)&#10;Sensación de plenitud gástrica"
            class="w-full h-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-blue-400 focus:bg-white/10 focus:ring-4 focus:ring-blue-400/20 outline-none transition-all text-blue-50 placeholder:text-slate-400/50 resize-none font-medium leading-relaxed"
          ></textarea>
        </div>

        <button
          type="button"
          @click="handleStart"
          :disabled="!isValid"
          class="w-full py-4 px-6 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg overflow-hidden relative group"
          :class="
            isValid
              ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-blue-600/30 cursor-pointer'
              : 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
          "
        >
          <div
            v-if="isValid"
            class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"
          ></div>
          <span class="relative z-10">Iniciar Consulta</span>
          <ChevronRight
            v-if="isValid"
            class="w-5 h-5 relative z-10 animate-pulse"
          />
        </button>
        <p
          v-if="!isValid"
          class="text-[10px] text-center text-slate-500 mt-3 font-medium"
        >
          Complete al menos el nombre y el motivo para iniciar.
        </p>
      </div>
    </div>
  </Card>
</template>
