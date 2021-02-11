(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-75ac1130"],{"06e2":function(e,t,a){"use strict";a.d(t,"c",(function(){return l})),a.d(t,"d",(function(){return n})),a.d(t,"b",(function(){return o})),a.d(t,"a",(function(){return i})),a.d(t,"e",(function(){return c}));var r=a("b775");function l(e){return Object(r["a"])({url:"history/robotData",method:"get",params:e})}function n(e){return Object(r["a"])({url:"/history/temperatureData",method:"get",params:e})}function o(e){return Object(r["a"])({url:"image/history/imageData",method:"get",params:{}})}function i(e){return Object(r["a"])({url:"realTimeExcel",method:"get",responseType:"blob"})}function c(e){return Object(r["a"])({url:"tmData",method:"get",responseType:"blob"})}},"158e":function(e,t,a){"use strict";a("ab17")},"474e":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"className"},[a("el-card",{staticClass:"anoCard"},[a("div",{attrs:{slot:"header"},slot:"header"},[a("span",[e._v("实时数据查询")])]),a("div",{staticClass:"searchDiv"},[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入机器人名称"},model:{value:e.name,callback:function(t){e.name=t},expression:"name"}}),a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入线路名称"},model:{value:e.line,callback:function(t){e.line=t},expression:"line"}}),a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:e.value1,callback:function(t){e.value1=t},expression:"value1"}}),a("el-button",{attrs:{type:"primary",icon:"el-icon-search"},on:{click:e.robotData}},[e._v("搜索")]),a("el-button",{staticClass:"btnStyle1",attrs:{type:"primary"},on:{click:e.excelDow}},[e._v("导出Excel文件")])],1),a("el-table",{attrs:{data:e.tableData,border:"",stripe:""}},[a("el-table-column",{attrs:{prop:"id",label:"线路编号"}}),a("el-table-column",{attrs:{prop:"lineName",label:"线路名称"}}),a("el-table-column",{attrs:{prop:"robotSerialNumber",label:"机器人编号"}}),a("el-table-column",{attrs:{prop:"robotName",label:"机器人名称"}}),a("el-table-column",{attrs:{prop:"towerNumber",label:"塔号"}}),a("el-table-column",{attrs:{prop:"robotPosition",label:"距离"}}),a("el-table-column",{attrs:{prop:"environmentTemperature",label:"环境温度"}}),a("el-table-column",{attrs:{prop:"humidity",label:"湿度值"}}),a("el-table-column",{attrs:{prop:"power",label:"机器人电量"}}),a("el-table-column",{attrs:{prop:"createTime",label:"创建时间"}})],1),a("el-pagination",{staticClass:"fyDiv",attrs:{background:"",layout:"total, sizes, prev, pager, next","page-sizes":e.pageSizes,"page-size":e.pageSize,"current-page":e.currentPage,total:e.total},on:{"size-change":e.handleSize,"current-change":e.handlePage}})],1)],1)},l=[],n=(a("77ad"),a("053b"),a("06e2")),o={data:function(){return{total:0,name:"",line:"",totalPage:1,tableData:[],allList:[],schArr:[],value1:"",sch_order:"",sch_status:null,sch_date:null,currentPage:1,pageSize:10,pageSizes:[10,20,30,40],diaIsShow:!1,formData:{},editType:"",options:[{label:"环境温度",value:0},{label:"环境湿度",value:1},{label:"测试点数据",value:2},{label:"机器人电量",value:3},{label:"抓图图片",value:4}],rowIndex:0,rules:{time:[{required:!0,message:"请输入时间",trigger:"change"}]}}},created:function(){this.robotData()},methods:{excelDow:function(){Object(n["a"])().then((function(e){var t=e,a=new FileReader;a.readAsDataURL(t),a.onload=function(e){var t=document.createElement("a"),a="实时数据.xls";t.download=a,t.href=e.target.result,document.body.appendChild(t),t.click(),document.body.removeChild(t)}}))},handleSize:function(e){this.pageSize=e,this.getPageData()},handlePage:function(e){this.currentPage=e,this.getPageData()},robotData:function(){var e=this;Object(n["c"])({robotName:this.name,startTime:this.value1,lineName:this.line}).then((function(t){e.allList=t.data.items,e.schArr=e.allList,e.getPageData(),e.total=t.data.total})).catch((function(t){e.$message.error(t.message)}))},getPageData:function(){var e=(this.currentPage-1)*this.pageSize,t=e+this.pageSize;this.tableData=this.schArr.slice(e,t)}}},i=o,c=(a("e783"),a("158e"),a("5d22")),s=Object(c["a"])(i,r,l,!1,null,"1c3272eb",null);t["default"]=s.exports},"77ad":function(e,t,a){"use strict";var r=a("1c8b"),l=a("a719"),n=a("74e7"),o=a("e1d6"),i=a("d88d"),c=a("da10"),s=a("1bbd"),u=a("90fb"),d=a("1ea7"),p=a("ff9c"),b=d("slice"),h=p("slice",{ACCESSORS:!0,0:0,1:2}),m=u("species"),g=[].slice,f=Math.max;r({target:"Array",proto:!0,forced:!b||!h},{slice:function(e,t){var a,r,u,d=c(this),p=i(d.length),b=o(e,p),h=o(void 0===t?p:t,p);if(n(d)&&(a=d.constructor,"function"!=typeof a||a!==Array&&!n(a.prototype)?l(a)&&(a=a[m],null===a&&(a=void 0)):a=void 0,a===Array||void 0===a))return g.call(d,b,h);for(r=new(void 0===a?Array:a)(f(h-b,0)),u=0;b<h;b++,u++)b in d&&s(r,u,d[b]);return r.length=u,r}})},ab17:function(e,t,a){},b07f:function(e,t,a){},e783:function(e,t,a){"use strict";a("b07f")}}]);