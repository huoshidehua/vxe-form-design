<template>
	<div class="layout">
		<Layout :style="{height:winHeight,borderBottom:'#fff 1px solid'}">
			<Header>
				<Button type="primary" @click="htmlReview">生成html</Button> &nbsp;
				<Button type="success" @click="formReview">form对象</Button>&nbsp;
				<Button type="warning" @click="jsonReview">json对象</Button>&nbsp;
			</Header>
			<Layout>
				<Sider hide-trigger :style="{background: '#fff',borderRight:'1px black solid',paddingTop:'4px',display:'flex'}">
					<div class="wrapper">
						<div class="wrapper-content" v-for="(item,index) in controlList" :key="index">
							<!-- eslint-disable -->
							<VxeControl :tag="item.tag" :content="item.content" :field="item.field" :title="item.title" :span="item.span"
							 :tagProps="item.tagProps" :tagEvents="item.tagEvents" @click="controlClick(arguments)"></VxeControl>
						</div>
					</div>
					<br />
					<Button @click="newRow" type="success" long>换行</Button>
				</Sider>
				<Content :style="{padding: '0px', minHeight: '280px', background: '#fff',float:'left'}">
					<Split v-model="split">
						<!-- 左边 -->
						<template #left>
							<div style="padding: 15px 10px 2px 10px;">
								<template v-for="(formRow,row) in formData">
									<div style="display: flex;" :key="row">
										<template v-for="(formItem,col) in formRow">
											<!-- eslint-disable -->
											<VxeFormItem :ref="'item'+row+col" :key="col" :row="row" :col="col" :tag="formItem.tag" :content.sync="formData[row][col].content"
											 :field="formItem.field" :title="formItem.title" :span="formItem.span" :tagProps="formItem.tagProps"
											 :tagEvents="formItem.tagEvents" @remove="removeFormItem(arguments)"></VxeFormItem>
										</template>
									</div>
									<hr />
								</template>
							</div>
						</template>
						<!-- 右边 -->
						<template #right>
							<div style="padding: 15px 10px 2px 10px;">
								<Input search enter-button placeholder="国际化" v-model="i18nSearch" @on-enter="i18nSearchEvent" />
								<Table height="800" :columns="columns" :data="i18nSearchData" :show-header="false" stripe size="small"></Table>
							</div>
						</template>
					</Split>
				</Content>

			</Layout>
		</Layout>
		<Modal v-model="reviewModel" title="预览" :width="win.outerWidth*0.6" fullscreen>
			<textarea style="white-space: pre-line;height: 90%;width: 100%;border: 0px #F5F7F9;" contenteditable="true" ref="reviewdiv">{{reviewContent}}</textarea>
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
			Split
		},
		data() {
			return {
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
			selectReviewContent() {
				this.$refs.reviewdiv.select()
				console.log(this.$refs.reviewdiv.select())

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
				let {
					formData,
					curRow
				} = this;
				let rowNum = formData.length;
				if (rowNum == 0) {
					formData.push([]);
					curRow = 0;
				}
				formData[curRow].push(args[0]);
			},
			/*删除数据*/
			removeFormItem(args) {
				let rowIndex = args[0],
					colIndex = args[1];
				this.formData[rowIndex].splice(colIndex, 1);
				if (this.formData[rowIndex].length == 0) {
					this.formData.splice(rowIndex, 1);
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
				for (var i = 0; i < this.formData.length; i++) {
					let colItemArr = this.formData[i];
					for (var j = 0; j < colItemArr.length; j++) {
						html.push(this.$refs["item" + i + j][0].createHtmlCode());
					}
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
