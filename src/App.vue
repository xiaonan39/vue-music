<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      <el-container>
        <Header></Header>
      </el-container>
      <el-container>
        <el-aside>
          <Menu></Menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import Menu from "./components/menu";
import Header from "./views/header";
export default {
  metaInfo(){
    return{
      title:"cheng-music"
    }
  },
  components:{Menu,Header},

}
</script>
<style>
html,body{
  margin:0;
  padding:0;
  width:100%;
  height:100%;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* 下边的是自己加的 */
  width:100%;
  height:100%;
  overflow: hidden;
}
#nav {
  height: 100%;
  display: flex;
  flex-direction:column;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  display: flex;
  flex-direction: column;
  height:100%
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
/* 若只写first-child则会选中nav及其子元素、孙子元素……的第一个子元素 */
#nav>:first-child{
  height:10%;
  background-color: rgb(246, 246, 246);

}
#nav :nth-child(2){
  display: flex;
  width:100%;
  height:100%;
}
</style>
