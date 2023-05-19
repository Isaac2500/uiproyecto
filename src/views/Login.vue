<template>

<section class="vh-100 gradient-custom">
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card bg-dark text-white" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <div class="mb-md-5 mt-md-4 pb-5">

              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">!Por favor ingresa tu email y contraseña!</p>

              <div class="form-outline form-white mb-4">
                <input type="email" id="typeEmailX" class="form-control form-control-lg" v-model="email"/>
                <label class="form-label" for="typeEmailX">Email</label>
              </div>

              <div class="form-outline form-white mb-4">
                <input type="password" id="typePasswordX" class="form-control form-control-lg" v-model="password"/>
                <label class="form-label" for="typePasswordX">Contraseña</label>
              </div>

              
              <button class="btn btn-outline-light btn-lg px-5" type="submit" v-on:click.prevent="login">Ingresar</button>

              

            </div>

            <div>
              <p class="mb-0">No tiene una cuenta? <a href="#!" class="text-white-50 fw-bold"> <router-link to="/register"> Registrate</router-link></a>
              </p> 
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import  Axios  from 'axios';
import { toast } from "vue3-toastify";
import  'vue3-toastify/dist/index.css';

import { API_BASE_URL } from "../config/api";


export default {
  
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Login',
  data: function () {
    return{
      email: "",
      password: "",
      error: false,
      error_msg: ""
    }
  },
  
  methods:{
    login(){
      let payload = {
        "email": this.email,
        "password": this.password
      }

      Axios.post(

          `${API_BASE_URL}/signIn`, payload
      
        ).then(data => {
      
          localStorage.token = data.data.token;
      
          this.$router.push('dashboardProfesores');
      
         
      }).catch(error =>{
      
        
        toast.error(error.response.data.message,{
          autoClose: 3000
        });
      
      })
    }
  }
  
}
</script>


