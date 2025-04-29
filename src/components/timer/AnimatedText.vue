<template>
  <span>
    <span v-for="(letter, index) in letters"
          :key="index"
          class="inline-block animate-letter"
          :style="{ animationDelay: index * 0.1 + 's' }">
      {{ letter === ' ' ? '\u00A0' : letter }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  text: string
}>()

const letters = computed(() => props.text.split(''))
</script>

<style scoped>
@keyframes letterBounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-letter {
  display: inline-block;
  animation: letterBounce 0.5s ease-in-out;
  animation-fill-mode: both;
}
</style>
