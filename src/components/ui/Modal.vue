<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{
  title?: string
  maxWidth?: string
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <div
      class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all"
      @click.self="emit('close')"
    >
      <div 
        class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full flex flex-col max-h-[90vh] overflow-hidden"
        :class="maxWidth || 'max-w-lg'"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white">
          <slot name="header">
            <h2 v-if="title" class="text-lg font-bold text-slate-800 tracking-tight">{{ title }}</h2>
            <div v-else></div>
          </slot>
          <button
            @click="emit('close')"
            class="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Body -->
        <div class="px-6 py-5 overflow-y-auto flex-1">
          <slot />
        </div>

        <!-- Footer -->
        <div v-if="$slots.footer" class="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
