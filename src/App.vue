<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import Sidebar from '@/components/ui/Sidebar.vue'
import ConsultaForm from '@/components/Inicio/ConsultaForm.vue'
import PacientesView from '@/views/PacientesView.vue'
import CitasView from '@/views/CitasView.vue'
import LoginView from '@/views/LoginView.vue'

const authStore = useAuthStore()

const sidebarOpen = ref(false)
const currentView = ref('home')
const isTransitioning = ref(false)

// Initialize auth on mount
onMounted(() => {
  authStore.init()
})

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = false
}

function navigateTo(view: string) {
  currentView.value = view
}

function handleLoginSuccess() {
  isTransitioning.value = true
  setTimeout(() => {
    isTransitioning.value = false
  }, 300)
}

function handleLogout() {
  isTransitioning.value = true
  authStore.logout()
  currentView.value = 'home'
  setTimeout(() => {
    isTransitioning.value = false
  }, 300)
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50">
    <!-- Login View (when not authenticated) -->
    <Transition name="auth-fade" mode="out-in">
      <LoginView
        v-if="!authStore.isAuthenticated"
        @login-success="handleLoginSuccess"
      />

      <!-- Dashboard (when authenticated) -->
      <div v-else class="min-h-screen">
        <!-- Mobile Header -->
        <header class="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-200 px-4 py-3">
          <div class="flex items-center justify-between">
            <button
              @click="toggleSidebar"
              class="p-2 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Abrir menú"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 class="text-lg font-semibold text-primary-500">ClinaxCore</h1>
            <div class="w-10"></div>
          </div>
        </header>

        <!-- Overlay for mobile -->
        <Transition name="overlay-fade">
          <div
            v-if="sidebarOpen"
            @click="closeSidebar"
            class="lg:hidden fixed inset-0 z-40 bg-black/50"
          ></div>
        </Transition>

        <!-- Sidebar -->
        <Sidebar
          :is-open="sidebarOpen"
          :active-view="currentView"
          @close="closeSidebar"
          @navigate="navigateTo"
          @logout="handleLogout"
        />

        <!-- Main Content -->
        <main class="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
          <div class="p-4 lg:p-8">
            <Transition name="fade" mode="out-in">
              <ConsultaForm v-if="currentView === 'home'" />
              <PacientesView
                v-else-if="currentView === 'pacientes'"
                @navigate="(view) => navigateTo(view)"
              />
              <CitasView
                v-else-if="currentView === 'citas'"
                @navigate="(view) => navigateTo(view === 'consulta' ? 'home' : view)"
              />
              <div v-else-if="currentView === 'configuracion'" class="text-center py-16">
                <h2 class="text-2xl font-bold text-neutral-900 mb-2">Configuración</h2>
                <p class="text-neutral-500">Próximamente...</p>
              </div>
            </Transition>
          </div>
        </main>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Auth transition */
.auth-fade-enter-active,
.auth-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.auth-fade-enter-from {
  opacity: 0;
  transform: scale(0.98);
}

.auth-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

/* Content fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Overlay fade */
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.3s ease;
}

.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
</style>
