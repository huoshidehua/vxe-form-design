import props from 'D:\\workspace\\fukuwarakuwmsmaven\\fukuwarakuwms\\src\\main\\resources\\fhl.properties'

const getData = function() {
	let result = new Array();
	let propsArr = props.split("\n");
	for (var i = 0; i < propsArr.length; i++) {
		if (propsArr[i] && propsArr[i].indexOf("=") != -1) {
			let str = propsArr[i].replace(/\\/g, "%")
			result.push({
				key: unescape(str),
				label: unescape(str)
			})
		}
	}
	return result
}
export default getData();
