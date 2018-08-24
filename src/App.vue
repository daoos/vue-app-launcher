<template>
  <div id="app">
    <vue-app-launcher
      :data="apps"
      :icon-size="config.iconSize"
      :padding-left="config.padding"
      :padding-right="config.padding"
      :padding-top="config.padding"
      :padding-bottom="config.padding"
      :allow-nesting="true"
      :density="config.density"
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
        iconSize: 80,
        density: 1.4,
        padding: 20
      }
    }
  }
}
</script>

<style lang="less">
html, body, #app{margin: 0;height: 100%;}
#app{background: rgb(21, 92, 173);}
</style>
