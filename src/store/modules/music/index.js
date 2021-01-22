import  state from "./actions";
import  * as getters from "./getters";
import mutations from "./mutations";
import state from "./state";

export default{
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}