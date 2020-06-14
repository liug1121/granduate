<template>
  <table>
    <tr>
      <td>
        <div class="info">
          <table>
            <tr>
              <td><img class="img-ranking" src="../../assets/zycspm.png" /></td>
              <td class="ranking-text">专业初试排名：{{rank}}</td>
            </tr>
          </table>
        </div>
      </td>
      <td class="info-split"></td>
      <td>
        <div class="info">
          <table>
            <tr>
              <td><img class="img-ranking" src="../../assets/zyzpm.png" /></td>
              <td class="ranking-text">专业总排名：{{allrank}}</td>
            </tr>
          </table>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Ranking",
  props:['rank', 'allrank']
};
</script>

<style scoped lang="stylus">
.info
    width 294px;
    height 41px;
    background rgba(188,214,253,1);
    border-radius 21px;

.info-split
    width 42px;

.img-ranking
    padding-left 5px;
    padding-top 8px;
    width 25px;
    height 24px;

.ranking-text
    font-size 22px;
    color rgba(51,143,255,1);
    padding-left 5px;
</style>
