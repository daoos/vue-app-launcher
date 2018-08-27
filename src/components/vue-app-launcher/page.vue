<template>
<transition-group
  tag="div"
  class="val-grid-container"
  v-if="((index - pageIndex) < 2 && (index - pageIndex) > -2 && isMovePage) || index === pageIndex"
  :key="index"
  name="val-grid"
  :style="{
    width: pageWidth - paddingLeft - paddingRight + 'px',
    height: pageHeight - paddingTop - paddingBottom + 'px',
    left: paddingLeft + index * pageWidth + 'px',
    top: paddingTop + 'px'
  }">
  <div class="val-grid"
    v-for="grid in page"
    :key="grid.id"
    :style="{
      width: 1 / colNumber * 100 + '%',
      height: 1 / rowNumber * 100 + '%'
    }">
    <div
      class="val-grid-content"
      :class="{'val-grid-ctn-hide': moveGrid === grid}"
      :style="{
        width: iconSize + 'px',
        height: iconSize + 26 + 'px',
      }"
      @mousedown="onMousedown(grid, $event)"
      @touchstart="onMousedown(grid, $event)">
      <div class="val-icon" :style="{ width: iconSize + 'px', height: iconSize + 'px'}">
        <img class="val-icon-img" :src="grid.icon" draggable="false">
      </div>
      <div class="val-name" :style="{ width: iconSize + 'px' }">{{grid.name}}</div>
    </div>
  </div>
</transition-group>
</template>

<script>
export default {
  name: 'val-page',
  props: {
    index: Number,
    page: Array,
    pageIndex: Number,
    iconSize: Number,
    colNumber: Number,
    rowNumber: Number,
    pageWidth: Number,
    pageHeight: Number,
    paddingTop: Number,
    paddingLeft: Number,
    paddingRight: Number,
    paddingBottom: Number,
    moveX: Number,
    moveY: Number,
    isMousedown: Boolean,
    isDragPage: Boolean,
    isMovePage: Boolean,
    isDragGrid: Boolean,
    isMoveGrid: Boolean,
    moveGrid: Object
  },
  methods: {
    onMousedown (grid, e) {
      e.preventDefault()
      if (this.isMovePage || this.isMoveGrid) return
      e = e.touches ? e.touches[0] : e
      setTimeout(() => {
        if (this.isMousedown && Math.abs(this.moveX) < 5 && Math.abs(this.moveY) < 5) {
          this.$emit('start-drag', grid)
        }
      }, 200)
    }
  }
}
</script>
