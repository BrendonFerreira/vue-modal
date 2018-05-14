<template>
  <todos/>
</template>

<script>

import Todos from './Todo/Main'
export default {
  name: 'app',
  components: {
    Todos
  }
}
</script>

<style lang="css">
  #app {
    color: #56b983;
  }
</style>
