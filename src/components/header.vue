<template>
  <div class="mt-0 fixed-top">
    <header>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">MENU</b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <router-link to="/dashboardprofesores"><b-button variant="link">Profesores</b-button> </router-link>
            <router-link to="/dashboardalumnos"><b-button variant="link">Alumnos</b-button> </router-link>
            <router-link to="/dashboardsalones"><b-button variant="link">Salones</b-button> </router-link>
            <router-link to="/dashboardasignaturas"><b-button variant="link">Asignaturas</b-button> </router-link>
          </b-navbar-nav>

          
        </b-collapse>
        <b-navbar-nav class="my-2 my-lg-0">
          <b-button pill variant="danger" v-on:click="logout">Logout</b-button>
        </b-navbar-nav>
      </b-navbar>
    </header>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Header",
  methods:{
    logout(){
      localStorage.removeItem('token');
      this.$router.push('/')
    }
  }
};
</script>
