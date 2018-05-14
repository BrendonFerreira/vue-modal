<template>
	
  <div id="asda">
	  Todo: <button @click="create">create +</button>
	  {{ list }}
    <todo-list :items="list" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoList from './Elements/List'
import TodoCreate from './Elements/Create'
export default {
	name: 'main-todos',
	components: {
		TodoList
	},
	computed: mapGetters( 'todo', [ 'list' ] ),
	methods: {
		create() {
			this.$modal.show(TodoCreate)
		}
	}
}
</script>

<style>

</style>
