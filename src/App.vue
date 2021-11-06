<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Grupo 4</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" @click="goToRates">Rates <span class="sr-only"></span></a>
        </li>
        <li class="nav-item active">
          <a class="nav-link"  @click="goToTechnologies">Tecnologías <span class="sr-only"></span></a>
        </li>

        <li class="nav-item">
          <a class="nav-link">Alumnos</a>
        </li>
      </ul>
    </div>
  </nav>
  <router-view />
</template>

<script>
export default {
  data(){
    return{

    };
  },
  methods:{
    goToTechnologies() {
      this.$router.push("/Technologies");
    },
    goToRates() {
      this.$router.push("/Home");
    }
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
