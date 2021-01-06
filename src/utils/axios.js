import axios from 'axios'
import {Loading} from 'element-ui';
import {confirm} from '@/base/confirm.vue';
import store from '@/store';

const BASE_URL = "https://api.mtnhao.com";

//不带全局loading的请求实例；与api中的user.js中的请求方法一致的
export const requestWithoutLoading = createBaseInstance();

//带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所以要在内部插入loading拦截器的处理逻辑
export const request = createBaseInstance();

mixinLoading(request.interceptors)

function createBaseInstance(){
    const instance = axios.create({
        baseURL : BASE_URL,
    })
    instance.interceptors.response.use(handResponse,handError)
    return instance
}

function handError(e){
    confirm(e.message,'出错啦')
    throw e
}
function handResponse(response){
    return response.data
}

let loading
let loadingCount = 0
const SET_AXIOS_LOADING = 'global/setAxiosLoading';
function mixinLoading(interceptors){
    interceptors.request.use(loadingRequestInterceptor);
    interceptors.response.use(loadingResponseInterceptor,loadingResponseErrorInterceptor)
}
function loadingRequestInterceptor(config){
    if(!loading){
        loading = Loading.service({
            target:'body',
            background:'transparent',
            text:'载入中',
        })
        store.commit(SET_AXIOS_LOADING,true)
    }
    loadingCount++
    return config
}
function handResponseLoading(){
    loadingCount--
    if (loadingCount === 0) {
      loading.close()
      loading = null
      store.commit(SET_AXIOS_LOADING, false)
    }
  }

  function loadingResponseInterceptor(response) {
    handResponseLoading()
    return response
  }

  function loadingResponseErrorInterceptor(e) {
    handResponseLoading()
    throw e
  }
