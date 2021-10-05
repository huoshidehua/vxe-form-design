<template>
	<div class="layout">
		<Layout :style="{height:winHeight,borderBottom:'#fff 1px solid'}">
			<Header style="background-color: #E7E9D1;">
				<router-link to="/old">旧版</router-link>&nbsp;
				<Button type="primary" @click="htmlReview">生成html</Button> &nbsp;
				<Button type="success" @click="formReview">form对象</Button>&nbsp;
				<Button type="warning" @click="jsonReview">json对象</Button>&nbsp;
				<Button to="https://github.com/huoshidehua/vxe-form-design" target="_blank" icon="logo-github"
					type="primary">Github</Button>&nbsp;
			</Header>
			<Layout>
				<Sider hide-trigger
					:style="{background: '#fff',borderRight:'1px black solid',paddingTop:'4px',display:'flex'}">
					<div class="wrapper">
						<div class="wrapper-content" v-for="(item,index) in controlList" :key="index">
							<!-- eslint-disable -->
							<VxeControl :tag="item.tag" :content="item.content" :field="item.field" :title="item.title"
								:span="item.span" :tagProps="item.tagProps" :tagEvents="item.tagEvents"
								@click="controlClick(arguments)"></VxeControl>
						</div>
					</div>
					<br />
					<Button @click="newRow" type="success" long>换行</Button>
				</Sider>
				<Content :style="{padding: '0px', minHeight: '280px', background: '#fff',float:'left'}">
					<Split v-model="split">
						<!-- 左边 -->
						<template #left>
							<div style="padding: 15px 10px 2px 10px;" v-if="freshContent">
								<template v-for="(formRow,row) in formData">
									<draggable class="list-group" :list="formData[row]" group="formItem" :key="row"
										style="display: flex;" @end="dragChange(row)">
										<!-- eslint-disable -->
										<VxeFormItem :ref="'item'+row+col" :key="row+col" :row="row" :col="col"
											:tag="formItem.tag" :content.sync="formData[row][col].content"
											:field="formItem.field" :title="formItem.title" :span="formItem.span"
											:tagProps="formItem.tagProps" :tagEvents="formItem.tagEvents"
											@remove="removeFormItem(arguments)" v-for="(formItem,col) in formRow">
										</VxeFormItem>
									</draggable>
									<hr />
								</template>
							</div>
							<!-- <pre v-html='JSON.stringify(formData, null, 2)'
								style="text-align: left;height: 500px;overflow-y: auto;"></pre> -->
						</template>
						<!-- 右边 -->
						<template #right>
							<div style="padding: 15px 10px 2px 10px;">
								<Input search enter-button placeholder="国际化" v-model="i18nSearch"
									@on-enter="i18nSearchEvent" />
								<Table height="800" :columns="columns" :data="i18nSearchData" :show-header="false"
									stripe size="small"></Table>
							</div>
						</template>
					</Split>
				</Content>

			</Layout>
		</Layout>
		<Modal v-model="reviewModel" title="预览" :width="win.outerWidth*0.6" fullscreen>
			<pre style="white-space: pre-line;height: 90%;width: 100%;border: 0px #F5F7F9;overflow-y: auto;" contenteditable="true"
				ref="reviewdiv"><code v-text="reviewContent"></code></pre>
			<template slot="footer">
				<Button type="text" @click="reviewModel=false">取消</Button>
				<Button type="primary" @click="selectReviewContent">选中</Button>
			</template>
		</Modal>


	</div>
</template>

<script>
	import {
		Button,
		Layout,
		Sider,
		Content,
		Header,
		Modal,
		Input,
		Table,
		Split
	} from 'view-design';
	import VxeControlData from './VxeControlData/VxeControlData.js'
	import i18nPropertiesData from './i18nData/i18nData.js'
	import VxeControl from './VxeControl.vue'
	import VxeFormItem from './VxeFormItem.vue'
	import draggable from 'vuedraggable'
	export default {
		name: 'VxeFormDesign',
		components: {
			Button,
			Layout,
			Sider,
			Content,
			Header,
			VxeControl,
			VxeFormItem,
			Modal,
			Input,
			Table,
			Split,
			draggable
		},
		data() {
			return {
				freshContent: true,
				i18nSearch: '',
				i18nData: i18nPropertiesData,
				i18nSearchData: [],
				win: window,
				controlList: VxeControlData,
				/*表单 列表数据 是个 二维数组 代表行和列*/
				formData: [],
				/* 当前行 */
				curRow: 0,
				reviewModel: false,
				reviewContent: undefined,
				split: 0.6,
				columns: [{
					title: ' ',
					key: 'label'
				}, ]
			}
		},
		computed: {
			winHeight() {
				return window.innerHeight + 'px'
			}
		},
		methods: {
			// 拖动结束
			dragChange(rowIndex) {
				let dragRow = this.formData[rowIndex] || [];
				if (dragRow.length == 0) {
					this.formData.splice(rowIndex, 1);
				}
				this.freshContent = false;
				this.$nextTick(() => {
					this.freshContent = true;
				})
			},
			selectReviewContent() {
				this.$refs.reviewdiv.select()
			},
			i18nSearchEvent() {
				let {
					i18nSearch,
					i18nData
				} = this;

				if (!i18nSearch) {
					this.i18nSearchData = i18nData;
				} else {
					this.i18nSearchData = i18nData.filter(d => d.label.indexOf(i18nSearch) != -1)
				}

			},
			controlClick(args) {

				let rowNum = this.formData.length;
				if (rowNum == 0) {
					this.formData.push([]);
					this.curRow = 0;
				}
				this.formData[this.curRow].push(args[0]);
			},
			/*删除数据*/
			removeFormItem(args) {
				let rowIndex = args[0],
					colIndex = args[1];
				this.formData[rowIndex].splice(colIndex, 1);
				if (this.formData[rowIndex].length == 0) {
					this.formData.splice(rowIndex, 1);
					this.curRow = this.curRow - 1;
				}
			},
			/* 新行 */
			newRow() {
				let {
					formData,
					curRow
				} = this;
				this.curRow = curRow + 1;
				formData.push([]);
			},
			/* 预览html */
			htmlReview() {

				let html = new Array();
				html.push(`
				<style>
				        .inner-title {
				            padding: 0px 0em 0px 2px;
				            min-height: 32px;
				            line-height: 32px;
				            display: block;
				        }
				</style>
				`)
				for (var i = 0; i < this.formData.length; i++) {

					let colItemArr = this.formData[i];
					let vxeFormItemSlot = [];
					for (var j = 0; j < colItemArr.length; j++) {
						vxeFormItemSlot.push(this.$refs["item" + i + j][0].createHtmlCodeNew(j));
					}
					let vxeFormItem = 
					`
					<!--第${i+1}行-->
					<vxe-form-item field="${i+1}Line" span="24" title="">
							<template v-slot="scope">
								<div style="display: flex">
										${vxeFormItemSlot.join("\n")}
								</div>
							</template>
					</vxe-form-item>
					`;
					html.push(vxeFormItem)
					
				}
				this.reviewContent = html.join("\n");
				this.reviewModel = true;

			},
			/* 预览表单对象 */
			formReview() {
				let htmlArr = new Array();
				htmlArr.push("{")
				for (var i = 0; i < this.formData.length; i++) {
					let colItemArr = this.formData[i];
					for (var j = 0; j < colItemArr.length; j++) {

						let vmodel = this.$refs["item" + i + j][0].elField;
						if (vmodel) {
							htmlArr.push(vmodel + ':undefined,')
						}
					}
				}
				htmlArr.push("}")
				this.reviewContent = htmlArr.join('')
				this.reviewModel = true;

			},
			/* 预览表单json对象 */
			jsonReview() {
				let htmlArr = new Array(),
					fieldArr = new Array();
				htmlArr.push("{")
				for (var i = 0; i < this.formData.length; i++) {
					let colItemArr = this.formData[i];
					for (var j = 0; j < colItemArr.length; j++) {

						let vmodel = this.$refs["item" + i + j][0].elField;
						if (vmodel) {
							fieldArr.push('"' + vmodel + '":"TEXT"')
						}
					}
				}
				htmlArr.push(fieldArr.join(","));
				htmlArr.push('}')
				this.reviewContent = htmlArr.join('')
				this.reviewModel = true;

			},

		},
		mounted() {
			this.$nextTick(() => {

				//console.log("0---", this.i18nData);
			})
		}
	}
</script>

<style scoped>
	.layout {
		border: 1px solid #d7dde4;
		background: #f5f7f9;
		position: relative;
		border-radius: 4px;
		overflow: hidden;
		height: 100vh;
	}

	.wrapper {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.wrapper-content {
		width: 50%;
		margin-bottom: 8px;
	}

	.review-class {
		height: 30vh;
	}
</style>
