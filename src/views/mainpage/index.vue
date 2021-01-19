<template>
  <div class="mainpage-container">
    <div class="robot">
      <span>机器人列表</span>
    </div>

    <div class="second">
      <div class="tieta">
        <span>铁塔</span>
      </div>

      <div class="three">

        <div class="zhibo">
          <span>直播</span>
        </div>

        <div class="first">

          <div class="zhuangtai">
            <span>机器人状态</span>
          </div>

          <div class="zhiling">
            <span>机器人指令</span>
          </div>
        </div>

      </div>
    </div>

  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Mainpage',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.mainpage-container{
  display: flex;
  padding: 1em;
  flex-direction: row;

  .robot{
    padding: 1em;
    background-color:black;
    flex: 10%;
    height: 1200px;
  }

  .second{
    padding: 1em;
    flex: 90%;
    height: 1200px;
    flex-direction: column;

    .tieta{
      padding: 1em;
      background-color: #20a0ff;
      flex:100% ;
      height: 280px;
    }
  }
}
.three{
  padding: 1em;
  flex-direction: row;
  height: 800px;

  .zhibo{
    padding:1em;
    background-color: orange;
    flex: 60%;
  }
  .first{
    padding: 1em;
    flex-direction: column;
    flex: 40%;
    .zhuangtai{
      background-color: darkslategray;
    }
    .zhiling{
      background-color: ghostwhite;
    }
  }
}
</style>
