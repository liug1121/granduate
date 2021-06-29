<template>
    <div class="page">
        <div class="cardinfo">
            <div class="phone">号码：18656565657</div>
            <div class="iccid">iccid：00000000000000000000</div>
        </div>
        <div class="orderinfo">
            <table>
                <tr>
                    <td>时间：</td>
                    <td class="order-info">2021-06-03 11:03:21</td>
                </tr>
                <tr>
                    <td>套餐订购：</td>
                    <td class="order-info">750G/每月x1个月</td>
                </tr>
                <tr>
                    <td>金额：</td>
                    <td class="order-info">¥79.00</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<style scoped lang="stylus">
.page{
    background #f6f6f6
    height 100%
    width 100%
}
.cardinfo{
    height 8%
    background white
    margin 20px
    display flex
    padding 20px
    font-size 30px
    border-radius 15px;
}
.phone{
    flex 1
}
.iccid{
    flex 2
}
.orderinfo{
    height 15%
    background white
    margin 20px
    border-radius 15px;
    font-siz 30px
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
</style>
