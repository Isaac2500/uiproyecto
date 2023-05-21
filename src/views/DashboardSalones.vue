<template>
    <Header />
  <div class="container"><br>
    <h1 class="display-3">Salones</h1>
  </div>
  <div class="container mt-5">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Nombre</th>
          <th scope="col">Tipo</th>
          <th scope="col">Capacidad</th>
          <th scope="col">Estado</th>
          <th scope="col">Comodidades</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="salon in listaSalones" :key="salon.id" >
          <th scope="row">{{ salon.id }}</th>
          <td>{{ salon.nombre }}</td>
          <td>{{ salon.tipo }}</td>
          <td>{{ salon.capacidad }}</td>
          <td>{{ salon.estado }}</td>
          <td>{{ salon.comodidades }}</td>
          <td><b-button variant="primary" v-on:click="edit(salon.id)">Editar</b-button></td>
          <td><b-button variant="danger" v-on:click="eliminarRegistro(salon.id)">Eliminar</b-button></td>
        </tr>
      </tbody>
    </table>
    <div class="container">
        <b-button id="create-salones" variant="success" v-on:click="create()">Crear Nuevo</b-button>

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
    name:"DasboardSalones",
    components:{
        Header,
        Footer
    },
    data:function () {
        return {
            listaSalones:null,
            pagina:1,
        }
    },
    mounted:function () {
        this.refreshToken()
        this.fetchSalones()
  },
  methods:{
    create(){
        this.$router.push('/crear/salones')  
    },
    edit(id){
      this.$router.push('/editar/'+id+'/salones')
    },
    eliminarRegistro(id){
    axios.delete( `${API_BASE_URL}/salones/${id}`, config)
    .then(data => {
    
        this.fetchSalones();
        console.log(data)
        this.$router.push('/dashboardsalones');
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
    fetchSalones() {
        axios.get( `${API_BASE_URL}/salones`, config)
        .then(data => {
            this.listaSalones = data.data
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
      vm.fetchSalones();
    });
  },
}
</script>