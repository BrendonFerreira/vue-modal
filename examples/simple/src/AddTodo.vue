<template>
  <div>
    <input type="text" v-model="content">
    <button @click="create">Create</button>
  </div>
</template>

<script>
export default {
  name:"todo-form",
  data() {
    return {
      content: ''
    }
  },
  methods: {
    create(  ) {
      this.$store.dispatch("todo/create", { content: this.content })
      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
