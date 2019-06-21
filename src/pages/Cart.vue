<template>
  <div class="wrap">
    <router-link to="/hello">去往 helloWorld 页面</router-link>
    <h2>vuex - num: {{hh}}</h2>
    <div style="margin-top: 6px">
      库存数量:
      <i-input placeholder="0" style="width: auto" v-model="count"></i-input>
    </div>
    <div style="margin-top: 6px">
      购买数量:
      <i-button @click="substract">-</i-button>
      <i-input type="number" placeholder="0" style="width: auto" v-model="pickNum"></i-input>
      <i-button type="primary" @click="add">+</i-button>
    </div>
    <div style="margin-top: 6px">
      <i-button type="warning" @click="billHandler">加入购物车</i-button>
    </div>
    <transition name="fade" @after-enter="afterEnter">
      <div class="ball" v-if="isExist"></div>
    </transition>
  </div>
</template>
<script>
  import { getGoodsInfo } from '@/server/api'
  export default {
    data () {
      return {
        pickNum: 1,
        count: 10,
        isExist: false
      }
    },
    computed: {
      hh () {
        return this.$store.state.num
      }
    },
    mounted () {
      this.getGoodsInfo()
    },
    methods: {
      getGoodsInfo () {
        getGoodsInfo().then(res => {
          console.log('成功获取商品信息', res.data)
          this.count = res.data.count
        })
          .catch(err => {
            console.log('获取商品信息失败', err)
          })
      },
      add () {
        if (this.pickNum < this.count) {
          this.pickNum++
        }
      },
      substract () {
        if (this.pickNum < 1) {
          return
        }
        this.pickNum--
      },
      billHandler () {
        this.isExist = true
      },
      afterEnter () {
        this.isExist = false
        this.$bus.$emit('sendPickNum', Number(this.pickNum))
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrap {
    position: relative;
    width: 650px;
    padding-left: 100px;
  }
  .ball {
    position: absolute;
    right: 250px;
    top: 80px;
    width: 15px;
    height: 15px;
    background: red;
    border-radius: 50%;
  }
  .fade-enter-active {
    animation: bounce-in 1s;
  }
  .fade-leave {
    opacity: 0;
  }
  @keyframes bounce-in {
    0% {
      transform: translate3d(0,0,0)
    }
    50% {
      transform: translate3d(140px,-50px,0)
    }
    75% {
      transform: translate3d(160px,0,0)
    }
    100% {
      transform: translate3d(140px,300px,0)
    }
  }
</style>
