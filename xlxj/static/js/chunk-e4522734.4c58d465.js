(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e4522734"],{"181f":function(t,e,i){t.exports=i.p+"static/img/indeterminate-circle-fill.f9fe53d3.svg"},"1f00":function(t,e,i){t.exports=i.p+"static/img/add-circle-fill.8c229cb4.svg"},"24a5":function(t,e,i){t.exports=i.p+"static/img/arrow-up-s-fill.e1af83d3.svg"},"4af8":function(t,e,i){t.exports=i.p+"static/img/checkbox-blank-circle-line.916a9cf7.svg"},"5e7c":function(t,e,i){"use strict";i("b4f7")},"8ea1":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"body"},[a("div",{staticClass:"container"},[a("div",{staticClass:"list"},[a("div",{staticClass:"title"},[t._v("机器人列表")]),t._m(0),a("ul",t._l(t.Robot,(function(e,s){return a("li",{key:s,on:{click:function(i){return t.selectRobot(e)}}},[a("img",{attrs:{src:i("b69f")}}),a("div",[t._v(t._s(e.name))])])})),0),t._m(1)]),a("div",{staticClass:"line"},[a("div",{staticClass:"info"},[a("div",[t._v("位置:"+t._s(t.robotData.distance))]),a("div",[t._v("速度: "+t._s(t.robotData.speed))]),a("div",[t._v("温度: "+t._s(t.robotData.temperature))]),a("div",[t._v("湿度: "+t._s(t.robotData.humidity))]),a("div",{staticClass:"block"}),a("div",[t._v("彬乾I线")])]),a("canvas",{staticStyle:{position:"absolute","z-index":"100"},attrs:{id:"canvas",width:"1340",height:"220"}}),a("img",{attrs:{src:i("bf7b")}})]),t._m(2),a("div",{staticClass:"status"},[a("div",{staticClass:"info"},[a("div",{staticClass:"title"},[t._v(t._s(t.Robot_Selected)+"状态")]),a("div",{staticClass:"item"},[a("div",[t._v("名称:")]),a("div",[t._v(t._s(t.robotData.name))])]),a("div",{staticClass:"item"},[a("div",[t._v("行走方向:")]),a("div",[t._v(t._s(t.robotData.walkDirection))])]),a("div",{staticClass:"item"},[a("div",[t._v("剩余电量:")]),a("div",[t._v(t._s(t.robotData.robotPower))])]),a("div",{staticClass:"item"},[a("div",[t._v("当前状态:")]),a("div",[t._v(t._s(t.robotData.workState))])]),t._m(3),a("div",{staticClass:"item"},[a("div",[t._v("设备消息:")]),a("div",[t._v(t._s(t.robotData.cameraPowerStatus))])]),a("div",{staticClass:"item"},[a("div",[t._v("滑台位置")]),a("div",[t._v(t._s(t.robotData.slidePosition))])]),a("div",{staticClass:"item"},[a("div",[t._v("运动模式")]),a("div",[t._v(t._s(t.robotData.walkPattern))])]),a("div",{staticClass:"item"},[a("div",[t._v("通信等待时限")]),a("div",[t._v(t._s(t.robotData.interruptTime))])])]),a("div",{staticClass:"control"},[a("div",{staticClass:"base"},[a("div",{staticClass:"btn-pr"},[a("img",{attrs:{src:i("1f00")},on:{click:function(e){return t.control("zoomin")}}}),a("div",[t._v("变倍")]),a("img",{attrs:{src:i("181f")},on:{click:function(e){return t.control("zoomout")}}})]),a("div",{staticClass:"btn-pr"},[a("img",{attrs:{src:i("1f00")},on:{click:function(e){return t.control("focusin")}}}),a("div",[t._v("变焦")]),a("img",{attrs:{src:i("181f")},on:{click:function(e){return t.control("focusout")}}})]),a("span"),a("div",{staticClass:"d-pad"},[a("img",{attrs:{src:i("4af8")},on:{click:function(e){return t.control("stop")}}}),a("img",{attrs:{src:i("947b")},on:{click:function(e){return t.control("up")}}}),a("img",{attrs:{src:i("ef2e")},on:{click:function(e){return t.control("down")}}}),a("img",{attrs:{src:i("9613")},on:{click:function(e){return t.control("left")}}}),a("img",{attrs:{src:i("a94a")},on:{click:function(e){return t.control("right")}}})])]),a("div",{staticClass:"tools"},[a("div",{staticClass:"select"},[a("el-select",{attrs:{placeholder:"请选择工作状态",size:"20"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,(function(t){return a("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),a("el-button",{on:{click:t.workPattern}},[t._v("确定")])],1),a("div",{staticClass:"grid-9"},[a("el-button",{on:{mouseup:t.mouseup},nativeOn:{mousedown:function(e){return t.mouse(e)}}},[a("img",{attrs:{src:i("ae3c")}})]),a("el-button",{on:{click:t.walkstop}},[a("img",{attrs:{src:i("fd7e")}})]),a("el-button",{nativeOn:{mousedown:function(e){return t.mousedown(e)},mouseup:function(e){return t.mouseup(e)}}},[a("img",{attrs:{src:i("aef6")}})]),a("button",{on:{click:t.spee}},[t._v("加档")]),a("button",{attrs:{id:"level"}},[t._v(t._s(t.robotData.speed))]),a("button",{on:{click:t.spe}},[t._v("减档")])],1),a("div",{staticClass:"grid-4"},[a("button",{on:{click:function(e){return t.walkPattern1("1")}}},[t._v("连续")]),a("button",{on:{click:function(e){return t.walkPattern0("0")}}},[t._v("点动")]),a("button",{on:{click:t.captureImage}},[t._v("抓图")]),a("button",{on:{click:t.detectTemperature}},[t._v("测温")]),a("button",{on:{click:t.loadCable}},[t._v("装载")]),a("button",{on:{click:t.slidPosition}},[t._v("升滑台")]),a("button",{on:{click:t.repairGroundWire}},[t._v("修补")]),a("button",{on:{click:t.slidPositio}},[t._v("降滑台")])])])])])]),a("div",{staticClass:"statusBar"},[a("div",{staticClass:"msg"},[t._v("系统消息:"+t._s(t.news.object)+t._s(t.news.action))]),a("div",{staticClass:"time"},[t._v(t._s(t.news.createTime))])])])},s=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",[a("img",{attrs:{src:i("24a5")}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",[a("img",{attrs:{src:i("ba4f")}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"camera"},[i("div",{staticClass:"item"},[i("div",{staticClass:"title"},[t._v("主摄像头")]),i("div",{attrs:{id:"wasmPlayer1"}})]),i("div",{staticClass:"item"},[i("div",{staticClass:"title"},[t._v("热成像图")]),i("div",{attrs:{id:"wasmPlayer2"}})]),i("div",{staticClass:"item"},[i("div",{staticClass:"title"},[t._v("前轮摄像头")]),i("div",{attrs:{id:"wasmPlayer3"}})]),i("div",{staticClass:"item"},[i("div",{staticClass:"title"},[t._v("后轮摄像头")]),i("div",{attrs:{id:"wasmPlayer4"}})])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"item"},[i("div",[t._v("网络状态：")]),i("div")])}],n=(i("513c"),i("b775"));function r(t){return Object(n["a"])({url:"/command/captureImage/",method:"get",params:t})}function o(t){return Object(n["a"])({url:"command/detectTemperature/",method:"get",params:t})}function c(t){return Object(n["a"])({url:"command/loadCable",method:"get",params:t})}function l(t){return Object(n["a"])({url:"/command/repairGroundWire",method:"get",params:t})}function u(t){return Object(n["a"])({url:"command/slidePosition",method:"get",params:t})}function m(t){return Object(n["a"])({url:"command/speed",method:"get",params:t})}function d(t){return Object(n["a"])({url:"command/speed",method:"get",params:t})}function v(t){return Object(n["a"])({url:"command/walkDirection",method:"get",params:t})}function b(t){return Object(n["a"])({url:"command/walkPattern",method:"get",params:t})}function f(t){return Object(n["a"])({url:"command/clickPattern",method:"get",params:t})}var p=i("f753"),h=i.n(p),g=i("9bfb"),_=i.n(g),w=i("0f63"),k=i.n(w),C={timer:null,start:null,end:null,play:null},N={data:function(){return{options:[{value:"0",label:"待命"},{value:"1",label:"充电"},{value:"2",label:"寻找充电桩"}],value:"",videoUrl1:"http://39.104.53.187:10810/nvc/server/flv/hls/stream_2.flv",videoUrl2:"http://39.104.53.187:10810/nvc/server/flv/hls/stream_1.flv",videoUrl3:"http://39.104.53.187:10810/nvc/server/flv/hls/stream_3.flv",videoUrl4:"http://39.104.53.187:10810/nvc/server/flv/hls/stream_4.flv",serialNumber:"",channels:"",player:"",timer:"",Robot:[{name:"机器人1",serialNumber:1},{name:"机器人2",serialNumber:2},{name:"机器人3",serialNumber:3},{name:"机器人4",serialNumber:4}],Robot_Selected:"机器人",ctx:null,robotData:{},news:{}}},mounted:function(){this.channelNum=2,this.init,this.webSocketConnect(),this.serialNumber=65535,this.ctx=document.getElementById("canvas").getContext("2d");new WasmPlayer(this.videoUrl1,"wasmPlayer1",this.callbackfun,{Height:!0}),new WasmPlayer(this.videoUrl2,"wasmPlayer2",this.callbackfun,{Height:!0}),new WasmPlayer(this.videoUrl3,"wasmPlayer3",this.callbackfun,{Height:!0}),new WasmPlayer(this.videoUrl4,"wasmPlayer4",this.callbackfun,{Height:!0})},methods:{selectRobot:function(t){console.log(t);var e={serialNumber:t.serialNumber};console.log(e),h.a.get(e).then((function(t){console.log(t)}))},callbackfun:function(t){console.log("callbackfun",t)},webSocketConnect:function(){var t=this,e=new _.a("http://www.aait-suse.cn/dlxj/endpoint_is");this.stompClient=k.a.over(e),this.stompClient.connect({},(function(e){console.log(e),t.stompClient.subscribe("/alarm",(function(e){var i=JSON.parse(JSON.parse(JSON.stringify(e)).body).data;t.error=i,console.log("------"+i),console.log(e)})),t.stompClient.subscribe("/robotData/65535",(function(e){var i=JSON.parse(JSON.parse(JSON.stringify(e)).body).data;t.robotData=i,t.runContext(i.towerNumber,i.distance)})),t.stompClient.subscribe("/systemMessage",(function(e){var i=JSON.parse(JSON.parse(JSON.stringify(e)).body).data;t.news=i}))}))},mousedown:function(){"点动"!==this.robotData.walkPattern?this.walkon():(this.walkon(),C.start=(new Date).getTime(),C.timer=setInterval((function(){C.end=(new Date).getTime(),C.end-C.start>1e3&&clearInterval(C.timer)}),100))},mouseup:function(){"点动"===this.robotData.walkPattern&&(clearInterval(C.timer),this.walkstop())},mouse:function(){"点动"!==this.robotData.walkPattern?this.walkback():(this.walkback(),C.start=(new Date).getTime(),C.timer=setInterval((function(){C.end=(new Date).getTime(),C.end-C.start>1e3&&clearInterval(C.timer)}),100))},walkon:function(){v({serialNumber:this.serialNumber,direction:"1"})},walkback:function(){v({serialNumber:this.serialNumber,direction:"2"})},walkstop:function(){v({serialNumber:this.serialNumber,direction:"0"})},spee:function(t){m({serialNumber:this.serialNumber,speed:this.robotData.speed+1})},spe:function(t){d({serialNumber:this.serialNumber,speed:this.robotData.speed-1})},walkPattern0:function(t){f({serialNumber:this.serialNumber})},walkPattern1:function(t){b({serialNumber:this.serialNumber,pattern:t})},runContext:function(t,e){var i=68,a=800;switch(t){case 0:a=180+.38*Number(e);break;case 1:a=370+.38*Number(e);break;case 2:a=560+.38*Number(e);break;case 3:a=800+.38*Number(e);break;default:break}this.ctx.clearRect(0,0,1340,220),this.ctx.beginPath(),this.ctx.moveTo(a,i),this.ctx.lineTo(a+10,i+10),this.ctx.lineTo(a+20,i),this.ctx.lineWidth=2,this.ctx.strokeStyle="red",this.ctx.stroke()},captureImage:function(t){r({serialNumber:this.serialNumber})},detectTemperature:function(t){o({serialNumber:this.serialNumber})},loadCable:function(){c({serialNumber:this.serialNumber})},slidPosition:function(){100===this.robotData.slidePosition?alert("当前以达到最大值"):u({serialNumber:this.serialNumber,position:this.robotData.slidePosition+5})},slidPositio:function(){0===this.robotData.slidePosition?alert("当前滑台位置已达到最小"):u({serialNumber:this.serialNumber,position:this.robotData.slidePosition-5})},repairGroundWire:function(){var t=this;l({serialNumber:this.serialNumber}).then((function(e){if(console.log(e),201!==e.meta.status)return t.$message.error("操作失败");t.$message.success("操作成功")}))},control:function(t){h.a.get("http://39.104.53.187:10810/nvc/server/api/v1/ptzcontrol",{params:{channel:this.channelNum,command:t}}).then((function(t){console.log(t)})).catch((function(t){console.log(t)}))}}},P=N,x=(i("5e7c"),i("5d22")),D=Object(x["a"])(P,a,s,!1,null,"67160ce2",null);e["default"]=D.exports},"947b":function(t,e,i){t.exports=i.p+"static/img/arrow-up-s-line.006abb6b.svg"},9613:function(t,e,i){t.exports=i.p+"static/img/arrow-left-s-line.6f380326.svg"},a94a:function(t,e,i){t.exports=i.p+"static/img/arrow-right-s-line.753ed532.svg"},ae3c:function(t,e,i){t.exports=i.p+"static/img/arrow-left-fill.c1832358.svg"},aef6:function(t,e,i){t.exports=i.p+"static/img/arrow-right-fill.47d0cd4f.svg"},b4f7:function(t,e,i){},b69f:function(t,e,i){t.exports=i.p+"static/img/rbt.c07a976e.png"},ba4f:function(t,e,i){t.exports=i.p+"static/img/arrow-down-s-fill.e017016a.svg"},bf7b:function(t,e,i){t.exports=i.p+"static/img/tieta.d47af448.jpg"},ef2e:function(t,e,i){t.exports=i.p+"static/img/arrow-down-s-line.ee1fa532.svg"},fd7e:function(t,e,i){t.exports=i.p+"static/img/stop-fill.186a7a53.svg"}}]);