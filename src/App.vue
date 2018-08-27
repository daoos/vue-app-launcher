<template>
  <div id="app">
    <vue-app-launcher
      :data="apps"
      :icon-size="config.iconSize"
      :padding-left="config.padding"
      :padding-right="config.padding"
      :padding-top="config.padding"
      :padding-bottom="config.padding"
      :density="config.density"
      show-pagination
      allow-nesting
    ></vue-app-launcher>
  </div>
</template>

<script>
import VueAppLauncher from './components/vue-app-launcher/'
import apps from './apps'

export default {
  name: 'app',
  components: { VueAppLauncher },
  data () {
    return {
      apps,
      config: {
        iconSize: 100,
        density: 1.5,
        padding: 10
      }
    }
  }
}
</script>

<style lang="less">
html, body, #app{margin: 0;height: 100%;}
#app{
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  // margin: 30px;
  background: url('https://cdn.suwalls.com/wallpapers/abstract/blue-blur-29047-1920x1080.jpg') center / cover;}
// .vue-app-launcher{}
</style>
