/* 控件数据 */
const VxeControlData = [{
	tag: 'oms-common-select',
	content: '仓库',
	field: 'warehouseId',
	title: "#(_res.get('label.warehouse')):",
	span: 4,
	tagProps: {
		url: "#(ctx)/common/warehouseCombobox?warehouseStatus=1",
		":optionprops": "{label:'value',value:'code'}",
		selected: true
	},
	tagEvents: {
		input: "$refs.form.updateStatus(scope)",
	}
}, {
	tag: 'oms-common-select',
	content: '物流方式',
	field: 'logisticsId',
	title: "#(_res.get('label.logisticsMode')):",
	span: 4,
	tagProps: {
		url: "#(ctx)/common/logisticsCombobx?logisticsStatus=1",
		":optionprops": "{label:'value',value:'code'}",
		selected: true
	},
	tagEvents: {
		input: "$refs.form.updateStatus(scope)",
	}
}, 

{
	tag: 'vxe-input',
	content: '文本',
	field: 'text',
	title: "#(_res.get('label.text'))",
	span: 4,
	tagProps: {
	},
	tagEvents: {
		input: "$refs.form.updateStatus(scope)",
	}
},
{
	tag: 'oms-common-select',
	content: '下拉框',
	field: 'xilakuan',
	title: "#(_res.get('label.select')):",
	span: 4,
	tagProps: {
		url: "#(ctx)/common/commonCombobox?systemCode= &controlKey=",
		":optionprops": "{label:'value',value:'code'}",
		selected: false
	},
	tagEvents: {
		input: "$refs.form.updateStatus(scope)",
	}
}, 
{
	tag: 'vxe-input',
	content: '时间开始',
	field: 'startDate',
	title: "#(_res.get('label.startDate'))",
	span: 4,
	tagProps: {
		type:"date"
	},
	tagEvents: {
		input: "$refs.form.updateStatus(scope)",
	}
},
{
	tag: 'common-button-group',
	content: '按钮组',
	field: undefined,
	title: "#(_res.get('label.endDate'))",
	span: 4,
	tagProps: {
		url: "#(ctx)/common/commonCombobox?systemCode= &controlKey=",
		':optionprops': "{label:'value',value:'code'}",
		selected: false,
		allbtn:true,
		remote:true
	},
	tagEvents: {
		input: "$refs.form.updateStatus(scope)",
		change:"$refs.grid.commitProxy('reload')"
	}
},
{
	tag: 'vxe-input',
	content: '时间结束',
	field: 'endDate',
	title: "#(_res.get('label.endDate'))",
	span: 4,
	tagProps: {
		type:"date"
	},
	tagEvents: {
		input: "$refs.form.updateStatus(scope)",
	}
},
{
	tag: 'br',
	content: '占位',
	field: undefined,
	title: "",
	span: 4,
	tagProps: {
		
	},
	tagEvents: {
		
	}
}
]

export default VxeControlData
