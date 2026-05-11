<script setup lang="ts">
import { computed } from "vue";
import Card from "@/components/ui/Card.vue";
import { 
  Activity, ArrowLeft, ArrowRight, Eye, Ear, Droplets, Brain, 
  Moon, Cloud, Apple, AlertTriangle, Shield, ClipboardList
} from "lucide-vue-next";

export interface RevisionSistemasData {
  revNutricional: string;
  revDisfagia: string;
  revVision: string;
  revAudicion: string;
  revIncontinencias: string;
  revCaidas: string;
  revLesionesPiel: string;
  revDeterioroCognitivo: string;
  revSintomasDepresivos: string;
  revSueno: string;
  revPatronEvacuatorio: string;
}

const props = defineProps<{
  modelValue: RevisionSistemasData;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: RevisionSistemasData];
  "back": [];
  "next": [];
}>();

const updateField = (field: keyof RevisionSistemasData, value: string) => {
  emit("update:modelValue", {
    ...props.modelValue,
    [field]: value,
  });
};
</script>

<template>
  <Card class="flex flex-col">
    <!-- Header -->
    <div class="p-8 border-b border-slate-100 bg-white relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      
      <div class="relative z-10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-200/50">
          <ClipboardList class="w-6 h-6" />
        </div>
        <div>
          <h2 class="text-2xl font-extrabold text-slate-800 tracking-tight">Revisión por sistemas y síndromes geriátricos</h2>
          <p class="text-slate-500 font-medium mt-1">Evaluación completa de sistemas e indicadores geriátricos</p>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="p-8 bg-white grid grid-cols-1 md:grid-cols-2 gap-8 relative">
      <!-- Nutricional -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Apple class="w-4 h-4 text-green-500" /> Nutricional
        </label>
        <textarea
          :value="modelValue.revNutricional"
          @input="updateField('revNutricional', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: Refiere pérdida de peso. Aproximadamente 8 libras"
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Disfagia -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Activity class="w-4 h-4 text-rose-400" /> Disfagia
        </label>
        <textarea
          :value="modelValue.revDisfagia"
          @input="updateField('revDisfagia', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: Negado"
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Visión -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Eye class="w-4 h-4 text-blue-500" /> Visión
        </label>
        <textarea
          :value="modelValue.revVision"
          @input="updateField('revVision', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: Ceguera en ojo derecho, disminución de aprox el 40%..."
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Audición -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Ear class="w-4 h-4 text-orange-400" /> Audición
        </label>
        <textarea
          :value="modelValue.revAudicion"
          @input="updateField('revAudicion', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: Niega"
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Incontinencias -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Droplets class="w-4 h-4 text-cyan-500" /> Incontinencias
        </label>
        <textarea
          :value="modelValue.revIncontinencias"
          @input="updateField('revIncontinencias', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: Niega"
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Caídas -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <AlertTriangle class="w-4 h-4 text-yellow-500" /> Caídas (últimos 12 meses)
        </label>
        <textarea
          :value="modelValue.revCaidas"
          @input="updateField('revCaidas', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: Niega"
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Lesiones en la piel -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Shield class="w-4 h-4 text-pink-400" /> Lesiones en la piel
        </label>
        <textarea
          :value="modelValue.revLesionesPiel"
          @input="updateField('revLesionesPiel', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: Niega lesiones actualmente"
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Deterioro cognitivo -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Brain class="w-4 h-4 text-purple-500" /> Deterioro cognitivo
        </label>
        <textarea
          :value="modelValue.revDeterioroCognitivo"
          @input="updateField('revDeterioroCognitivo', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: No diagnosticado"
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Síntomas depresivos -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Cloud class="w-4 h-4 text-slate-500" /> Síntomas depresivos
        </label>
        <textarea
          :value="modelValue.revSintomasDepresivos"
          @input="updateField('revSintomasDepresivos', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: Tristeza por perdidas familiares recientes."
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Alteración del sueño -->
      <div class="group">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Moon class="w-4 h-4 text-indigo-400" /> Alteración del sueño
        </label>
        <textarea
          :value="modelValue.revSueno"
          @input="updateField('revSueno', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: Refiere buen sueño de 11 PM- 6 am"
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
      </div>

      <!-- Patrón evacuatorio -->
      <div class="group col-span-1 md:col-span-2">
        <label class="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 ml-1">
          <Activity class="w-4 h-4 text-amber-600" /> Patrón evacuatorio
        </label>
        <textarea
          :value="modelValue.revPatronEvacuatorio"
          @input="updateField('revPatronEvacuatorio', ($event.target as HTMLTextAreaElement).value)"
          rows="2"
          placeholder="Ej: Cada 3-4 días. Estreñimiento crónico. (Uso de Ciruelax)"
          class="w-full bg-slate-50/50 p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-slate-700 font-medium placeholder:text-slate-400 resize-none"
        ></textarea>
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
