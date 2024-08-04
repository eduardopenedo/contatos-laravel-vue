<script setup>
defineProps(['error'])
</script>

<template>
  
  <span v-if="error" 
  style="color: red;">
  {{ error[0]}}

</span>
    
</template>