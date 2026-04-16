<script setup lang="ts">
import { ref, computed } from 'vue'
import { useConsultaStore } from '@/stores/consultaStore'
import { 
  User, 
  Activity, 
  ClipboardList, 
  FileText, 
  Save, 
  RotateCcw,
  CheckCircle,
  AlertCircle
} from 'lucide-vue-next'

const store = useConsultaStore()

const touched = ref<Record<string, boolean>>({})

function markTouched(field: string) {
  touched.value[field] = true
}

function hasError(field: string) {
  return touched.value[field] && store.validationErrors[field as keyof typeof store.validationErrors]
}

const sexOptions = [
  { value: '', label: 'Seleccionar...' },
  { value: 'masculino', label: 'Masculino' },
  { value: 'femenino', label: 'Femenino' },
  { value: 'otro', label: 'Otro' }
]

async function handleSubmit() {
  // Mark all required fields as touched
  Object.keys(store.validationErrors).forEach(key => {
    touched.value[key] = true
  })
  
  if (!store.isFormValid) return
  
  await store.guardarRegistro()
}

function handleReset() {
  store.limpiarFormulario()
  touched.value = {}
}

const imcColorClass = computed(() => {
  const clasificacion = store.imcClasificacion
  switch (clasificacion) {
    case 'Bajo peso': return 'text-yellow-600 bg-yellow-50'
    case 'Normal': return 'text-green-600 bg-green-50'
    case 'Sobrepeso': return 'text-orange-600 bg-orange-50'
    case 'Obesidad': return 'text-red-600 bg-red-50'
    default: return 'text-neutral-600 bg-neutral-50'
  }
})
</script>

<template>
  <div class="max-w-5xl mx-auto">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl lg:text-3xl font-bold text-neutral-800">Registro de Consulta</h1>
      <p class="text-neutral-500 mt-1">Complete los datos de la consulta médica</p>
    </div>

    <!-- Success Message -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-2 opacity-0"
    >
      <div
        v-if="store.isSaved"
        class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3"
      >
        <CheckCircle class="w-5 h-5 text-green-600 flex-shrink-0" />
        <p class="text-green-800 font-medium">Registro guardado exitosamente</p>
      </div>
    </Transition>

    <!-- Form Card -->
    <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
      
      <!-- Section 1: Patient Information -->
      <section class="p-6 border-b border-neutral-100">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
            <User class="w-5 h-5 text-primary-500" />
          </div>
          <h2 class="text-lg font-semibold text-neutral-800">Información del Paciente</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Name -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Nombre completo <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              :value="store.formData.nombre"
              @input="store.updateField('nombre', ($event.target as HTMLInputElement).value)"
              @blur="markTouched('nombre')"
              :class="[
                'w-full px-4 py-2.5 rounded-xl border transition-all duration-200',
                hasError('nombre')
                  ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400'
                  : 'border-neutral-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400'
              ]"
              placeholder="Ingrese el nombre del paciente"
            />
            <p v-if="hasError('nombre')" class="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle class="w-3.5 h-3.5" />
              Campo requerido
            </p>
          </div>

          <!-- Age -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Edad <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              min="0"
              max="150"
              :value="store.formData.edad"
              @input="store.updateField('edad', ($event.target as HTMLInputElement).value)"
              @blur="markTouched('edad')"
              :class="[
                'w-full px-4 py-2.5 rounded-xl border transition-all duration-200',
                hasError('edad')
                  ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400'
                  : 'border-neutral-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400'
              ]"
              placeholder="Años"
            />
            <p v-if="hasError('edad')" class="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle class="w-3.5 h-3.5" />
              Campo requerido
            </p>
          </div>

          <!-- Sex -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Sexo <span class="text-red-500">*</span>
            </label>
            <select
              :value="store.formData.sexo"
              @change="store.updateField('sexo', ($event.target as HTMLSelectElement).value)"
              @blur="markTouched('sexo')"
              :class="[
                'w-full px-4 py-2.5 rounded-xl border transition-all duration-200 appearance-none bg-white',
                hasError('sexo')
                  ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400'
                  : 'border-neutral-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400'
              ]"
            >
              <option v-for="opt in sexOptions" :key="opt.value" :value="opt.value">
                {{ opt.label }}
              </option>
            </select>
            <p v-if="hasError('sexo')" class="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle class="w-3.5 h-3.5" />
              Campo requerido
            </p>
          </div>

          <!-- Phone -->
          <div class="lg:col-span-2">
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Teléfono
            </label>
            <input
              type="tel"
              :value="store.formData.telefono"
              @input="store.updateField('telefono', ($event.target as HTMLInputElement).value)"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all duration-200"
              placeholder="(555) 123-4567"
            />
          </div>
        </div>
      </section>

      <!-- Section 2: Vital Signs -->
      <section class="p-6 border-b border-neutral-100 bg-neutral-50/50">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
            <Activity class="w-5 h-5 text-primary-500" />
          </div>
          <h2 class="text-lg font-semibold text-neutral-800">Signos Vitales</h2>
        </div>

        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Blood Pressure -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Presión Arterial
            </label>
            <input
              type="text"
              :value="store.formData.presionArterial"
              @input="store.updateField('presionArterial', ($event.target as HTMLInputElement).value)"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all duration-200 bg-white"
              placeholder="120/80"
            />
          </div>

          <!-- Weight -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Peso (kg)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              :value="store.formData.peso"
              @input="store.updateField('peso', ($event.target as HTMLInputElement).value)"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all duration-200 bg-white"
              placeholder="70.5"
            />
          </div>

          <!-- Height -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Talla (cm)
            </label>
            <input
              type="number"
              min="0"
              :value="store.formData.talla"
              @input="store.updateField('talla', ($event.target as HTMLInputElement).value)"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all duration-200 bg-white"
              placeholder="170"
            />
          </div>

          <!-- BMI (Calculated) -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              IMC
            </label>
            <div class="relative">
              <input
                type="text"
                :value="store.imc ? `${store.imc}` : ''"
                readonly
                class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 bg-neutral-100 text-neutral-600 cursor-not-allowed"
                placeholder="Auto"
              />
              <span
                v-if="store.imcClasificacion"
                :class="[
                  'absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md text-xs font-medium',
                  imcColorClass
                ]"
              >
                {{ store.imcClasificacion }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- Section 3: Clinical Evaluation -->
      <section class="p-6 border-b border-neutral-100">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
            <ClipboardList class="w-5 h-5 text-primary-500" />
          </div>
          <h2 class="text-lg font-semibold text-neutral-800">Evaluación Clínica</h2>
        </div>

        <div class="space-y-4">
          <!-- Consultation Reason -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Motivo de Consulta <span class="text-red-500">*</span>
            </label>
            <textarea
              :value="store.formData.motivoConsulta"
              @input="store.updateField('motivoConsulta', ($event.target as HTMLTextAreaElement).value)"
              @blur="markTouched('motivoConsulta')"
              rows="4"
              :class="[
                'w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none',
                hasError('motivoConsulta')
                  ? 'border-red-300 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400'
                  : 'border-neutral-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400'
              ]"
              placeholder="Describa el motivo principal de la consulta..."
            ></textarea>
            <p v-if="hasError('motivoConsulta')" class="mt-1 text-sm text-red-500 flex items-center gap-1">
              <AlertCircle class="w-3.5 h-3.5" />
              Campo requerido
            </p>
          </div>

          <!-- Medical History -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Antecedentes
            </label>
            <textarea
              :value="store.formData.antecedentes"
              @input="store.updateField('antecedentes', ($event.target as HTMLTextAreaElement).value)"
              rows="4"
              class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all duration-200 resize-none"
              placeholder="Antecedentes médicos relevantes, alergias, medicamentos actuales..."
            ></textarea>
          </div>
        </div>
      </section>

      <!-- Section 4: Diagnosis and Plan -->
      <section class="p-6 border-b border-neutral-100 bg-neutral-50/50">
        <div class="flex items-center gap-3 mb-5">
          <div class="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center">
            <FileText class="w-5 h-5 text-primary-500" />
          </div>
          <h2 class="text-lg font-semibold text-neutral-800">Diagnóstico y Plan</h2>
        </div>

        <div class="space-y-4">
          <!-- Diagnosis CIE-10 -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Diagnóstico (CIE-10)
            </label>
            <input
              type="text"
              :value="store.formData.diagnosticoCie10"
              @input="store.updateField('diagnosticoCie10', ($event.target as HTMLInputElement).value)"
              class="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all duration-200 bg-white"
              placeholder="Ej: J06.9 - Infección aguda de vías respiratorias"
            />
          </div>

          <!-- Treatment / Prescription -->
          <div>
            <label class="block text-sm font-medium text-neutral-700 mb-1.5">
              Tratamiento / Receta
            </label>
            <textarea
              :value="store.formData.tratamiento"
              @input="store.updateField('tratamiento', ($event.target as HTMLTextAreaElement).value)"
              rows="5"
              class="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary-100 focus:border-primary-400 transition-all duration-200 resize-none bg-white"
              placeholder="Medicamentos, dosis, indicaciones, recomendaciones..."
            ></textarea>
          </div>
        </div>
      </section>

      <!-- Form Actions -->
      <div class="p-6 bg-white flex flex-col sm:flex-row gap-3 sm:justify-end">
        <button
          type="button"
          @click="handleReset"
          class="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 font-medium hover:bg-neutral-100 transition-all duration-200 focus:ring-2 focus:ring-neutral-200"
        >
          <RotateCcw class="w-4 h-4" />
          Limpiar Formulario
        </button>
        <button
          type="submit"
          :disabled="store.isLoading"
          class="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary-500 text-white font-medium hover:bg-primary-600 transition-all duration-200 focus:ring-2 focus:ring-primary-300 disabled:opacity-70 disabled:cursor-not-allowed shadow-md shadow-primary-500/25"
        >
          <svg
            v-if="store.isLoading"
            class="animate-spin w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <Save v-else class="w-4 h-4" />
          {{ store.isLoading ? 'Guardando...' : 'Guardar Registro' }}
        </button>
      </div>
    </form>
  </div>
</template>
