<template>
	<div>
		<Button type="default" @click="clickEvent">{{content}}</Button>
	</div>
</template>

<script>
	import {
		Button
	} from 'view-design';
	/* vxe表单控件组件 */
	export default {
		name: 'VxeControl',
		props: {
			/* 元素名称: 默认为 vxe-input */
			tag: {
				type: String,
				default: 'vxe-input'
			},
			/*按钮显示内容，即：控件中文名称比如 文本,仓库,物流模式等等*/
			content: {
				type: String,
				default: '文本'
			},
			/* form字段:比如warehouseId,productName etc. */
			field:{
				type:String,
				default:''
			},
			/* form表单控件的label:比如:仓库 */
			title:{
				type:String,
				default:':'
			},
			/*占位数：默认4*/
			span:{
				type:Number,
				default:4
			},
			/* 属性列表,v-model要自己拼接 */
			tagProps:{
				type:Object,
				default:()=>{}
			},
			/* 事件列表 生成代码的时候 要加上@*/
			tagEvents:{
				type:Object,
				default:()=>{}
			}
		},
		components: {
			Button
		},
		data() {
			return {

			}
		},
		methods: {
			clickEvent() {
				this.$emit('click',this.$props);
			}
		},
	}
</script>

<style>
</style>
