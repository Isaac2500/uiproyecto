<template>
  <Header />
  <div class="container"><br>
    <h1 class="display-3">Profesores</h1>
    
  </div>
  <div class="container mt-5">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nombre(s)</th>
          <th scope="col">Apellido Paterno</th>
          <th scope="col">Apellido Materno</th>
          <th scope="col">Numero de Empleado</th>
          <th scope="col">Horas Clase</th>
          
        </tr>
      </thead>
      <tbody>
        <tr v-for="profesor in listaProfesores" :key="profesor.id">
          <th scope="row">{{ profesor.id }}</th>
          <td>{{ profesor.nombres }}</td>
          <td>{{ profesor.apellidoPaterno }}</td>
          <td>{{ profesor.apellidoMaterno }}</td>
          <td>{{ profesor.numeroEmpleado }}</td>
          <td>{{ profesor.horasClase }}</td>
          <td><b-button variant="primary" v-on:click="edit(profesor.id)">Editar</b-button></td>
          <td><b-button variant="danger" v-on:click="eliminarRegistro(profesor.id)">Eliminar</b-button></td>
        </tr>
      </tbody>
    </table>
    <div class="container">
      <b-button variant="success" v-on:click="create()">Crear Nuevo</b-button>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
import { toast } from "vue3-toastify";
import  'vue3-toastify/dist/index.css';
import { API_BASE_URL } from "../config/api";

import axios from "axios";

const token = localStorage.getItem('token');

// Configura el token en la cabecera
const config = {
  headers: {
    Authorization: `authorization ${token}`
  }
};

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "DashboardProfesores",
  components: {
    Header,
    Footer,
  },
  data:function () {
    return {
        listaProfesores:null,
        pagina:1,
    }
  },
  mounted:function () {
    this.refreshToken();
    this.fetchProfesores();
   
  },
  methods:{
    create(){
      this.$router.push('/crear/profesores')
    },
    edit(id){
      this.$router.push('/editar/'+id+'/profesores')
    },
    eliminarRegistro(id){
      axios.delete( `${API_BASE_URL}/profesores/${id}`, config)
      .then(data => {
      
          this.fetchProfesores();
          console.log(data)
          this.$router.push('/dashboardprofesores');
          toast.success('El registro se ha eliminado', {
                  autoClose: 3000,
          });
      })
      .catch(error=>{
          
        /* if (error.response.status == 401) {
          
          this.$router.push('/');
          toast.error('Su sesion ha expirado. Por favor Inicie sesion de nuevo',{
            autoClose: 3000
          });
          
        } */
          console.log(error)
          /* toast.error(error.response.data.message,{
            autoClose: 3000
          }); */
      })
    },
    fetchProfesores(){
      axios.get( `${API_BASE_URL}/profesores`, config)
      .then(data => {
          this.listaProfesores = data.data
          console.log(data)
      })
      .catch(error=>{
          
        /* if (error.response.status == 401) {
          
          this.$router.push('/');
          toast.error('Su sesion ha expirado. Por favor Inicie sesion de nuevo',{
            autoClose: 3000
          });
          
        } */
          console.log(error)
          /* toast.error(error.response.data.message,{
            autoClose: 3000
          }); */
      })
    },
    refreshToken() {
      const newToken = localStorage.getItem('token');
      config.headers.Authorization = `authorization ${newToken}`;
    },

  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fetchProfesores();
    });
  },
}
</script>
<style></style>
