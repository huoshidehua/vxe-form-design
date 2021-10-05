<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

	export default {
		name: 'App',
		components: {
		}
	}
</script>

<style lang="less">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin: 0;
		padding: 0;
		min-height: 100vh;
		height: 100vh;
	}
</style>
