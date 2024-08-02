<template>
  <div class="contador">
    contador
    <p>
      {{ counter.count }}
    </p>

    <button @click="counter.increment">contar</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter.js'

const counter = useCounterStore()
</script>
