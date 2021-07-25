<script>
export default {
  name: "posionLogin",
  components: {},
  data() {
    return {
      loginInfo:{}
    };
  },
  methods: {
    login: function() {
      let loginInfo = this.loginInfo
      // console.log(JSON.stringify(loginInfo))
      this.$store.dispatch("positionUser/login", loginInfo).then(resp =>{
        if(resp ==1){
          this.$router.push({ name: "Position" });
        }else{
          alert('用户名或者密码不正确')
        }
      });
      
    }
  }
};
// this.$store.dispatch("buyRecords/getBuyRecords", queryParams);
</script>
<template>
  <div class="container">
    <div class="head">
      <img class="head-img" src="../../assets/logo-chinauni-login.png" />
      <div class="head-img-yanfei">
        <img
          class="head-img-yanfei-image"
          src="../../assets/logo-yanfei-login.png"
        />
      </div>
    </div>
    <div class="body">
      <div class="login">
        <div class="login-title">
          雁飞·智连定位平台
        </div>
        <table>
          <tr>
            <td>用户名：</td>
            <td><input v-model="loginInfo.userName"></td>
          </tr>
          <tr>
            <td>密码：</td>
            <td><input v-model="loginInfo.pwd"></td>
          </tr>
        </table>

        <div class="login-btn" @click="login">登录</div>
      </div>
    </div>

    <div class="footer">
      <div class="footer-notice">网站首页 关于我们 联系方式</div>
      <div class="footer-notice">
        苏ICP备18015610号-1 copyright: © 中国联通 2021.
      </div>
    </div>
  </div>
</template>
<style scoped lang="stylus">
.container{
    width 100%
    height 100%
}
.head{
    display flex
    height 10%
    background #1e1873
}
.head-img{
    flex 1
}
.head-img-yanfei{
    flex 10
    padding-left 73%
}
.head-img-yanfei-image{
    width 70px
    width 70px
}
.body{
    height 80%
    background url('../../assets/content-big.jpeg')
    padding-left 70%
    padding-top 5%
}
.footer{
    height 10%
    background #1e1873
    color white
    padding-top 20px
}
.footer-notice{
    width 100%
    text-align center
}
.login{
    width 500px
    height 500px
    border 1px solid #ddd
    border-radius 15px;
    color white
    font-size 25px
}
.login-title{
    margin-top 10%
    width 100%
    text-align center
}
.login-btn{
    width 80%
    margin-left 10%
    border 1px solid #ddd
    border-radius 5px;
    text-align center
}
table{
    height 120px
    margin 40px
    margin-top 50px
}
tr{
    height 15%
}
input{
    height 30px
    width 100%
    border 1px solid #ddd
    border-radius 5px;
}
</style>
