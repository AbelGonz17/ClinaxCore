<script setup lang="ts">
import { ref } from "vue";
import { Stethoscope } from "lucide-vue-next";
import PatientAdmissionForm from "@/components/Consulta/PatientAdmissionForm.vue";
import AntecedentesPersonalesForm from "@/components/Consulta/AntecendentesPersonales/AntecedentesPersonalesForm.vue";
import RevisionSistemasForm from "@/components/Consulta/RevisionSistemasForm.vue";
import { useConsultaStore } from "@/stores/consultaStore";

const store = useConsultaStore();

// Estado para controlar qué sección se está mostrando
const currentStep = ref("admision");

const handleIniciarConsulta = () => {
  currentStep.value = "antecedentes";
};
</script>

<template>
  <div class="min-h-screen bg-slate-50/50 py-12 px-4 font-['Inter']">
    <div class="max-w-5xl mx-auto">
      <div class="mb-10 text-center">
        <div
          class="inline-block p-3 rounded-2xl bg-white shadow-sm mb-4 border border-slate-100"
        >
          <Stethoscope class="w-8 h-8 text-blue-600" />
        </div>
        <h1
          class="text-4xl font-extrabold text-slate-800 tracking-tight text-balance"
        >
          Historia Clínica Geriátrica
        </h1>
        <p class="text-slate-500 mt-2 font-medium text-lg italic">
          Valoración Geriátrica Integral (VGI)
        </p>
      </div>

      <div class="space-y-8 relative">
        <transition name="fade" mode="out-in">
          <!-- Paso 1: Admisión y Motivo de Consulta -->
          <PatientAdmissionForm
            v-if="currentStep === 'admision'"
            v-model="store.formData"
            @iniciar-consulta="handleIniciarConsulta"
          />

          <!-- Paso 2: Antecedentes Personales -->
          <AntecedentesPersonalesForm
            v-else-if="currentStep === 'antecedentes'"
            v-model="store.formData"
            @back="currentStep = 'admision'"
            @next="currentStep = 'revision'"
          />

          <!-- Paso 3: Revisión por Sistemas -->
          <RevisionSistemasForm
            v-else-if="currentStep === 'revision'"
            v-model="store.formData"
            @back="currentStep = 'antecedentes'"
            @next="alert('Siguiente sección')"
          />
        </transition>

        <!-- Espacio preparado para las siguientes secciones que se irán añadiendo paso a paso -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
