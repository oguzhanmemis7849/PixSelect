<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col cols="8"></v-col>
        <v-col cols="2">
          <router-link class="textDecoration" to="/live" active-class="active">Live</router-link>
        </v-col>
        <v-col cols="2">
          <router-link class="textDecoration" to="/photos" active-class="active">Photos</router-link>
        </v-col>
      </v-row>
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.active {
  color: red !important;
}
.textDecoration{
  text-decoration: none;
}
</style>
