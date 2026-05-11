<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string
  options: string[]
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(option: string) {
  emit('update:modelValue', option)
  isOpen.value = false
}

function updateValue(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div class="relative w-full" ref="dropdownRef">
    <div class="relative flex items-center group">
      <!-- Slot for Prefix Icon (like AcademicCap / GraduationCap) -->
      <div v-if="$slots.icon" class="absolute left-4 flex items-center justify-center text-emerald-500 pointer-events-none transition-colors">
        <slot name="icon"></slot>
      </div>
      
      <!-- Input field allows typing and acts as the "button" -->
      <input
        type="text"
        :value="modelValue"
        @input="updateValue"
        @focus="isOpen = true"
        :placeholder="placeholder"
        :class="[
          'w-full py-4 pr-12 rounded-xl transition-all outline-none font-medium',
          /* Premium Aesthetics & Variables fallback */
          'bg-[var(--surface-1,theme(colors.slate.50/50))] border border-[var(--border,theme(colors.slate.200))]',
          'focus:border-emerald-500 focus:bg-[var(--surface-1,theme(colors.white))] focus:ring-4 focus:ring-emerald-500/10',
          'text-[var(--text-primary,theme(colors.slate.700))] placeholder:text-slate-400',
          $slots.icon ? 'pl-11' : 'pl-4'
        ]"
      />
      
      <!-- Suffix Chevron -->
      <button
        type="button"
        @click="toggleDropdown"
        class="absolute right-3 p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-emerald-500 transition-colors"
      >
        <ChevronDown 
          class="w-5 h-5 transition-transform duration-300" 
          :class="{ 'rotate-180': isOpen }"
        />
      </button>
    </div>

    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform scale-95 opacity-0 translate-y-2"
      enter-to-class="transform scale-100 opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform scale-100 opacity-100 translate-y-0"
      leave-to-class="transform scale-95 opacity-0 translate-y-2"
    >
      <ul
        v-show="isOpen"
        class="absolute z-50 w-full mt-2 py-1.5 rounded-xl shadow-xl max-h-60 overflow-y-auto custom-scrollbar bg-[var(--surface-1,theme(colors.white))] border border-[var(--border,theme(colors.slate.200))]"
      >
        <li
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          class="px-4 py-2.5 mx-1.5 rounded-lg text-sm font-medium text-[var(--text-primary,theme(colors.slate.700))] hover:bg-emerald-50 hover:text-emerald-700 cursor-pointer transition-colors"
        >
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
/* Smooth Scrollbar for Premium Feel */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: theme('colors.slate.200');
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: theme('colors.slate.300');
}
</style>
