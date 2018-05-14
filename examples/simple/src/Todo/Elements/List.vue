<template>
	<ul>
		<todo-item v-for="(todo, index) of items" :id="todo.id" :key="index" />
	</ul>
</template>

<script>
import TodoItem from './ListItem'
export default {
	name:'todo-list',
	components: {
		TodoItem
	},
	props: {
		items: {
			type: Array
		}
	}
}
</script>

<style>

</style>
