<script setup lang="ts">
import { computed } from "vue";
import Card from "@/components/ui/Card.vue";
import { Activity, ArrowLeft, ArrowRight, Pill, Syringe, PlusSquare, AlertTriangle, ShieldAlert, Cigarette } from "lucide-vue-next";

export interface AntecedentesData {
  antPatologicos: string;
  antQuirurgicos: string;
  antTraumaticos: string;
  antAlergicos: string;
  antHospitalarios: string;
  antInmunologicos: string;
  antToxicos: string;
}

const props = defineProps<{
  modelValue: AntecedentesData;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: AntecedentesData];
  "back": [];
  "next": [];
}>();

const updateField = (field: keyof AntecedentesData, value: string) => {
  emit("update:modelValue", {
    ...props.modelValue,
    [field]: value,
  });
};
</script>

<template>
  <Card class="flex flex-col">
    <div class="p-8 border-b border-slate-100 bg-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      
      <div class="relative z-10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-sm border border-blue-200/50">
          <Activity class="w-6 h-6" />
        </div>
        <div>
          <h2 class="text-2xl font-extrabold text-slate-800 tracking-tight">Antecedentes Personales</h2>
          <p class="text-slate-500 font-medium mt-1">Ingrese el historial médico detallado del paciente</p>
        </div>
      </div>
    </div>

    <div class="p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      <!-- Patológicos -->
      <div class="group col-span-1 md:col-span-2">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Pill class="w-4 h-4 text-red-400" /> Patológicos
        </label>
        <textarea
          :value="modelValue.antPatologicos"
          @input="updateField('antPatologicos', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: HTA, Diabetes Mellitus tipo 2..."
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Quirúrgicos -->
      <div class="group col-span-1 md:col-span-2">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Syringe class="w-4 h-4 text-blue-400" /> Quirúrgicos
        </label>
        <textarea
          :value="modelValue.antQuirurgicos"
          @input="updateField('antQuirurgicos', ($event.target as HTMLTextAreaElement).value)"
          rows="3"
          placeholder="Ej: Herniorrafía inguinal larga data, Facoemulsificación..."
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Alérgicos -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <AlertTriangle class="w-4 h-4 text-amber-400" /> Alérgicos
        </label>
        <textarea
          :value="modelValue.antAlergicos"
          @input="updateField('antAlergicos', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: Mariscos y pescados"
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Inmunológicos -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <ShieldAlert class="w-4 h-4 text-emerald-400" /> Inmunológicos
        </label>
        <textarea
          :value="modelValue.antInmunologicos"
          @input="updateField('antInmunologicos', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: 4 dosis de COVID, Influenza..."
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Tóxicos -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Cigarette class="w-4 h-4 text-slate-500" /> Tóxicos
        </label>
        <textarea
          :value="modelValue.antToxicos"
          @input="updateField('antToxicos', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: Gran alcohólico, tabaquismo..."
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-slate-500 focus:bg-white focus:ring-4 focus:ring-slate-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Traumáticos -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Activity class="w-4 h-4 text-orange-400" /> Traumáticos
        </label>
        <input
          type="text"
          :value="modelValue.antTraumaticos"
          @input="updateField('antTraumaticos', ($event.target as HTMLInputElement).value)"
          placeholder="Ej: Negados"
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400"
        />
      </div>

      <!-- Hospitalarios -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <PlusSquare class="w-4 h-4 text-cyan-500" /> Hospitalarios
        </label>
        <input
          type="text"
          :value="modelValue.antHospitalarios"
          @input="updateField('antHospitalarios', ($event.target as HTMLInputElement).value)"
          placeholder="Ej: Negados"
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400"
        />
      </div>
    </div>

    <!-- Footer Actions -->
    <div class="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
      <button 
        @click="emit('back')"
        class="px-6 py-3 rounded-xl font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 hover:text-slate-800 transition-all flex items-center gap-2 shadow-sm"
      >
        <ArrowLeft class="w-5 h-5" /> Atrás
      </button>
      
      <button 
        @click="emit('next')"
        class="px-8 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30"
      >
        Siguiente <ArrowRight class="w-5 h-5" />
      </button>
    </div>
  </Card>
</template>
