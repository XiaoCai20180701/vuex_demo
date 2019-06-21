<template>
  <div class="hello">
    <router-link to="/cart">去往 cart 页面</router-link>
    <!--<h1>vuex - num:{{getNum}}</h1>-->
    <!--<h1>vuex - mapState 箭头函数:{{getNum2}}</h1>-->
    <!--<h1>vuex - mapState 字符串:{{getNum3}}</h1>-->
    <!--<h1>vuex - mapState 函数:{{getNum4}}</h1>-->
    <!--<h1>vuex - mapState 扩展运算符:{{getNum5}} -&#45;&#45;&#45;&#45;&#45;&#45;{{getText}}</h1>-->
    <h1>vuex - mapState 当前组件的计算属性的方法与store中state中key一样:{{num}} </h1>
    <h1>vuex - mapState 当前组件的计算属性的方法与store中state中key一样:{{text}} </h1>
    <div class="wrap">
      <h1>vuex - getters: 获取store中getters的list </h1>
      <div v-for="(item) in getList">
        <span>{{item.id}}-------{{item.msg}}</span>
      </div>
    </div>
    <div class="wrap">
      <h1>vuex - getters: 获取store中getters的item </h1>
      <p>{{getItem.msg}}</p>
    </div>
    <div class="wrap">
      <i-button @click="addNum" type="primary">计算 同步 值+3</i-button>
      <i-button @click="addNumByasync" type="primary">计算  异步（actions） 值+5</i-button>
    </div>
    <div class="wrap">
      <h3>名字：{{myProp}}</h3>
      <i-button type="success" @click="changeStateProp">修改 state 的数据</i-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        hhNum: 10
      }
    },
    /*
    普通获取stroe中状态
    computed: {
      getNum () {
        return this.$store.state.num
      }
    }
    */
    /*
    computed: mapState({
      getNum2: state => state.num,
      getNum3: 'num',
      getNum4 (state) {
        return state.num + this.hhNum
      }
    })
    */
    /* 将对象的扩展运算符里面的操作同上
    computed:{
     ...mapState({
        getNum5: 'num',
        getText: 'text'
      })
    }
    */
    /* 当前组件的计算属性的方法与store中state中key一样，则可以这样写 */
    computed: {
      /* mapState 不适合 获取module中的数据
      ...mapState(['num', 'text']),
      */
      num () {
        return this.$store.state.a.num
      },
      text () {
        return this.$store.state.a.text
      },
      getList () {
        return this.$store.getters.lists
      },
      getItem () {
        return this.$store.getters.item(3)
      },
      myProp () {
        return this.$store.getters.myProp.name
      }
    },
    methods: {
      addNum () {
        /* 1.第一个参数是事件的名称，第二个参数是传递的数据表 */
        this.$store.commit('AddNumFun', 3)
        /* 2.以对象的方式提交 */
        /*
        this.$store.commit({
          type: 'addNumFun',
          count: 5
        })
        */
      },
      addNumByasync () {
        this.$store.dispatch('addNumByasyncFun', {count: 5})
      },
      changeStateProp () {
        this.$store.dispatch('changeStateProp', {name: '黄小菜333'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrap {
  margin-bottom: 30px;
}
</style>
