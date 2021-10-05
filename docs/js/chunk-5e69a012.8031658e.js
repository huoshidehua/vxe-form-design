(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5e69a012"],{"7d85":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"layout"},[n("Layout",{style:{height:t.winHeight,borderBottom:"#fff 1px solid"}},[n("Header",[n("router-link",{attrs:{to:"/new"}},[t._v("新版")]),t._v(" "),n("Button",{attrs:{type:"primary"},on:{click:t.htmlReview}},[t._v("生成html")]),t._v(" "),n("Button",{attrs:{type:"success"},on:{click:t.formReview}},[t._v("form对象")]),t._v(" "),n("Button",{attrs:{type:"warning"},on:{click:t.jsonReview}},[t._v("json对象")]),t._v(" "),n("Button",{attrs:{to:"https://github.com/huoshidehua/vxe-form-design",target:"_blank",icon:"logo-github",type:"primary"}},[t._v("Github")])],1),n("Layout",[n("Sider",{style:{background:"#fff",borderRight:"1px black solid",paddingTop:"4px",display:"flex"},attrs:{"hide-trigger":""}},[n("div",{staticClass:"wrapper"},t._l(t.controlList,(function(e,i){return n("div",{key:i,staticClass:"wrapper-content"},[n("VxeControl",{attrs:{tag:e.tag,content:e.content,field:e.field,title:e.title,span:e.span,tagProps:e.tagProps,tagEvents:e.tagEvents},on:{click:function(e){return t.controlClick(arguments)}}})],1)})),0),n("br"),n("Button",{attrs:{type:"success",long:""},on:{click:t.newRow}},[t._v("换行")])],1),n("Content",{style:{padding:"0px",minHeight:"280px",background:"#fff",float:"left"}},[n("Split",{scopedSlots:t._u([{key:"left",fn:function(){return[t.freshContent?n("div",{staticStyle:{padding:"15px 10px 2px 10px"}},[t._l(t.formData,(function(e,i){return[n("draggable",{key:i,staticClass:"list-group",staticStyle:{display:"flex"},attrs:{list:t.formData[i],group:"formItem"},on:{end:function(e){return t.dragChange(i)}}},t._l(e,(function(e,r){return n("VxeFormItem",{key:i+r,ref:"item"+i+r,refInFor:!0,attrs:{row:i,col:r,tag:e.tag,content:t.formData[i][r].content,field:e.field,title:e.title,span:e.span,tagProps:e.tagProps,tagEvents:e.tagEvents},on:{"update:content":function(e){return t.$set(t.formData[i][r],"content",e)},remove:function(e){return t.removeFormItem(arguments)}}})})),1),n("hr")]}))],2):t._e()]},proxy:!0},{key:"right",fn:function(){return[n("div",{staticStyle:{padding:"15px 10px 2px 10px"}},[n("Input",{attrs:{search:"","enter-button":"",placeholder:"国际化"},on:{"on-enter":t.i18nSearchEvent},model:{value:t.i18nSearch,callback:function(e){t.i18nSearch=e},expression:"i18nSearch"}}),n("Table",{attrs:{height:"800",columns:t.columns,data:t.i18nSearchData,"show-header":!1,stripe:"",size:"small"}})],1)]},proxy:!0}]),model:{value:t.split,callback:function(e){t.split=e},expression:"split"}})],1)],1)],1),n("Modal",{attrs:{title:"预览",width:.6*t.win.outerWidth,fullscreen:""},model:{value:t.reviewModel,callback:function(e){t.reviewModel=e},expression:"reviewModel"}},[n("textarea",{ref:"reviewdiv",staticStyle:{"white-space":"pre-line",height:"90%",width:"100%",border:"0px #F5F7F9"},attrs:{contenteditable:"true"}},[t._v(t._s(t.reviewContent))]),n("template",{slot:"footer"},[n("Button",{attrs:{type:"text"},on:{click:function(e){t.reviewModel=!1}}},[t._v("取消")]),n("Button",{attrs:{type:"primary"},on:{click:t.selectReviewContent}},[t._v("选中")])],1)],2)],1)},r=[],a=(n("4de4"),n("c975"),n("a15b"),n("a434"),n("50f4")),o=n("4d39"),s=n("beb5"),l=n("9259"),c=n("df4a"),u=n("af63"),h=n("2a43"),f=n("8679"),p=n("e3f5"),d=n("d3be"),v=n("bdbd"),m=n("e55c"),w=n("8914"),g=n("b76a"),y=n.n(g),b={name:"VxeFormDesign",components:{Button:p["a"],Layout:f["a"],Sider:h["a"],Content:u["a"],Header:c["a"],VxeControl:m["a"],VxeFormItem:w["a"],Modal:l["a"],Input:s["a"],Table:o["a"],Split:a["a"],draggable:y.a},data:function(){return{freshContent:!0,i18nSearch:"",i18nData:v["a"],i18nSearchData:[],win:window,controlList:d["a"],formData:[],curRow:0,reviewModel:!1,reviewContent:void 0,split:.6,columns:[{title:" ",key:"label"}]}},computed:{winHeight:function(){return window.innerHeight+"px"}},methods:{dragChange:function(t){var e=this,n=this.formData[t]||[];0==n.length&&this.formData.splice(t,1),this.freshContent=!1,this.$nextTick((function(){e.freshContent=!0}))},selectReviewContent:function(){this.$refs.reviewdiv.select()},i18nSearchEvent:function(){var t=this.i18nSearch,e=this.i18nData;this.i18nSearchData=t?e.filter((function(e){return-1!=e.label.indexOf(t)})):e},controlClick:function(t){var e=this.formData.length;0==e&&(this.formData.push([]),this.curRow=0),this.formData[this.curRow].push(t[0])},removeFormItem:function(t){var e=t[0],n=t[1];this.formData[e].splice(n,1),0==this.formData[e].length&&this.formData.splice(e,1)},newRow:function(){var t=this.formData,e=this.curRow;this.curRow=e+1,t.push([])},htmlReview:function(){for(var t=new Array,e=0;e<this.formData.length;e++)for(var n=this.formData[e],i=0;i<n.length;i++)t.push(this.$refs["item"+e+i][0].createHtmlCode());this.reviewContent=t.join("\n"),this.reviewModel=!0},formReview:function(){var t=new Array;t.push("{");for(var e=0;e<this.formData.length;e++)for(var n=this.formData[e],i=0;i<n.length;i++){var r=this.$refs["item"+e+i][0].elField;r&&t.push(r+":undefined,")}t.push("}"),this.reviewContent=t.join(""),this.reviewModel=!0},jsonReview:function(){var t=new Array,e=new Array;t.push("{");for(var n=0;n<this.formData.length;n++)for(var i=this.formData[n],r=0;r<i.length;r++){var a=this.$refs["item"+n+r][0].elField;a&&e.push('"'+a+'":"TEXT"')}t.push(e.join(",")),t.push("}"),this.reviewContent=t.join(""),this.reviewModel=!0}},mounted:function(){this.$nextTick((function(){}))}},x=b,k=(n("7fc8"),n("2877")),D=Object(k["a"])(x,i,r,!1,null,"1e6866c1",null);e["default"]=D.exports},"7fc8":function(t,e,n){"use strict";var i=n("bc61"),r=n.n(i);r.a},bc61:function(t,e,n){}}]);