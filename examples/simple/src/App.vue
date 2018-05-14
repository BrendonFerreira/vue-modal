<template>
  <div id="app">
    <fieldset>
      {{ todos }}
    </fieldset>
    <button @click="createTodo">Create todo</button>
  </div>
</template>

<script>

import AddTodo from './AddTodo'

export default {
  name: 'app',
  data () {
    return {
      todoText: ''
    }
  },
  mounted(){
  },
  methods:{
    createTodo(  ) {
      this.$modal.show(AddTodo)
    },
  },
  computed: {
    todos() {
      return this.$store.getters['todo/list']
    }
  }
}
</script>

<style lang="css">
  #app {
    color: #56b983;
  }
</style>
