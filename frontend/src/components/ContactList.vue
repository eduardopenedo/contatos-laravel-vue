<template>
  <div>
    <ul>
      <li v-for="contact in contacts" :key="contact.id">
        {{ contact.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    contacts() {
      return this.$store.state.contacts;
    }
  }
};
</script>
