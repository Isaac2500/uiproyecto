<template>

    <section class="vh-100 gradient-custom">
      <div class="container py-5 h-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-5">
            <div class="card bg-dark text-white" style="border-radius: 1rem;">
              <div class="card-body p-5 text-center">
    
                <div class="mb-md-5 mt-md-4 pb-5">
    
                  <h2 class="fw-bold mb-2 text-uppercase">Registro</h2>
                  <p class="text-white-50 mb-5">!Por favor, ingresa tus datos!</p>
    
                  <div class="form-outline form-white mb-4">
                    <input type="text" id="typeUsernameX" class="form-control form-control-lg" v-model="username"/>
                    <label class="form-label" for="typeEmailX">Nombre de Usuario</label>
                  </div>

                  <div class="form-outline form-white mb-4">
                    <input type="email" id="typeEmailX" class="form-control form-control-lg" v-model="email"/>
                    <label class="form-label" for="typeEmailX">Email</label>
                  </div>
    
                  <div class="form-outline form-white mb-4">
                    <input type="password" id="typePasswordX" class="form-control form-control-lg" v-model="password"/>
                    <label class="form-label" for="typePasswordX">Contraseña</label>
                  </div>
    
                  <button class="btn btn-outline-light btn-lg px-5" type="submit" v-on:click="Register">Enviar</button>
    
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
      name: 'Register',
      data: function () {
        return{
          username:"",
          email: "",
          password: "",
          error: false,
          error_msg: ""
        }
      },
      methods:{
        Register(){
          let payload = {
            "username":this.username,
            "email": this.email,
            "password": this.password
          }
    
          Axios.post(
    
              `${API_BASE_URL}/signUp`, payload
          
            ).then(data => {
          
                console.log(data)
              this.$router.push('/');
                
              toast.success('Se han guardado tus datos.',{
              autoClose: 3000
            });
             
          }).catch(error =>{
          
            
            toast.error(error.response.data.message,{
              autoClose: 3000
            });
          
          })
        }
      }
      
    }
    </script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style scoped>
    h3 {
      margin: 40px 0 0;
    }
    ul {
      list-style-type: none;
      padding: 0;
    }
    li {
      display: inline-block;
      margin: 0 10px;
    }
    a {
      color: #42b983;
    }
    </style>
    