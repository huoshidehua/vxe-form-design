<template>
	<div>
		<Poptip placement="bottom-start" width="1000" v-model="show" transfer>
			<Tag type="dot" closable color="success" @on-close="closeEvent" @click.native="clickEvent">{{elContent}}
			</Tag>
			<template #content>
				<!-- span -->
				<Input v-model="elSpan">
				<template #prepend>span</template>
				</Input>
				<br />
				<!-- 备注内容 -->
				<Input v-model="elContent">
				<template #prepend>备注</template>
				</Input>
				<br />

				<!-- form字段 也是model字段 -->
				<Input v-model="elField">
				<template #prepend>form-model</template>
				</Input>
				<br />

				<template v-if="!titleUnEditField.includes(elField)">
					<!-- label字段 -->
					<Input v-model="elTitle">
					<template #prepend>label</template>
					</Input>
					<br />

				</template>

				<div v-for="(value, name,index) in elProps" :key=index>
					<template v-if="selectType.includes(name)">
						{{name}}:
						<i-switch v-model="elProps[name]" />
					</template>
					<template v-else>
						<Input v-model="elProps[name]">
						<template #prepend>{{name}}</template>
						</Input>
					</template>
					<br />
				</div>
				<br />
				<Button @click="changeTagProps">确定</Button>
			</template>
		</Poptip>
	</div>
</template>

<script>
	import {
		Tag,
		Poptip,
		Button,
		Input,
		Switch
	} from 'view-design';
	export default {
		name: 'VxeFormItem',
		components: {
			Tag,
			Poptip,
			Button,
			Input,
			"i-switch": Switch
		},
		props: {

			/*所在二维数组的行*/
			row: {
				type: Number,
				default: 0
			},
			/* 所在二维数组的列索引 */
			col: {
				type: Number,
				default: 0
			},
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
			field: {
				type: String,
				default: ''
			},
			/* form表单控件的label:比如:仓库 */
			title: {
				type: String,
				default: ':'
			},
			/*占位数：默认4*/
			span: {
				type: Number,
				default: 4
			},
			/* 属性列表,v-model要自己拼接 */
			tagProps: {
				type: Object,
				default: () => {}
			},
			/* 事件列表 生成代码的时候 要加上@*/
			tagEvents: {
				type: Object,
				default: () => {}
			}
		},
		data() {
			return {
				/* 表单控件属性的data数据 */
				elProps: {},
				show: false,
				/* 展示selected原属属性 */
				selectType: ["selected", "search", "remote", "allbtn"],
				/* 不需要修改title的控件 */
				titleUnEditField: ["warehouseId", "logisticsId", "br"],
				/* 表单控件显示备注用 */
				elContent: "",
				/*元素占用的位置*/
				elSpan: 4,
				/*控件label展示*/
				elTitle: '',
				/*控件form的值*/
				elField: ''
			}
		},
		methods: {
			/* 删除该数据 */
			closeEvent() {
				this.$emit('remove', this.row, this.col);
			},
			/* 点击事件修改属性值 */
			clickEvent() {
				this.show = true;
			},
			changeTagProps() {
				this.show = false;
				// this.$emit('update:content',this.elContent)
			},
			/* 生成html */
			createHtmlCode() {
				let {
					elProps,
					elContent,
					elSpan,
					elTitle,
					elField,
					tag
				} = this;
				let {
					selectType,
					tagEvents
				} = this;
				let htmlArr = [];
				/* 备注 */
				htmlArr.push("<!--" + elContent + "-->\n");
				/* vxe-form-item */
				htmlArr.push('<vxe-form-item span="' + elSpan + '"');

				if (tag == "br") {
					htmlArr.push("></vxe-form-item>\n")
					htmlArr.push(
						"<!--********************************************************************************-->\n")
					return htmlArr.join("");
				}

				if (elField) {
					htmlArr.push('field="' + elField + '"')
				}
				if (elTitle) {
					htmlArr.push('title="' + elTitle + '"')
				}
				htmlArr.push(">\n")

				/* slot */
				htmlArr.push('<template v-slot="scope">\n')

				/* 渲染实际元素 */
				htmlArr.push("<" + tag);
				if (tag == 'vxe-input') {
					htmlArr.push('clearable  size="medium"')
				}

				if (elField) {

					htmlArr.push('v-model="form.' + elField + '"\n')
				}

				let propsKeys = Object.keys(elProps),
					eventKeys = Object.keys(tagEvents);
				for (var i = 0; i < propsKeys.length; i++) {
					if (selectType.includes(propsKeys[i])) {
						if (elProps[propsKeys[i]]) {
							htmlArr.push(propsKeys[i] + '\n');
						}
					} else {
						htmlArr.push(propsKeys[i] + '="' + elProps[propsKeys[i]] + '"\n');
					}

				}
				for (var j = 0; j < eventKeys.length; j++) {
					htmlArr.push('@' + eventKeys[j] + '="' + tagEvents[eventKeys[j]] + '"\n');
				}

				htmlArr.push('></' + tag + '>\n')
				htmlArr.push('</template>\n')
				htmlArr.push("</vxe-form-item>\n");
				return htmlArr.join(" ");

			},
			/**
			 * @param {Number} index:判断当前是否是第一个（第一个不需要设置标题）
			 */
			createHtmlCodeNew(index) {
				let {
					elProps,
					elContent,
					elSpan,
					elField,
					elTitle,
					tag
				} = this;
				let {
					selectType,
					tagEvents
				} = this;

				if (tag == "br") {
					return "\n";
				}

				let attr = [];
				/* 渲染实际元素 */
				if (tag == 'vxe-input') {
					attr.push('clearable  size="medium"')
				}


				let propsKeys = Object.keys(elProps),
					eventKeys = Object.keys(tagEvents);
				for (var i = 0; i < propsKeys.length; i++) {
					if (selectType.includes(propsKeys[i])) {
						if (elProps[propsKeys[i]]) {
							attr.push(propsKeys[i] + '\n');
						}
					} else {
						attr.push(propsKeys[i] + '="' + elProps[propsKeys[i]] + '"\n');
					}

				}
				for (var j = 0; j < eventKeys.length; j++) {
					attr.push('@' + eventKeys[j] + '="' + tagEvents[eventKeys[j]] + '"\n');
				}

				let itemHtml = `
				<!--${elContent}-->
				${index!=0?'<span class="vxe-form--item-title-label inner-title" style="min-width: 50px;padding: 0 8px" v-text="\''+elTitle+':\'"></span>':''}
				<${tag} v-model="form.${elField}" ${attr.join(" ")} style="width:${elSpan}%"></${tag}>
				`;
				return itemHtml;

			}
		},
		mounted() {
			this.$nextTick(() => {
				this.elProps = Object.assign({}, this.tagProps);
				this.elContent = this.content;
				this.elSpan = this.span;
				this.elTitle = this.title;
				this.elField = this.field
			})

		}
	}
</script>

<style>
</style>
