import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
import axios from 'axios'

var a
var wesocket = {
  debug: true,
  connection: '',
  vuex: {}
}

// ajax请求接口返回websocket连接
axios({
  method: 'GET',
  url: 'http://localhost:10010/',
  headers: {
    'Content-Type': 'application/json'
  }
}).then(function(response) {
  wesocket.connection = response.data + '/price'
  if (wesocket.connection != '') {
    Vue.use(new VueSocketIO(wesocket))
  }

  console.log(response.data)
})
export default a
