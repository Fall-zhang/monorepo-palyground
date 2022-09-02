<template>
  <div>
    <div class="card-container" :class="menuHide ? 'menu-hide' : ''">
      <slot>
        <div style="height:200px;"></div>
      </slot>
    </div>
    <div class="card-bar" @mouseover="mouseOver = true" @mouseleave="mouseOver = false" @click="onHideMenu">
      {{ menuHide ? '展示菜单' : '隐藏菜单' }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardCollapse',
  components: {

  },
  emit: ['hide'],
  data() {
    return {
      menuHide: false,
      mouseOver: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    onHideMenu() {
      this.menuHide = !this.menuHide
      this.$emit('hide', this.menuHide)
    }
  }
}
</script>

<style lang="less" scoped>
.card-bar {
  border-bottom: 1px solid #eaeefb;
  height: 44px;
  line-height: 42px;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: center;
  margin-top: -1px;
  color: #5f5f5f;
  cursor: pointer;
  position: relative;
  user-select: none;

  &:hover {
    color: #409eff;
    transition: 0.3s;
    background-color: #f9fafc;
  }
}

.card-container {
  height: 200px;
  transition: .4s;

  &.menu-hide {
    transition: .4s;
    height: 0px;
    overflow: hidden;
  }
}
</style>
