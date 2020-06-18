<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  list-style: none;
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon {
 width: 1em; height: 1em;
 vertical-align: -0.15em;
 fill: currentColor;
 overflow: hidden;
}
</style>
