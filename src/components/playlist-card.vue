<!--  -->
<template>
    <div class="playlist">
        <span>{{title}}</span>
        <div class="playlist_wrap" @click="clickCard">
            <el-card class="playlist_card" v-for="(item,index) in image" :key="index">
                <img :src ="item.picUrl">
                <div class="desc_wrap">
                    <span>{{item.copywriter}}</span>
                </div>
                <p :title="item.name">{{item.name}}</p>
            </el-card>
        </div>
    </div>

</template>

<script>
export default {
    props:{
      title:{type:String,default:"歌单"},
      image:{type:Array},
    },
    data () {
        return {
        };
    },
    methods: {
        clickCard(){
                
        }
    },
    created(){
        this.$nextTick(()=>{
            console.log(this.image)
        })
    }
}

</script>
<style lang='scss' scoped>
@import '@/style/index.scss';
.playlist{
    width: 100%;
    .playlist_wrap{
            display: flex;
            flex-wrap: wrap;
                justify-content: space-around;
        .playlist_card{
            width: 18%;
            margin-top: 20px;
            font-size: $icon-m;
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
            }
            &:hover{
                .desc_wrap{
                    transform: translateY(0);
                }
            }
            p{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    
}

</style>