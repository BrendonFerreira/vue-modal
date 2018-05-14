<template>
	<div>
		<input type="checkbox" v-model="completed">
		<b :class="{'completed': todo.completed}">{{todo.content}}</b>
	</div>
</template>

<script>
export default {
	name:'todo-list-item',
	props: ['id'],
	computed: {
		todo() {
			return this.$store.state.todo.list.find( item => item.id == this.id )
		},
		completed: {
			get() {
				return this.todo.completed		
			},
			set( value ){
				this.$store.dispatch( 'todo/toggle', this.id )
			}
		}
	}
}
</script>

<style scoped>
	.completed {
		text-decoration: line-through;
		background-color: rgba(0,0,0,0.2);
	}
</style>
