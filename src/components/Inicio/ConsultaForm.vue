<script setup lang="ts">
import { useConsultaStore } from "@/stores/consultaStore";
import {
  Stethoscope,
  User,
  History,
  Activity,
  Save,
  Phone,
  ClipboardList,
  FileText,
  Pill,
  HeartPulse,
  Microscope,
  Accessibility,
} from "lucide-vue-next";
import { type ConsultaData } from "@/stores/consultaStore";

const store = useConsultaStore();

const emit = defineEmits<{
  navigate: [view: string];
}>();

const escalasGeriatricas = [
  { label: "QSM (Memoria)", key: "scoreQSM" },
  { label: "GDS (Depresión)", key: "scoreGDS" },
  { label: "Barthel (ABVD)", key: "scoreBarthel" },
  { label: "Lawton (AIVD)", key: "scoreLawton" },
  { label: "SARC-F (Sarcopenia)", key: "scoreSARCF" },
  { label: "FRAIL (Fragilidad)", key: "scoreFRAIL" },
  { label: "MNA (Nutrición)", key: "scoreMNA" },
] as const;

const diagnosticosEsferas = [
  { label: "Clínicos", key: "diagClinicos" },
  { label: "Funcionales", key: "diagFuncionales" },
  { label: "Mentales", key: "diagMentales" },
  { label: "Sociales", key: "diagSociales" },
] as const;

const recomendacionesCampos = [
  { label: "Farmacológicas", key: "recomFarmacologicas", icon: Pill },
  {
    label: "No Farmacológicas",
    key: "recomNoFarmacologicas",
    icon: HeartPulse,
  },
  {
    label: "Estudios Complementarios",
    key: "estudiosComplementarios",
    icon: Microscope,
  },
  {
    label: "Funcionales y Rehabilitadores",
    key: "recomFuncionales",
    icon: Accessibility,
  },
] as const;

const antecedentesMap = {
  antPatologicos: "Patológicos",
  antQuirurgicos: "Quirúrgicos",
  antTraumaticos: "Traumáticos",
  antAlergicos: "Alérgicos",
  antHospitalarios: "Hospitalarios",
  antInmunologicos: "Inmunológicos",
  antToxicos: "Tóxicos",
} as const;

const revisionMap = {
  revNutricional: "Estado Nutricional",
  revDisfagia: "Presencia de Disfagia",
  revVision: "Agudeza Visual",
  revAudicion: "Capacidad Auditiva",
  revIncontinencias: "Incontinencias",
  revCaidas: "Caídas Recientes (12m)",
  revLesionesPiel: "Integridad de la Piel",
  revDeterioroCognitivo: "Función Cognitiva",
  revSintomasDepresivos: "Estado de Ánimo",
  revSueno: "Calidad del Sueño",
  revPatronEvacuatorio: "Patrón de Eliminación",
} as const;

const signosVitalesMap: Record<string, keyof ConsultaData> = {
  FC: "fc",
  FR: "fr",
  SpO2: "spo2",
};

const handleSubmit = async () => {
  console.log("Iniciando guardado integral...");
  const ok = await store.guardarRegistro();
  if (ok) {
    alert("Historia Clínica guardada. Paciente sincronizado en el directorio.");
    emit("navigate", "pacientes");
  }
};

const handleReset = () => {
  if (confirm("¿Deseas limpiar el formulario actual?"))
    store.limpiarFormulario();
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

      <form @submit.prevent="handleSubmit" class="space-y-8">
        <section
          class="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-slate-100 p-8 transition-all hover:shadow-2xl"
        >
          <h2
            class="text-xl font-bold text-slate-700 mb-8 flex items-center gap-3 border-b border-slate-50 pb-4"
          >
            <User class="w-5 h-5 text-blue-500" /> Identificación
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 group">
              <label
                class="text-xs font-bold uppercase text-slate-400 mb-2 block ml-1"
                >Nombre Completo</label
              >
              <input
                type="text"
                :value="store.formData.nombre"
                @input="
                  store.updateField(
                    'nombre',
                    ($event.target as HTMLInputElement).value,
                  )
                "
                class="w-full px-5 py-3 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-slate-700"
              />
            </div>

            <div>
              <label
                class="text-xs font-bold uppercase text-slate-400 mb-2 block ml-1"
                >Cédula</label
              >
              <input
                type="text"
                :value="store.formData.cedula"
                @input="
                  store.updateField(
                    'cedula',
                    ($event.target as HTMLInputElement).value,
                  )
                "
                placeholder="000-0000000-0"
                class="w-full px-5 py-3 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-slate-700"
              />
            </div>

            <div>
              <label
                class="text-xs font-bold uppercase text-slate-400 mb-2 block ml-1"
                >Sexo</label
              >
              <select
                :value="store.formData.sexo"
                @change="
                  store.updateField(
                    'sexo',
                    ($event.target as HTMLSelectElement).value,
                  )
                "
                class="w-full px-5 py-3 rounded-2xl bg-slate-50 focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-slate-700 appearance-none"
              >
                <option value="">Seleccionar...</option>
                <option value="femenino">Femenino</option>
                <option value="masculino">Masculino</option>
              </select>
            </div>

            <div>
              <label
                class="text-xs font-bold uppercase text-slate-400 mb-2 block ml-1"
                >Edad / Nacimiento</label
              >
              <input
                type="text"
                :value="store.formData.edad"
                @input="
                  store.updateField(
                    'edad',
                    ($event.target as HTMLInputElement).value,
                  )
                "
                class="w-full px-5 py-3 rounded-2xl bg-slate-50 outline-none"
              />
            </div>

            <div>
              <label
                class="text-xs font-bold uppercase text-slate-400 mb-2 block ml-1 flex items-center gap-1"
              >
                <Phone class="w-3 h-3" /> Teléfono Cuidador
              </label>
              <input
                type="text"
                :value="store.formData.telefonoCuidadora"
                @input="
                  store.updateField(
                    'telefonoCuidadora',
                    ($event.target as HTMLInputElement).value,
                  )
                "
                class="w-full px-5 py-3 rounded-2xl bg-slate-50 outline-none"
              />
            </div>

            <div>
              <label
                class="text-xs font-bold uppercase text-slate-400 mb-2 block ml-1"
                >Escolaridad</label
              >
              <input
                type="text"
                :value="store.formData.escolaridad"
                @input="
                  store.updateField(
                    'escolaridad',
                    ($event.target as HTMLInputElement).value,
                  )
                "
                class="w-full px-5 py-3 rounded-2xl bg-slate-50 outline-none"
              />
            </div>
          </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section
            class="bg-slate-800 rounded-[2rem] p-8 text-white shadow-2xl"
          >
            <h2 class="text-xl font-bold mb-8 flex items-center gap-3">
              <History class="w-5 h-5 text-blue-400" /> Antecedentes
            </h2>
            <div class="grid gap-y-4">
              <div
                v-for="(label, key) in antecedentesMap"
                :key="key"
                class="flex flex-col"
              >
                <span
                  class="text-[10px] font-bold text-slate-500 uppercase ml-1"
                  >{{ label }}</span
                >
                <input
                  type="text"
                  :value="store.formData[key]"
                  @input="
                    store.updateField(
                      key as any,
                      ($event.target as HTMLInputElement).value,
                    )
                  "
                  class="bg-transparent border-b border-slate-700 focus:border-blue-400 outline-none py-1 text-slate-200"
                />
              </div>
            </div>
          </section>

          <section
            class="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8"
          >
            <h2
              class="text-xl font-bold text-slate-700 mb-8 flex items-center gap-3"
            >
              <Activity class="w-5 h-5 text-emerald-500" /> Revisión Geriátrica
            </h2>
            <div
              class="grid gap-y-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar"
            >
              <div v-for="(label, key) in revisionMap" :key="key">
                <span
                  class="text-[10px] font-black uppercase text-slate-400 tracking-wider"
                  >{{ label }}</span
                >
                <input
                  type="text"
                  :value="store.formData[key]"
                  @input="
                    store.updateField(
                      key as any,
                      ($event.target as HTMLInputElement).value,
                    )
                  "
                  class="w-full bg-transparent border-b border-slate-100 focus:border-emerald-400 outline-none py-1 text-sm text-slate-600 font-medium"
                />
              </div>
            </div>
          </section>
        </div>

        <section
          class="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8"
        >
          <h2
            class="text-xl font-bold text-slate-700 mb-8 flex items-center gap-3"
          >
            <ClipboardList class="w-5 h-5 text-purple-500" /> Escalas de
            Valoración (Scores)
          </h2>
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <div
              v-for="escala in escalasGeriatricas"
              :key="escala.key"
              class="bg-purple-50/50 p-3 rounded-2xl border border-purple-100 text-center"
            >
              <label
                class="block text-[9px] font-black text-purple-600 uppercase mb-2 leading-tight"
                >{{ escala.label }}</label
              >
              <input
                type="text"
                :value="store.formData[escala.key]"
                @input="
                  store.updateField(
                    escala.key as any,
                    ($event.target as HTMLInputElement).value,
                  )
                "
                class="w-full bg-white border-none rounded-lg py-1 text-center font-bold text-purple-700 outline-none focus:ring-2 focus:ring-purple-200"
                placeholder="-"
              />
            </div>
          </div>
        </section>

        <section
          class="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8"
        >
          <h2
            class="text-xl font-bold text-slate-700 mb-8 flex items-center gap-3"
          >
            <Activity class="w-5 h-5 text-red-500" /> Diagnósticos
            Multidimensionales
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="diag in diagnosticosEsferas"
              :key="diag.key"
              class="space-y-2 group"
            >
              <label
                class="text-xs font-bold text-slate-400 uppercase ml-2 group-focus-within:text-red-500 transition-colors"
                >{{ diag.label }}</label
              >
              <textarea
                :value="store.formData[diag.key]"
                @input="
                  store.updateField(
                    diag.key as any,
                    ($event.target as HTMLTextAreaElement).value,
                  )
                "
                rows="3"
                class="w-full p-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-red-50 outline-none transition-all text-sm text-slate-600"
              ></textarea>
            </div>
          </div>
        </section>

        <section
          class="bg-blue-900 rounded-[2rem] p-8 text-white shadow-2xl shadow-blue-900/20"
        >
          <h2 class="text-xl font-bold mb-6 flex items-center gap-3">
            <FileText class="w-5 h-5 text-blue-300" /> Análisis Clínico Integral
          </h2>
          <textarea
            :value="store.formData.analisisClinicoIntegral"
            @input="
              store.updateField(
                'analisisClinicoIntegral',
                ($event.target as HTMLTextAreaElement).value,
              )
            "
            rows="8"
            class="w-full bg-white/10 border border-white/20 rounded-2xl p-6 outline-none focus:bg-white/20 transition-all text-blue-50 leading-relaxed text-sm"
            placeholder="Redacte aquí el resumen del caso, interpretación de las escalas y pronóstico funcional..."
          ></textarea>
        </section>

        <section
          class="bg-blue-600 rounded-[2rem] p-1 shadow-xl shadow-blue-600/30"
        >
          <div class="bg-white rounded-[1.8rem] p-8 space-y-8">
            <div class="flex flex-col lg:flex-row justify-between gap-8">
              <div class="space-y-6 flex-1">
                <h3
                  class="text-lg font-bold text-slate-800 underline underline-offset-8 decoration-blue-200"
                >
                  Signos Vitales y TA
                </h3>
                <div class="flex flex-wrap gap-4">
                  <div
                    v-for="pos in ['taDerecha', 'taIzquierda']"
                    :key="pos"
                    class="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100"
                  >
                    <span
                      class="text-[10px] font-bold text-slate-500 uppercase"
                      >{{ pos === "taDerecha" ? "TA Der" : "TA Izq" }}</span
                    >
                    <input
                      type="text"
                      :value="
                        store.formData[pos as 'taDerecha' | 'taIzquierda']
                      "
                      @input="
                        store.updateField(
                          pos as any,
                          ($event.target as HTMLInputElement).value,
                        )
                      "
                      class="w-16 bg-white border border-slate-200 rounded-lg py-1 text-center font-bold text-blue-600 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div class="flex flex-wrap gap-3">
                <div
                  v-for="(field, label) in signosVitalesMap"
                  :key="label"
                  class="px-6 py-4 rounded-2xl bg-blue-50 text-blue-700 border border-blue-100 flex flex-col items-center"
                >
                  <span class="text-[10px] font-black uppercase opacity-60">{{
                    label
                  }}</span>
                  <input
                    type="text"
                    :value="store.formData[field]"
                    @input="
                      store.updateField(
                        field as any,
                        ($event.target as HTMLInputElement).value,
                      )
                    "
                    class="w-12 bg-transparent text-center font-bold text-lg outline-none"
                    placeholder="--"
                  />
                </div>
              </div>
            </div>
            <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p
                class="text-[10px] font-black text-slate-400 uppercase mb-3 ml-1"
              >
                Hallazgos del Examen Físico (Ojos, MMII, Sensorio)
              </p>
              <textarea
                :value="store.formData.descripcionExamenFisico"
                @input="
                  store.updateField(
                    'descripcionExamenFisico',
                    ($event.target as HTMLTextAreaElement).value,
                  )
                "
                rows="4"
                class="w-full bg-transparent border-none focus:ring-0 text-slate-600 text-sm leading-relaxed"
              ></textarea>
            </div>
          </div>
        </section>

        <section
          class="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8"
        >
          <h2
            class="text-xl font-bold text-slate-700 mb-8 underline decoration-blue-500 underline-offset-8"
          >
            Plan de Manejo y Recomendaciones
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              v-for="recom in recomendacionesCampos"
              :key="recom.key"
              class="group space-y-2"
            >
              <label
                class="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase ml-1 group-focus-within:text-blue-500 transition-colors"
              >
                <component :is="recom.icon" class="w-4 h-4" /> {{ recom.label }}
              </label>
              <textarea
                :value="store.formData[recom.key]"
                @input="
                  store.updateField(
                    recom.key as any,
                    ($event.target as HTMLTextAreaElement).value,
                  )
                "
                rows="3"
                class="w-full p-4 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition-all text-sm text-slate-600"
              ></textarea>
            </div>
          </div>
        </section>

        <div class="flex justify-end items-center gap-4 pt-6 pb-12">
          <button
            type="button"
            @click="handleReset"
            class="px-8 py-4 rounded-2xl font-bold text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
          >
            Descartar
          </button>
          <button
            type="submit"
            :disabled="store.isLoading"
            class="px-12 py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition-all flex items-center justify-center gap-3"
          >
            <Save v-if="!store.isLoading" class="w-5 h-5" />
            <div
              v-else
              class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></div>
            {{ store.isLoading ? "Procesando..." : "Finalizar VGI" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
input,
textarea {
  transition: all 0.2s ease;
}
</style>
