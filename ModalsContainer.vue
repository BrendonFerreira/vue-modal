<template>
  	<div class="wrapper" @click="onWrapperClick($event)">
		<div class="content" ref="content">
		
		</div> 
  	</div>
</template>

<script>

import Vue from 'vue'
export default {
	name: "modals-container",
	methods: {
		onWrapperClick(event) {
			if( event.target.className == 'wrapper' ) {
				this.$emit('blank-space-click')
			}			
		}
 	}
}

</script>

<style scoped>
	.wrapper {
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
	.content {
		background-color: white;
		width: 50%;
		height: 50%;
	}
</style>
