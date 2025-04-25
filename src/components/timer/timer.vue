<template>
  <div class="text-center p-8 font-sans">

    <div class="flex justify-center gap-8 mt-4">
      <div class="flex flex-col items-center">
        <span class="text-5xl font-bold text-gray-800">
          {{ days }}
        </span>

        <span class="text-sm text-gray-600 uppercase tracking-wider">
          Days
        </span>
      </div>

      <div class="flex flex-col items-center">
        <span class="text-5xl font-bold text-gray-800">
          {{ hours }}
        </span>

        <span class="text-sm text-gray-600 uppercase tracking-wider">
          Hours
        </span>
      </div>

      <div class="flex flex-col items-center">
        <span class="text-5xl font-bold text-gray-800">
          {{ minutes }}
        </span>

        <span class="text-sm text-gray-600 uppercase tracking-wider">
          Minutes
        </span>
      </div>

      <div class="flex flex-col items-center">
        <span class="text-5xl font-bold text-gray-800">
          {{ seconds }}
        </span>

        <span class="text-sm text-gray-600 uppercase tracking-wider">
          Seconds
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const targetDate = new Date('2025-05-30T12:00:00')
const days = ref(0)
const hours = ref(0)
const minutes = ref(0)
const seconds = ref(0)

let timer

const updateTimer = () => {
  const now = new Date()
  const diff = targetDate - now

  if (diff <= 0) {
    days.value = 0
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
    return
  }

  days.value = Math.floor(diff / (1000 * 60 * 60 * 24))
  hours.value = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  minutes.value = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  seconds.value = Math.floor((diff % (1000 * 60)) / 1000)
}

onMounted(() => {
  updateTimer()
  timer = setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
