<script setup lang="ts">
import { Home, Users, Calendar, Settings, X, Stethoscope, LogOut } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/authStore'

const props = defineProps<{
  isOpen: boolean
  activeView: string
}>()

const emit = defineEmits<{
  close: []
  navigate: [view: string]
  logout: []
}>()

const authStore = useAuthStore()

function handleLogout() {
  emit('logout')
  emit('close')
}

interface NavItem {
  id: string
  label: string
  icon: typeof Home
}

const navItems: NavItem[] = [
  { id: 'citas', label: 'Inicio', icon: Home },
  { id: 'consulta', label: 'Consulta', icon: Stethoscope },
  { id: 'pacientes', label: 'Pacientes', icon: Users },
  { id: 'configuracion', label: 'Configuración', icon: Settings }
]

function setActive(id: string) {
  emit('navigate', id)
  emit('close')
}
</script>

<template>
  <aside
    :class="[
      'fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-neutral-200 transform transition-transform duration-300 ease-in-out',
      'lg:translate-x-0',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <!-- Header -->
    <div class="h-16 flex items-center justify-between px-6 border-b border-neutral-200">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-primary-500 rounded-lg flex items-center justify-center">
          <Stethoscope class="w-5 h-5 text-white" />
        </div>
        <span class="text-lg font-semibold text-neutral-800">ClinaxCore</span>
      </div>
      <button
        @click="emit('close')"
        class="lg:hidden p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
        aria-label="Cerrar menú"
      >
        <X class="w-5 h-5 text-neutral-500" />
      </button>
    </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-1">
      <button
        v-for="item in navItems"
        :key="item.id"
        @click="setActive(item.id)"
        :class="[
          'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
          props.activeView === item.id
            ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
            : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
        ]"
      >
        <component
          :is="item.icon"
          :class="[
            'w-5 h-5 transition-colors',
            props.activeView === item.id ? 'text-white' : 'text-neutral-400'
          ]"
        />
        {{ item.label }}
      </button>
    </nav>

    <!-- Footer -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
      <div class="flex items-center gap-3 px-3 py-2 mb-3">
        <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
          <span class="text-sm font-medium text-primary-600">{{ authStore.userInitials }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-neutral-800 truncate">{{ authStore.user?.name || 'Usuario' }}</p>
          <p class="text-xs text-neutral-500 truncate">{{ authStore.user?.specialty || 'Médico' }}</p>
        </div>
      </div>
      
      <!-- Logout Button -->
      <button
        @click="handleLogout"
        class="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
      >
        <LogOut class="w-5 h-5" />
        Cerrar Sesión
      </button>
    </div>
  </aside>
</template>
