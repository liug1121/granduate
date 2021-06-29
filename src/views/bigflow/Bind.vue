<template>
    <div class="page">
        <div class="head">
            <img class="head-img" src="../../assets/bigflow-head.jpeg" />
        </div>
        <div class="iccid">
            <table class="table">
                <tr>
                    <td class="col-iccid-input">
                        <input class="iccid-input">
                    </td>
                    <td class="col-iccid-scan">
                        <img class="scan" src="../../assets/scan.jpeg" />
                    </td>
                </tr>
            </table>
        </div>
        <div class="button">确定</div>
        <div class="note">
            温馨提示：请根据相应提示完成开卡激活流程
        </div>
    </div>
</template>

<style scoped lang="stylus">
.page{
    height 100%
}
.head{
    background gray
    height 30%
}
.head-img{
    height 100%
    width 100%
}
.iccid{
    background white
    height 10%
    width 90%
    margin-left 5%
    margin-top 10%
    margin-bottom 10%
    border-radius 15px;
    box-shadow  #666 0px 0px 10px;
}
.table{
    width 100%
}
.col-iccid-input{
    width:70%
    text-align center
}
.col-iccid-scan{
    width:20%
    text-align center
}
.iccid-input{
    width 95%
    height 80px
    display: inline-block
    margin-top:20px
    margin-left 20px
    border-radius 15px;
    background #dadada
    border 1px solid #dadada
}
.scan{
    width 60px
    height 60px
    margin-top 25px

}
.button{
    background #4388de
    width 90%
    height:6%
    border-radius 15px
    margin-left 5%
    color white
    font-size 45px
    align-items center
    display  -webkit-flex
    justify-content center
    display -webkit-flex
}
.note{
    margin 35px
    background: white
    height:20%
}
</style>