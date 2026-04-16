<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Stethoscope, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'

const emit = defineEmits<{
  loginSuccess: []
}>()

const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const touched = ref({
  email: false,
  password: false
})

const emailError = computed(() => {
  if (!touched.value.email) return ''
  if (!email.value) return 'El email es requerido'
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) return 'Ingresa un email válido'
  return ''
})

const passwordError = computed(() => {
  if (!touched.value.password) return ''
  if (!password.value) return 'La contraseña es requerida'
  if (password.value.length < 6) return 'Mínimo 6 caracteres'
  return ''
})

const isFormValid = computed(() => {
  return email.value && password.value && !emailError.value && !passwordError.value
})

async function handleSubmit() {
  touched.value = { email: true, password: true }
  
  if (!isFormValid.value) return

  const success = await authStore.login(email.value, password.value)
  
  if (success) {
    emit('loginSuccess')
  }
}

function handleForgotPassword() {
  alert('Funcionalidad de recuperación de contraseña próximamente.')
}

onMounted(() => {
  authStore.clearError()
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
    <!-- Medical pattern background -->
    <div class="absolute inset-0 opacity-[0.03]">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="medical-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 15v30M15 30h30" stroke="#0056b3" stroke-width="2" fill="none"/>
            <circle cx="30" cy="30" r="8" stroke="#0056b3" stroke-width="1.5" fill="none"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#medical-pattern)"/>
      </svg>
    </div>

    <!-- Decorative blobs -->
    <div class="absolute top-0 left-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

    <!-- Login Card -->
    <div class="relative w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-xl shadow-neutral-200/50 border border-neutral-100 p-8 sm:p-10">
        <!-- Logo & Header -->
        <div class="text-center mb-8">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl shadow-lg shadow-primary-500/30 mb-4">
            <Stethoscope class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-neutral-900">ClinaxCore</h1>
          <p class="text-neutral-500 mt-1">Inicia sesión para continuar</p>
        </div>

        <!-- Error Alert -->
        <Transition name="slide-fade">
          <div
            v-if="authStore.error"
            class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3"
          >
            <AlertCircle class="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div class="flex-1">
              <p class="text-sm text-red-700">{{ authStore.error }}</p>
            </div>
          </div>
        </Transition>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Email Field -->
          <div>
            <label for="email" class="block text-sm font-medium text-neutral-700 mb-1.5">
              Correo electrónico
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail class="w-5 h-5 text-neutral-400" />
              </div>
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="doctor@clinica.com"
                @blur="touched.email = true"
                :class="[
                  'w-full pl-11 pr-4 py-3 rounded-lg border text-neutral-900 placeholder-neutral-400 transition-all duration-200',
                  'focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
                  emailError
                    ? 'border-red-300 bg-red-50/50'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                ]"
              />
            </div>
            <Transition name="slide-fade">
              <p v-if="emailError" class="mt-1.5 text-sm text-red-500">{{ emailError }}</p>
            </Transition>
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-neutral-700 mb-1.5">
              Contraseña
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock class="w-5 h-5 text-neutral-400" />
              </div>
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                @blur="touched.password = true"
                :class="[
                  'w-full pl-11 pr-12 py-3 rounded-lg border text-neutral-900 placeholder-neutral-400 transition-all duration-200',
                  'focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
                  passwordError
                    ? 'border-red-300 bg-red-50/50'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                ]"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                <EyeOff v-if="showPassword" class="w-5 h-5" />
                <Eye v-else class="w-5 h-5" />
              </button>
            </div>
            <Transition name="slide-fade">
              <p v-if="passwordError" class="mt-1.5 text-sm text-red-500">{{ passwordError }}</p>
            </Transition>
          </div>

          <!-- Forgot Password -->
          <div class="text-right">
            <button
              type="button"
              @click="handleForgotPassword"
              class="text-sm text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="authStore.isLoading"
            :class="[
              'w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200',
              'flex items-center justify-center gap-2',
              authStore.isLoading
                ? 'bg-primary-400 cursor-not-allowed'
                : 'bg-primary-500 hover:bg-primary-600 active:scale-[0.98] shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40'
            ]"
          >
            <Loader2 v-if="authStore.isLoading" class="w-5 h-5 animate-spin" />
            <span>{{ authStore.isLoading ? 'Iniciando sesión...' : 'Entrar' }}</span>
          </button>
        </form>

        <!-- Footer -->
        <div class="mt-8 pt-6 border-t border-neutral-100 text-center">
          <p class="text-sm text-neutral-500">
            ¿Necesitas ayuda? 
            <a href="#" class="text-primary-600 hover:text-primary-700 font-medium">Contacta soporte</a>
          </p>
        </div>
      </div>

      <!-- Bottom text -->
      <p class="text-center text-xs text-neutral-400 mt-6">
        © 2024 ClinaxCore. Todos los derechos reservados.
      </p>
    </div>
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.15s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-4px);
  opacity: 0;
}
</style>
