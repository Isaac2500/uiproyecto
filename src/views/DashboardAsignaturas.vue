<template>
    <Header />
  <div class="container"><br>
    <h1 class="display-3">Asignaturas</h1>
  </div>
  <div class="container mt-5">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Descripcion</th>
          <th scope="col">Creditos</th>
          <th scope="col">Tipo</th>
          <th scope="col">Codigo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="asignatura in listaAsignaturas" :key="asignatura.id">
          <th scope="row">{{ asignatura.id }}</th>
          <td>{{ asignatura.nombre }}</td>
          <td>{{ asignatura.descripcion }}</td>
          <td>{{ asignatura.creditos }}</td>
          <td>{{ asignatura.tipo }}</td>
          <td>{{ asignatura.codigo }}</td>
          <td><b-button variant="primary" v-on:click="edit(asignatura.id)">Editar</b-button></td>
          <td><b-button variant="danger" v-on:click="eliminarRegistro(asignatura.id)">Eliminar</b-button></td>
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
    name:"DasboardAsignaturas",
    components:{
        Header,
        Footer
    },
    data:function () {
        return {
            listaAsignaturas:null,
            pagina:1,
        }
    },
    mounted:function () {
        this.refreshToken();
        this.fetchAsignaturas();
  },
  methods:{
    create(){
        this.$router.push('/crear/asignaturas')  
    },
    edit(id){
      this.$router.push('/editar/'+id+'/asignaturas')
    },
    eliminarRegistro(id){
        axios.delete( `${API_BASE_URL}/asignaturas/${id}`, config)
        .then(data => {
        
            this.fetchAsignaturas();
            console.log(data)
            this.$router.push('/dashboardasignaturas');
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
    fetchAsignaturas(){
        axios.get( `${API_BASE_URL}/asignaturas`, config)
        .then(data => {
            this.listaAsignaturas = data.data
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
      vm.fetchAsignaturas();
    });
  },
}
</script>