<template>
    <div class="page">
        <div class="useage">
            <table>
                <tr>
                    <td>设备名称：</td>
                    <td class="order-info">14909098980</td>
                </tr>
                <tr>
                    <td>MSISDN：</td>
                    <td class="order-info">14909098980</td>
                </tr>
                <tr>
                    <td>ICCID：</td>
                    <td class="order-info">88888888888888888888</td>
                </tr>
                <tr>
                    <td>当前套餐：</td>
                    <td class="order-info">3G/每月x1个月</td>
                </tr>
                <tr>
                    <td>当月剩余：</td>
                    <td class="order-info">3.00G</td>
                </tr>
            </table>
            <div class="buttons">
                <div class="button-unbind">解绑</div>
                <div class="button-detail">详情</div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="stylus">
.page{
    background #f6f6f6
    height 100%
    width 100%
}
.useage{
    height 33%
    border-radius 15px;
    background white
    margin 20px
}
table{
    margin 30px
    width 90%
}
tr{
    height 50px
}
.order-info{
    text-align right
}
.buttons{
    display flex
    text-align center
    color white
}
.button-unbind{
    flex 1
    background #e9975a
    height 60px
    margin 20px
    line-height 60px
}
.button-detail{
    flex 1
    background #5388df
    height 60px
    margin 20px
    line-height 60px
}
</style>
