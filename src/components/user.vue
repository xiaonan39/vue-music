<!--  -->
<template>
    <div class="user">
        <!-- 登录前 -->
        <div class="login_before" @click="dialogVisible = true;openModal()"
            v-if="!isLogin">
            <i class="el-icon-user-solid"></i>
            <span>未登录</span>
        </div>
        <!-- 登陆后 -->
        <div class="login_after" v-else>
            <img />
            <span>已登录</span>
        </div>

        <!-- 登录框 -->
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="20%"
            :before-close="handleClose">
            <el-input  placeholder="请输入您的网易云id" v-model="uid"/>
            <div class="login_help">
                <!--  target不添加_blank时会从-->
                <p>1、请<a href="http://music.163.com" target="_blank">点我(http://music.163.com)</a>打开网易云音乐官网</p>
                <p>2、点击页面右上角的“登录”</p>
                <p>3、点击您的头像，进入我的主页</p>
                <p class="help">
                    4、复制浏览器地址栏 /user/home?id= 后面的数字（网易云 UID）
                </p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="login(uid)"
                    class="login_btn">确 定
                </el-button>
            </span>
        </el-dialog>
        
    </div>
</template>

<script>
import {
  mapActions as mapUserActions,mapState as mapUserState,mapGetters as mapUserGetters
} from "@/store/helper/user";
import Chmodal from './modal';
import storage from 'good-storage';
import {UID_KEY,isDef} from '@/utils';

export default {
    name:"user",     
    props:{},
    data () {
        return {
            dialogVisible:"",
            title:"登录",
            visible:false,
            uid:"",
            loading:false
        };
    },
    components: {
        Chmodal
    },
    computed: {
        ...mapUserState(["user"]),
        ...mapUserGetters(["isLogin"]),
    },
    watch:{
        
    },
    methods: {
        openModal(){
            console.log(this.dialogVisible)
        },
        handleClose(done) {
            done();
        },
        async login(uid){
            this.visible = true;
            const success = await this.login(uid).finally(()=>{
                this.loading = false;
            })
            if(success){
                this.closeModal()
            }
        },
        closeModal(){
            this.visible = false
        },
        ...mapUserActions(["login", "logout"])
    },
    mounted(){},
    created(){
        //自动登录
        const uid = storage.get(UID_KEY);
        if(isDef(uid)){
            this.login(uid)
        }
    }
}

</script>
<style lang='scss' scoped>
@import '@/style/index.scss';
.user{
    .login_before{
        padding:20px;
        cursor: pointer;
        font-size:$font-xxl;
    }
    .login_btn{
        width:100%;
    }
    .login_help{
        font-size: $font-l;
    }
}

</style>