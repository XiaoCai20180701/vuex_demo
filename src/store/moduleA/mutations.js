import Vue from 'vue'
export default {
  AddNumFun (state, count) {
    state.num += count
  },
  AddNumByasyncFun (state, count) {
    state.num += count
  },
  ChangeStateProp (state, name) {
    /* Mutation需遵守Vue的响应规则
    * 既然Vuex的store中的状态是响应式的，那么当我们变更状态时，监视状态的vue组件也会自动更新，
    * 这也意味着vuex中的mutation也需要与使用vue一样遵守一些注意事项：
    * 1.最好提前在你的store中初始化所有所需属性
    * 2.当需要在对象上添加新属性时，你应该
    * (1)使用 Vue.set(obj,'newProp',123)
    * (2)以新对象替换老对象，例如 state.obj={...state.obj,newProp:123}
    * */
    state.myProp = {...state.myProp, name: name}
  }
}
