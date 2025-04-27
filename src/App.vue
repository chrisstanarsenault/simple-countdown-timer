<template>
  <div class="bg-black w-full h-screen flex flex-col items-center justify-center">
    <Header />

    <main>
      <Timer />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './components/header/header.vue'
import Timer from './components/timer/timer.vue'
</script>
