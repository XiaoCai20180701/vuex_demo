
<template>
  <div class="cart-menu">
    <Row>
      <i-col span="6">
          <Badge :count="pickNum" overflow-count="50">购物车</Badge>
      </i-col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        pickNum: 0
      }
    },
    created () {
      this.$bus.$on('sendPickNum', (data) => {
        this.pickNum += data
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cart-menu {
    position: fixed;
    bottom: 0;
    width: 650px;
    padding-left: 100px;
    height: 100px;
  }
</style>
