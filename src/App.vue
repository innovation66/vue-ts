<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from 'components/HelloWorld.vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="less"></style>
