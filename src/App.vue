<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <el-container>
        <Header></Header>
      </el-container>
      <el-container>
        <aside>
          <Menu></Menu>
        </aside>
        <main>
          <div>
          <router-view />
          </div>
        </main>
      </el-container>
      <el-container>
        <footer>--</footer>
      </el-container>
    </div>
  </div>
</template>
<script>
import Menu from "./components/menu";
import Header from "./views/header";
export default {
  metaInfo () {
    return{
      title:"cheng-music"
    }
  },
  components:{Menu,Header},

}
</script>
<style lang='scss' scoped>

/* i标签的大小要用font-size控制 */

</style>
