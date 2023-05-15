<template>
    <Header />
  <div class="container"><br>
    <h1 class="display-3">Alumnos</h1>
  </div>
  <div class="container mt-5">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nombre(s)</th>
          <th scope="col">Apellido Paterno</th>
          <th scope="col">Apellido Materno</th>
          <th scope="col">Matricula</th>
          <th scope="col">Promedio</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="alumno in listaAlumnos" :key="alumno.id" >
          <th scope="row">{{ alumno.id }}</th>
          <td>{{ alumno.nombres }}</td>
          <td>{{ alumno.apellidoPaterno }}</td>
          <td>{{ alumno.apellidoMaterno }}</td>
          <td>{{ alumno.matricula }}</td>
          <td>{{ alumno.promedio }}</td>
          <td><b-button variant="primary" v-on:click="edit(alumno.id)">Editar</b-button></td>
          <td><b-button variant="danger" v-on:click="eliminarRegistro(alumno.id)">Eliminar</b-button></td>
        </tr>
      </tbody>
    </table>
    <div class="container">
        <b-button variant="success" v-on:click="create">Crear Nuevo</b-button>
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
    name:"DasboardAlumnos",
    components:{
        Header,
        Footer
    },
    data:function () {
        return {
            listaAlumnos:null,
            pagina:1,
        }
    },
    mounted:function () {
        this.refreshToken();
        this.fetchAlumnos();
        
  },
  methods:{
    create(){
        this.$router.push('/crear/alumnos')
    },
    edit(id){
      this.$router.push('/editar/'+id+'/alumnos')
    },
    eliminarRegistro(id){
        axios.delete( `${API_BASE_URL}/alumnos/${id}`, config)
        .then(data => {
            
            this.fetchAlumnos();
            console.log(data)
            this.$router.push('/dashboardalumnos');
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
    fetchAlumnos(){
        axios.get( `${API_BASE_URL}/alumnos`, config)
        .then(data => {
            this.listaAlumnos = data.data
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
      vm.fetchAlumnos();
    });
  },
}
</script>