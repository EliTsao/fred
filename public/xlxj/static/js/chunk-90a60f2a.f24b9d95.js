(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-90a60f2a"],{"181f":function(t,e,s){t.exports=s.p+"static/img/indeterminate-circle-fill.f9fe53d3.svg"},"1f00":function(t,e,s){t.exports=s.p+"static/img/add-circle-fill.8c229cb4.svg"},"24a5":function(t,e,s){t.exports=s.p+"static/img/arrow-up-s-fill.e1af83d3.svg"},"4af8":function(t,e,s){t.exports=s.p+"static/img/checkbox-blank-circle-line.916a9cf7.svg"},"8ea1":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"body"},[i("div",{staticClass:"container"},[i("div",{staticClass:"list"},[i("div",{staticClass:"title"},[t._v("机器人列表")]),t._m(0),i("ul",t._l(t.Robot,(function(e,a){return i("li",{key:a,on:{click:function(s){return t.selectRobot(e)}}},[i("img",{attrs:{src:s("b69f")}}),i("div",[t._v(t._s(e.name))])])})),0),t._m(1)]),i("div",{staticClass:"line"},[i("div",{staticClass:"info"},[i("div",[t._v("位置:"+t._s(t.robotData.distance))]),i("div",[t._v("速度: "+t._s(t.robotData.speed))]),i("div",[t._v("温度: "+t._s(t.robotData.temperature))]),i("div",[t._v("湿度: "+t._s(t.robotData.humidity))]),i("div",{staticClass:"block"}),i("div",[t._v("彬乾I线")])]),i("canvas",{staticStyle:{position:"absolute","z-index":"100"},attrs:{id:"canvas",width:"1340",height:"220"}}),i("img",{attrs:{src:s("bf7b")}})]),t._m(2),i("div",{staticClass:"status"},[i("div",{staticClass:"info"},[i("div",{staticClass:"title"},[t._v(t._s(t.Robot_Selected)+"状态")]),i("div",{staticClass:"item"},[i("div",[t._v("名称:")]),i("div",[t._v(t._s(t.robotData.name))])]),i("div",{staticClass:"item"},[i("div",[t._v("行走方向:")]),i("div",[t._v(t._s(t.robotData.walkDirection))])]),i("div",{staticClass:"item"},[i("div",[t._v("剩余电量:")]),i("div",[t._v(t._s(t.robotData.robotPower))])]),i("div",{staticClass:"item"},[i("div",[t._v("当前状态:")]),i("div",[t._v(t._s(t.robotData.workState))])]),t._m(3),i("div",{staticClass:"item"},[i("div",[t._v("设备消息:")]),i("div",[t._v(t._s(t.robotData.cameraPowerStatus))])]),i("div",{staticClass:"item"},[i("div",[t._v("滑台位置")]),i("div",[t._v(t._s(t.robotData.slidePosition))])]),i("div",{staticClass:"item"},[i("div",[t._v("运动模式")]),i("div",[t._v(t._s(t.robotData.walkPattern))])])]),i("div",{staticClass:"control"},[i("div",{staticClass:"base"},[i("div",{staticClass:"btn-pr"},[i("img",{attrs:{src:s("1f00")},on:{click:function(e){return t.control("zoomin")}}}),i("div",[t._v("变倍")]),i("img",{attrs:{src:s("181f")},on:{click:function(e){return t.control("zoomout")}}})]),i("div",{staticClass:"btn-pr"},[i("img",{attrs:{src:s("1f00")},on:{click:function(e){return t.control("focusin")}}}),i("div",[t._v("变焦")]),i("img",{attrs:{src:s("181f")},on:{click:function(e){return t.control("focusout")}}})]),i("span"),i("div",{staticClass:"d-pad"},[i("img",{attrs:{src:s("4af8")},on:{click:function(e){return t.control("stop")}}}),i("img",{attrs:{src:s("947b")},on:{click:function(e){return t.control("up")}}}),i("img",{attrs:{src:s("ef2e")},on:{click:function(e){return t.control("down")}}}),i("img",{attrs:{src:s("9613")},on:{click:function(e){return t.control("left")}}}),i("img",{attrs:{src:s("a94a")},on:{click:function(e){return t.control("right")}}})])]),i("div",{staticClass:"tools"},[i("div",{staticClass:"select"},[i("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择工作状态"},model:{value:t.value,callback:function(e){t.value=e},expression:"value"}},t._l(t.options,(function(t){return i("el-option",{key:t.value,attrs:{label:t.label,value:t.value}})})),1),i("el-button",{on:{click:t.workPattern}},[t._v("确定")])],1),i("div",{staticClass:"grid-9"},[i("el-button",{on:{mouseup:t.mouseup},nativeOn:{mousedown:function(e){return t.mouse(e)}}},[i("img",{attrs:{src:s("ae3c")}})]),i("el-button",{on:{click:t.walkstop}},[i("img",{attrs:{src:s("fd7e")}})]),i("el-button",{nativeOn:{mousedown:function(e){return t.mousedown(e)},mouseup:function(e){return t.mouseup(e)}}},[i("img",{attrs:{src:s("aef6")}})]),i("button",{on:{click:t.spee}},[t._v("加档")]),i("button",{attrs:{id:"level"}},[t._v(t._s(t.robotData.speed))]),i("button",{on:{click:t.spe}},[t._v("减档")])],1),i("div",{staticClass:"grid-4"},[i("button",{on:{click:function(e){return t.walkPattern1("1")}}},[t._v("连续")]),i("button",{on:{click:function(e){return t.walkPattern0("0")}}},[t._v("点动")]),i("button",{on:{click:t.captureImage}},[t._v("抓图")]),i("button",{on:{click:t.detectTemperature}},[t._v("测温")]),i("button",{on:{click:t.loadCable}},[t._v("装载")]),i("button",{on:{click:t.slidPosition}},[t._v("升滑台")]),i("button",{on:{click:t.repairGroundWire}},[t._v("修补")]),i("button",{on:{click:t.slidPositio}},[t._v("降滑台")])])])])])]),i("div",{staticClass:"statusBar"},[i("div",{staticClass:"msg"},[t._v("系统消息:"+t._s(t.news.object)+t._s(t.news.action))]),i("div",{staticClass:"time"},[t._v(t._s(t.news.createTime))])])])},a=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",[i("img",{attrs:{src:s("24a5")}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("button",[i("img",{attrs:{src:s("ba4f")}})])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"camera"},[s("div",{staticClass:"item"},[s("div",{staticClass:"title"},[t._v("主摄像头")]),s("div",{attrs:{id:"wasmPlayer1"}})]),s("div",{staticClass:"item"},[s("div",{staticClass:"title"},[t._v("热成像图")]),s("div",{attrs:{id:"wasmPlayer2"}})]),s("div",{staticClass:"item"},[s("div",{staticClass:"title"},[t._v("前轮摄像头")]),s("div",{attrs:{id:"wasmPlayer3"}})]),s("div",{staticClass:"item"},[s("div",{staticClass:"title"},[t._v("后轮摄像头")]),s("div",{attrs:{id:"wasmPlayer4"}})])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"item"},[s("div",[t._v("网络状态：")])])}],r=(s("513c"),s("b775"));function n(t){return Object(r["a"])({url:"command/captureImage/",method:"get",params:t})}function o(t){return Object(r["a"])({url:"command/detectTemperatureV2/",method:"get",params:t})}function c(t){return Object(r["a"])({url:"command/loadCable",method:"get",params:t})}function l(t){return Object(r["a"])({url:"command/repairGroundWire",method:"get",params:t})}function u(t){return Object(r["a"])({url:"command/slidePosition",method:"get",params:t})}function m(t){return Object(r["a"])({url:"command/speed",method:"get",params:t})}function d(t){return Object(r["a"])({url:"command/walkDirection",method:"get",params:t})}function v(t){return Object(r["a"])({url:"command/walkPattern",method:"get",params:t})}function f(t){return Object(r["a"])({url:"command/workPattern",method:"get",params:t})}function b(t){return Object(r["a"])({url:"command/clickPattern",method:"get",params:t})}var h=s("f753"),g=s.n(h),p=s("9bfb"),_=s.n(p),w=s("0f63"),k=s.n(w),C={timer:null,start:null,end:null,play:null},N={data:function(){return{options:[{value:"0",label:"待命"},{value:"1",label:"充电"},{value:"2",label:"寻找充电桩"}],value:"",videoUrl1:"http://39.104.53.187:10810/nvc/server/flv/hls/stream_2.flv",videoUrl2:"http://39.104.53.187:10810/nvc/server/flv/hls/stream_1.flv",videoUrl3:"http://39.104.53.187:10810/nvc/server/flv/hls/stream_3.flv",videoUrl4:"http://39.104.53.187:10810/nvc/server/flv/hls/stream_4.flv",serialNumber:"",channels:"",player:"",timer:"",Robot:[{name:"机器人1",serialNumber:1},{name:"机器人2",serialNumber:2},{name:"机器人3",serialNumber:3},{name:"机器人4",serialNumber:4}],Robot_Selected:"机器人",ctx:null,robotData:{},news:{}}},mounted:function(){this.channelNum=2,this.init,this.webSocketConnect(),this.serialNumber=1,this.ctx=document.getElementById("canvas").getContext("2d");new WasmPlayer(this.videoUrl1,"wasmPlayer1",this.callbackfun,{Height:!0}),new WasmPlayer(this.videoUrl2,"wasmPlayer2",this.callbackfun,{Height:!0}),new WasmPlayer(this.videoUrl3,"wasmPlayer3",this.callbackfun,{Height:!0}),new WasmPlayer(this.videoUrl4,"wasmPlayer4",this.callbackfun,{Height:!0})},methods:{selectRobot:function(t){console.log(t);var e={serialNumber:t.serialNumber};console.log(e),g.a.get(e).then((function(t){console.log(t)}))},callbackfun:function(t){console.log("callbackfun",t)},webSocketConnect:function(){var t=this,e=new _.a("http://www.aait-suse.cn/dlxj/endpoint_is");this.stompClient=k.a.over(e),this.stompClient.connect({},(function(e){console.log(e),t.stompClient.subscribe("/alarm",(function(e){var s=JSON.parse(JSON.parse(JSON.stringify(e)).body).data;t.error=s,console.log(e)})),t.stompClient.subscribe("/robotData/1",(function(e){var s=JSON.parse(JSON.parse(JSON.stringify(e)).body).data;t.robotData=s,t.runContext(s.towerNumber,s.distance)})),t.stompClient.subscribe("/systemMessage",(function(e){var s=JSON.parse(JSON.parse(JSON.stringify(e)).body).data;t.news=s}))}))},mousedown:function(){"点动"!==this.robotData.walkPattern?this.walkon():(C.start=(new Date).getTime(),C.timer=setInterval((function(){C.end=(new Date).getTime(),this.walkon(),C.end-C.start>1e3&&(clearInterval(C.timer),this.walkon())}),800))},mouseup:function(){"点动"===this.robotData.walkPattern&&(clearInterval(C.timer),this.walkstop())},mouse:function(){"点动"!==this.robotData.walkPattern?this.walkback():(this.walkback(),C.start=(new Date).getTime(),C.timer=setInterval((function(){C.end=(new Date).getTime(),C.end-C.start>1e3&&this.walkback()}),1e3))},walkon:function(){var t=this;d({serialNumber:this.serialNumber,direction:"1"}).then((function(e){if(console.log(e),200!==e.code)return t.$message.error("操作失败");t.$message.success("当前运动模式为前进")}))},walkback:function(){var t=this;d({serialNumber:this.serialNumber,direction:"2"}).then((function(e){if(console.log(e),200!==e.code)return t.$message.error("操作失败");t.$message.success("当前运动模式为后退")}))},walkstop:function(){var t=this;d({serialNumber:this.serialNumber,direction:"0"}).then((function(e){if(console.log(e),200!==e.code)return t.$message.error("操作失败");t.$message.success("运动已停止")}))},spee:function(t){var e=this;10===this.robotData.speed?alert("当前速度已达到最大"):m({serialNumber:this.serialNumber,speed:this.robotData.speed+1}).then((function(t){if(console.log(t),200!==t.code)return e.$message.error("操作失败");e.$message.success("操作成功")}))},spe:function(t){var e=this;0===this.robotData.speed?alert("当前速度已达到最小"):m({serialNumber:this.serialNumber,speed:this.robotData.speed-1}).then((function(t){if(console.log(t),200!==t.code)return e.$message.error("操作失败");e.$message.success("操作成功")}))},walkPattern0:function(t){b({serialNumber:this.serialNumber})},walkPattern1:function(t){var e=this;v({serialNumber:this.serialNumber,pattern:t}).then((function(t){if(console.log(t),200!==t.code)return e.$message.error("操作失败");e.$message.success("行走模式修改成功")}))},runContext:function(t,e){var s=68,i=800;switch(t){case 0:i=180+.38*Number(e);break;case 1:i=370+.38*Number(e);break;case 2:i=560+.38*Number(e);break;case 3:i=800+.38*Number(e);break;default:break}this.ctx.clearRect(0,0,1340,220),this.ctx.beginPath(),this.ctx.moveTo(i,s),this.ctx.lineTo(i+10,s+10),this.ctx.lineTo(i+20,s),this.ctx.lineWidth=2,this.ctx.strokeStyle="red",this.ctx.stroke()},workPattern:function(t){var e=this;f({pattern:this.value,serialNumber:this.serialNumber}).then((function(t){if(console.log(t),200!==t.code)return e.$message.error("操作失败");e.$message.success("当前工作模式已切换成功")}))},captureImage:function(t){var e=this;n({serialNumber:this.serialNumber}).then((function(t){if(console.log(t),200!==t.code)return e.$message.error("操作失败");e.$message.success("抓图操作成功")}))},detectTemperature:function(t){var e=this;o({serialNumber:this.serialNumber}).then((function(t){if(console.log(t),200!==t.code)return e.$message.error("操作失败");e.$message.success("测温操作成功")}))},loadCable:function(){var t=this;c({serialNumber:this.serialNumber}).then((function(e){if(console.log(e),200!==e.code)return t.$message.error("操作失败");t.$message.success("开始装载")}))},slidPosition:function(){var t=this;100===this.robotData.slidePosition?alert("当前以达到最大值"):u({serialNumber:this.serialNumber,position:this.robotData.slidePosition+5}).then((function(e){if(console.log(e),console.log(status),200!==e.code)return t.$message.error("操作失败");t.$message.success("操作成功")}))},slidPositio:function(){var t=this;0===this.robotData.slidePosition?alert("当前滑台位置已达到最小"):u({serialNumber:this.serialNumber,position:this.robotData.slidePosition-5}).then((function(e){if(console.log(e),console.log(status),200!==e.code)return t.$message.error("操作失败");t.$message.success("操作成功")}))},repairGroundWire:function(){var t=this;l({serialNumber:this.serialNumber}).then((function(e){if(console.log(e),200!==e.code)return t.$message.error("操作失败");t.$message.success("操作成功")}))},control:function(t){g.a.get("http://39.104.53.187:10810/nvc/server/api/v1/ptzcontrol",{params:{channel:this.channelNum,command:t}}).then((function(t){console.log(t)})).catch((function(t){console.log(t)}))}}},P=N,x=(s("e545"),s("5d22")),D=Object(x["a"])(P,i,a,!1,null,"e119738a",null);e["default"]=D.exports},"947b":function(t,e,s){t.exports=s.p+"static/img/arrow-up-s-line.006abb6b.svg"},9613:function(t,e,s){t.exports=s.p+"static/img/arrow-left-s-line.6f380326.svg"},a3f5:function(t,e,s){},a94a:function(t,e,s){t.exports=s.p+"static/img/arrow-right-s-line.753ed532.svg"},ae3c:function(t,e,s){t.exports=s.p+"static/img/arrow-left-fill.c1832358.svg"},aef6:function(t,e,s){t.exports=s.p+"static/img/arrow-right-fill.47d0cd4f.svg"},b69f:function(t,e,s){t.exports=s.p+"static/img/rbt.c07a976e.png"},ba4f:function(t,e,s){t.exports=s.p+"static/img/arrow-down-s-fill.e017016a.svg"},bf7b:function(t,e,s){t.exports=s.p+"static/img/tieta.d47af448.jpg"},e545:function(t,e,s){"use strict";s("a3f5")},ef2e:function(t,e,s){t.exports=s.p+"static/img/arrow-down-s-line.ee1fa532.svg"},fd7e:function(t,e,s){t.exports=s.p+"static/img/stop-fill.186a7a53.svg"}}]);