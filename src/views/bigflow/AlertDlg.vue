
<script>
export default {
  name: "AlertDlg",
  props: ["msg"],
  methods: {
    close() {
      this.$emit("close");
    }
  }
};
</script>
<template>
    <div>
        <div class="container">
            <div class="dlg">
                <div class="dlg-title">提示消息</div>
                <div class="dlg-msg">{{msg}}</div>
                <div class="dlg-btns">
                    <div class="dlg-btn" @click="close">取消</div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="stylus">
.container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display:flex;
    justify-content:center;
    text-align:center;
  }
.dlg{
    margin-top 300px
    width 80%
    height 20%
    background white
    border-radius 15px;
}
.dlg-title{
    height 20%
    background gray
    font-size 25px
    color white
    text-align left
    padding-left 20px
    padding-top 5px
}
.dlg-btns{
    display flex
    width 80%
    margin-left 10%
    margin-top 10%
}
.dlg-btn{
    flex 1
    width 30%
    height 50px
    line-height 50px
    margin 5px
    border 1px solid #ddd
    border-radius 15px;
}
.dlg-btn-ok{
    flex 1
    width 30%
    height 50px
    line-height 50px
    margin 20px
    border 1px solid #ddd
    border-radius 15px;
    background #e9975a
}
.dlg-msg{
    font-size 30px
    height 10%
    margin-top 30px
}
</style>