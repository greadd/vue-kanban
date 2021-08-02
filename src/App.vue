<template>
  <div id="app">
    <TheHeader :user="user" />
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import TheHeader from './components/TheHeader.vue'

export default {
  name: 'App',
  components: { TheHeader },
  computed: {
    ...mapGetters(['user']),
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Mukta:wght@400;500;600;700&display=swap');
* {
  box-sizing: border-box;
}
html {
  font-family: 'Mukta', sans-serif;
}
body {
  margin: 0;
}
</style>
