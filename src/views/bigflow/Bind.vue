<template>
    <div class="page">
        <div class="head"></div>
        <div class="iccid">
            <table class="table">
                <tr>
                    <td class="col-iccid-input">
                        <input class="iccid-input">
                    </td>
                    <td class="col-iccid-scan">
                        <div class="scan"></div>
                    </td>
                </tr>
            </table>
        </div>
        <div class="button">确定</div>
        <div class="note"></div>
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
    width 90%
    height 80px
    display: inline-block
    margin-top:20px
    border-radius 15px;
    background white
}
.scan{
    width 80px
    height 80px
    display: inline-block
    border-radius 15px;
    border 1px solid #ddd
    margin-top:20px
}
.button{
    background green
    width 80%
    height:6%
    border-radius 15px
    margin-left 10%
    color white
    font-size 45px
    align-items center
    display  -webkit-flex
    justify-content center
    display -webkit-flex
}
.note{
    margin-top 20px
    background: gray
    height:20%
}
</style>