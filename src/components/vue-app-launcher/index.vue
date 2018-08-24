<template>
<div class="vue-app-launcher">
  <div class="val-content"
    @mousedown="onContentMousedown"
    @mousemove="onContentMousemove"
    @mouseup="onContentMouseup"
    @touchstart="onContentMousedown"
    @touchmove="onContentMousemove"
    @touchend="onContentMouseup"
    @mousewheel="onContentMousewheel">
    <div class="val-page"
      v-for="(page, j) in pages"
      v-show="Math.abs(j - pageIndex) < 2"
      :key="j"
      :class="{ 'no-transition': isDragPage }"
      :style="{
        transform: 'translate3d(' + ((j - pageIndex) * pageWidth + movePageX) + 'px, 0, 0)'
      }"
      @transitionend="onPageMoveEnd"
      @webkitTransitionEnd="onPageMoveEnd">
      <div class="val-grid"
        v-for="(grid, i) in pages[j]"
        v-if="Math.abs(j - pageIndex) < 2"
        :key="i.id"
        :style="{
          width: gridWidth + 'px',
          height: gridHeight + 'px',
          left: (i % colNumber * gridWidth) + paddingLeft + 'px',
          top: (~~(i / colNumber) * gridHeight) + paddingTop + 'px'
        }"
        @mousedown="onGridMousedown(grid, $event)"
        @mouseup="onGridMouseup(grid, $event)">
        <div
          class="val-grid-content"
          :style="{
            width: iconSize + 'px',
            height: iconSize * 1.12 + 14 + 'px',
          }">
          <div class="val-icon" :style="{ width: iconSize + 'px', height: iconSize + 'px', borderRadius: iconSize * 0.12 + 'px' }">
            <img class="val-icon-img" :src="'/img/' + grid.icon">
          </div>
          <div class="val-name" :style="{ width: iconSize + 'px' }">{{grid.name}}</div>
        </div>
      </div>
    </div>
  </div>
  <div class="val-nav">
    <div class="val-nav-item"
      v-for="(item, i) in pages.length"
      :key="i"
      :class="{'val-nav-item-on': i === pageIndex}"
    ></div>
  </div>
  <!-- <div v-if="allowNesting" style="position: absolute;width: 60%;height: 60%;background: #666;left: 20%;top: 20%;">
    <vue-app-launcher
      :data="data"
      :icon-size="iconSize"
    ></vue-app-launcher>
  </div> -->
</div>
</template>

<script>
import chunk from './utils/chunk'
import throttle from './utils/throttle'

export default {
  name: 'vue-app-launcher',
  props: {
    data: { type: Array, default: () => [] },
    maxColumn: Number,
    maxRow: Number,
    iconSize: { type: Number, default: 100 },
    density: { type: Number, default: 1.5 },
    paddingLeft: { type: Number, default: 0 },
    paddingRight: { type: Number, default: 0 },
    paddingTop: { type: Number, default: 0 },
    paddingBottom: { type: Number, default: 0 },
    allowNesting: Boolean
  },
  data () {
    return {
      pageWidth: 0,
      pageHeight: 0,
      moveGrid: null,
      pageIndex: 0,
      pages: [],
      // mouse
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
      isMousedown: false,
      isDragPage: false,
      isMovePage: false,
      isDragGrid: false,
      isMoveGrid: false
    }
  },
  watch: {
    gridCount (count) {
      this.pages = chunk(this.data, count)
    }
  },
  computed: {
    rowNumber () {
      let { pageHeight, paddingTop, paddingBottom, iconSize, maxRow, density } = this
      let rows = (pageHeight - paddingTop - paddingBottom) / (iconSize * density + 26)
      if (maxRow && rows > maxRow) return maxRow
      return Math.round(rows)
    },
    colNumber () {
      let { pageWidth, paddingLeft, paddingRight, iconSize, maxColumn, density } = this
      let cols = (pageWidth - paddingLeft - paddingRight) / (iconSize * density)
      if (maxColumn && cols > maxColumn) return maxColumn
      return Math.round(cols)
    },
    gridWidth () {
      let { pageWidth, paddingLeft, paddingRight, colNumber } = this
      return (pageWidth - paddingLeft - paddingRight) / colNumber
    },
    gridHeight () {
      let { pageHeight, paddingTop, paddingBottom, rowNumber } = this
      return (pageHeight - paddingTop - paddingBottom) / rowNumber
    },
    gridCount () {
      return this.rowNumber * this.colNumber
    },
    movePageX () {
      let { moveX, isDragPage } = this
      if (!isDragPage) return 0
      if (moveX > 0 && this.pageIndex === 0 || moveX < 0 && this.pageIndex === this.pages.length - 1) {
        return moveX / 3
      }
      return moveX
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    // bind events
    onResize () {
      this.pageWidth = this.$el.clientWidth
      this.pageHeight = this.$el.clientHeight
      // console.log(this.rowNumber)
    },
    onGridMousedown (grid, e) {
      // console.log(grid, e)
    },
    onGridMouseup (grid, e) {},
    onContentMousedown (e) {
      e = e.touches ? e.touches[0] : e
      this.startX = e.clientX
      this.isMousedown = true
    },
    onContentMousemove (e) {
      e.preventDefault()
      e = e.touches ? e.touches[0] : e
      if (!this.isMousedown) return
      this.moveX = e.clientX - this.startX
      if (this.isDragPage || Math.abs(this.moveX) > 10) {
        this.isDragPage = true
        this.isMovePage = true
      }
    },
    onContentMouseup () {
      this.isMousedown = this.isDragPage = false
      if (Math.abs(this.moveX) > this.pageWidth / 4) {
        if (this.moveX > 0) this.prevPage()
        else this.nextPage()
      }
      this.moveX = this.startX = 0
    },
    onContentMousewheel (e) {
      e.preventDefault()
      if (this.isMovePage) return
      if (e.deltaY > 0) this.nextPage()
      if (e.deltaY < 0) this.prevPage()
    },
    onPageMoveEnd (e) {
      this.isMovePage = false
    },
    prevPage () {
      if (this.pageIndex === 0) return
      this.isMovePage = true
      this.pageIndex -= 1
    },
    nextPage () {
      if (this.pageIndex === this.pages.length - 1) return
      this.isMovePage = true
      this.pageIndex += 1
    },
    moveItem () {}
  }
}
</script>

<style lang="less">
.vue-app-launcher{
  position: relative;width: 100%;height: 100%;box-sizing: border-box;
  .val-content, .val-page{position: absolute;width: 100%;height: 100%;overflow: hidden;}
  .val-page{transition: transform .4s cubic-bezier(0.1, 0.4, 0.53, 0.93);}
  .val-grid{position: absolute;display: flex;box-sizing: border-box;
    align-items: center;justify-content: center;color: #fff;
    transition: left .2s, top .2s;
  }
  // .val-icon{background: rgba(255, 255, 255, .2);}
  .val-icon-img{width: 100%;}
  .val-name{text-align: center;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;font-size: 14px;height: 26px;line-height: 1em;padding: 6px 0;box-sizing: border-box;}
  .no-transition{transition: none;}
  .val-nav{display: flex;align-items: center;justify-content: center;position: absolute;width: 100%;height: 10px;left: 0;bottom: 50px;}
  .val-nav-item{width: 8px;height: 8px;background: rgba(255, 255, 255, .5);border-radius: 50%;margin: 0 10px;}
  .val-nav-item-on{background: #fff;}
}
</style>
