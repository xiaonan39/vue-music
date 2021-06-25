<!--  -->
<template>
    <div class="playlist">
        <span>{{title}}</span>
        <div class="playlist_wrap" @click="clickCard">
            <el-card class="playlist_card" v-for="(item,index) in image" :key="index">
                <img :src ="item.picUrl">
                <div class="desc_wrap">
                    <!-- 哈哈,ellipsis是自己在utils中添加的，若长度超过一定字符，超过的部分显示为“…”，缺点是当页面变窄遮罩层会变高……还是用css吧-->
                    <span>{{item.copywriter}}</span>
                </div>
                <p :title="item.name">{{item.name}}</p>
            </el-card>
        </div>
    </div>

</template>

<script>
// import { ellipsis } from "@/utils";
export default {
  props:{
    title:{type:String,default:"歌单"},
    image:{type:Array},
  },
  data () {
    return {
      maxPreviewLength:18,
    };
  },
  methods: {
    clickCard () {
                
    },
    
  },
  created () {
    this.$nextTick(()=>{
    });
  }
};

</script>
<style lang='scss' scoped>
@import '@/style/index.scss';
.playlist{
    width: 100%;
    >span{
        font-size: $font-xl;
    }
    .playlist_wrap{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            /deep/.el-card__body{
                padding: 0px !important;
            }
        .playlist_card{
            width: 18%;
            margin-top: 20px;
            padding: 0px !important;
            font-size: $icon-s;
            position: relative;
            img{
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
            .desc_wrap{
                position: absolute;
                background-color: rgba(0, 0, 0, 0.4);
                transform: translateY(-100%);
                transition: all 0.3s;
                left: 0;
                right: 0;
                top: 0;
                color:white;
                @include many-ellipsis(2);
            }
            &:hover{
                .desc_wrap{
                    transform: translateY(0);
                }
            }
            p{
                @include text-ellipsis;
            }
        }
    }
    
}

</style>