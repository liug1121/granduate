<template>
  <div>
    <li>
      <div :class="{ bold: isFolder }" @click="$emit('clickItem', item)">
        {{ item.name }}
        <span v-if="isFolder">[{{ isOpen ? "-" : "+" }}]</span>
      </div>
      <ul v-show="isOpen" v-if="isFolder">
        <Tree
          class="item"
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          @clickItem="clickItem"
        ></Tree>
        <!-- <li class="add" @click="$emit('add-item', item)">+</li> -->
      </ul>
    </li>
  </div>
</template>
<script>
export default {
  name: "Tree",
  props: {
    item: Object
  },
  data: function() {
    return {
      isOpen: true
    };
  },
  computed: {
    isFolder: function() {
      return this.item.children && this.item.children.length;
    }
  },
  methods: {
    clickItem: function(item) {
      item.clickFun(item);
    },
    toggle: function() {
      if (this.isFolder) {
        this.isOpen = !this.isOpen;
        console.log("toggle");
      }
    }
    // ,
    // makeFolder: function() {
    //   if (!this.isFolder) {
    //     this.$emit("make-folder", this.item);
    //     this.isOpen = true;
    //   }
    // }
  }
};
</script>
<style scoped>
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>
