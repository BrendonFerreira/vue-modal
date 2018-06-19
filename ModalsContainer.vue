<template>
	<div class="wrapper">
  	<div class="backdrop" @click="onWrapperClick($event)">
			<div class="content" :class="{ 'white-background': !config || !config.transparent }" ref="content">
			</div> 
  	</div>
	</div>
</template>

<script>

export default {
	name: "modals-container",
	props: {
		'config': {
			type: Object,
			default: () => {}
		}
	},
	methods: {
		onWrapperClick(event) {
			if( event.target.className == 'backdrop' ) {
				this.$emit('blank-space-click')
			}			
		}
 	}
}

</script>

<style scoped>

	.wrapper {
		position: relative;
	}

	.backdrop {
		position: fixed;
		width: 100%;
		height: 100%;
		bottom: 0;
		right: 0;
		left: 0;
		top: 0;
		background-color: rgba(0,0,0,0.2);
		display:flex;
		justify-content: center;
		align-items: center;
	}
	/* .content {
		width: 50%;
		height: 50%;
	} */

	.white-background {
		background-color: white;
	}
</style>
