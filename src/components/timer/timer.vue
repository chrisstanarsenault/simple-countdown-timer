<template>
  <div class="flex flex-col items-center justify-center text-center p-8 font-sans">
    <ConfettiExplosion v-if="showExplosion" :particleSize="5" :duration="3000" />

    <div class="flex justify-center gap-8 mt-4">
      <div class="flex flex-col items-center">
        <span class="text-4xl md:text-5xl font-bold text-gray-500">
          {{ days }}
        </span>

        <span class="text-sm text-gray-600 uppercase tracking-wider">
          Days
        </span>
      </div>

      <div class="flex flex-col items-center">
        <span class="text-4xl md:text-5xl font-bold text-gray-500">
          {{ hours }}
        </span>

        <span class="text-sm text-gray-600 uppercase tracking-wider">
          Hours
        </span>
      </div>

      <div class="flex flex-col items-center">
        <span class="text-4xl md:text-5xl font-bold text-gray-500">
          {{ minutes }}
        </span>

        <span class="text-sm text-gray-600 uppercase tracking-wider">
          Minutes
        </span>
      </div>

      <div class="flex flex-col items-center">
        <span class="text-4xl md:text-5xl font-bold text-gray-500">
          {{ seconds }}
        </span>

        <span class="text-sm text-gray-600 uppercase tracking-wider">
          Seconds
        </span>
      </div>
    </div>

    <div v-if="showAnniversary" class="mb-8 mt-8">
      <div class="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded" role="alert">
          <p class="font-bold">Happy {{ currentWeek }} week anniversary!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ConfettiExplosion from "vue-confetti-explosion";

const targetDate = new Date('2025-05-30T12:00:00')
const days = ref<number>(0)
const hours = ref<number>(0)
const minutes = ref<number>(0)
const seconds = ref<number>(0)
const lastAnnouncedWeek = ref<number>(4) // Starting from week 4
const showAnniversary = ref<boolean>(false)
const showExplosion = ref<boolean>(false)

const currentWeek = computed(() => {
  const now = new Date()
  const startDate = new Date('2025-05-30T12:00:00')
  const diffTime = Math.abs(startDate.getTime() - now.getTime())
  const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
  return diffWeeks
})

const isSaturday = (): boolean => {
  return new Date().getDay() === 6
}

const checkAnniversary = () => {
  if (isSaturday() && currentWeek.value > lastAnnouncedWeek.value) {
    showAnniversary.value = true
    showExplosion.value = true
    lastAnnouncedWeek.value = currentWeek.value

    // Hide the message after 24 hours
    setTimeout(() => {
      showAnniversary.value = false
    }, 24 * 60 * 60 * 1000)
  }
}

let timer: number | undefined

const updateTimer = () => {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()

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

  checkAnniversary()
}

onMounted(() => {
  updateTimer()
  timer = window.setInterval(updateTimer, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>
