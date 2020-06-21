export default {
  fixedPage() {
    let scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    document.body.style.cssText +=
      "position:fixed;width:100%;top:-" + scrollTop + "px;";
  },
  unfixedPage() {
    let body = document.body;
    body.style.position = "";
    let top = body.style.top;
    document.body.scrollTop = document.documentElement.scrollTop = -parseInt(
      top
    );
    body.style.top = "";
  },
  getScrollPosition(scroller, itemsLen) {
    let viewHeight = scroller.scrollHeight;
    let heightPerItem = viewHeight / itemsLen;
    console.log('heightPerItem:' + heightPerItem)
    let scrollTop = scroller.scrollTop;
    let itemsNum = scrollTop / (heightPerItem);
    return Math.floor(itemsNum)
  },
  
};
