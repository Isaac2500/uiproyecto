<template>
  <div>
    <Header />

    <div class="container" v-if="tipoRegistro === 'profesores'">
      <br />
      <div class="text-center mt-5">
        <h1>Editar datos del Profesor</h1>
      </div>

      <div class="row">
        <div class="col-lg-7 mx-auto">
          <div class="card mt-2 mx-auto p-4 bg-light">
            <div class="card-body bg-light">
              <div class="container">
                <form id="contact-form" role="form">
                  <div class="controls">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label for="form_name">Nombre(s)</label>
                          <input
                            id="form_name"
                            type="text"
                            name="name"
                            class="form-control"
                            required="required"
                            data-error="Firstname is required."
                            v-model="registroProfesor.nombres"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_apellidoPaterno"
                            >Apellido Paterno</label
                          >
                          <input
                            id="form_apellidoPaterno"
                            type="text"
                            name="name"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroProfesor.apellidoPaterno"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_apellidoMaterno"
                            >Apellido Materno</label
                          >
                          <input
                            id="form_apellidoMaterno"
                            type="text"
                            name="surname"
                            class="form-control"
                            required="required"
                            data-error="Lastname is required."
                            v-model="registroProfesor.apellidoMaterno"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_numeroEmpleado"
                            >Numero de Empleado</label
                          >
                          <input
                            id="form_numeroEmpleado"
                            type="number"
                            name="email"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroProfesor.numeroEmpleado"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_horasClase">Horas Clase</label>
                          <input
                            id="form_horasClase"
                            type="number"
                            name="email"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroProfesor.horasClase"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="container">
                <br />
                <div class="col-md-12">
                  <input
                    id="send-profesor"
                    type="submit"
                    class="btn btn-primary btn-send pt-2 btn-block"
                    value="Enviar"
                    v-on:click="updateRegister(registroProfesor)"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- /.8 -->
        </div>
        <!-- /.row-->
      </div>
    </div>
    <div class="container" v-else-if="tipoRegistro === 'alumnos'">
      <br />
      <div class="text-center mt-5">
        <h1>Editar datos del Alumno</h1>
      </div>

      <div class="row">
        <div class="col-lg-7 mx-auto">
          <div class="card mt-2 mx-auto p-4 bg-light">
            <div class="card-body bg-light">
              <div class="container">
                <form id="contact-form" role="form">
                  <div class="controls">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label for="form_name">Nombre(s)</label>
                          <input
                            id="form_name"
                            type="text"
                            name="name"
                            class="form-control"
                            required="required"
                            data-error="Firstname is required."
                            v-model="registroAlumno.nombres"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_apellidoPaterno"
                            >Apellido Paterno</label
                          >
                          <input
                            id="form_apellidoPaterno"
                            type="text"
                            name="name"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroAlumno.apellidoPaterno"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_apellidoMaterno"
                            >Apellido Materno</label
                          >
                          <input
                            id="form_apellidoMaterno"
                            type="text"
                            name="surname"
                            class="form-control"
                            required="required"
                            data-error="Lastname is required."
                            v-model="registroAlumno.apellidoMaterno"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_matricula">Matricula</label>
                          <input
                            id="form_matricula"
                            type="text"
                            name="matricula"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroAlumno.matricula"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_promedio">Promedio</label>
                          <input
                            id="form_promedio"
                            type="number"
                            step=".01"
                            name="promedio"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroAlumno.promedio"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="container">
                <br />
                <div class="col-md-12">
                  <input
                    type="submit"
                    class="btn btn-primary btn-send pt-2 btn-block"
                    value="Enviar"
                    v-on:click="updateRegister(registroAlumno)"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- /.8 -->
        </div>
        <!-- /.row-->
      </div>
    </div>
    <div class="container" v-else-if="tipoRegistro === 'salones'">
      <br />
      <div class="text-center mt-5">
        <h1>Editar datos del salon</h1>
      </div>

      <div class="row">
        <div class="col-lg-7 mx-auto">
          <div class="card mt-2 mx-auto p-4 bg-light">
            <div class="card-body bg-light">
              <div class="container">
                <form id="contact-form" role="form">
                  <div class="controls">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label for="form_name">Nombre</label>
                          <input
                            id="form_name"
                            type="text"
                            name="name"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroSalon.nombre"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_tipo">Tipo</label>
                          <input
                            id="form_tipo"
                            type="text"
                            name="tipo"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroSalon.tipo"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_capacidad">Capacidad</label>
                          <input
                            id="form_capacidad"
                            type="number"
                            name="capacidad"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroSalon.capacidad"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_estado">Estado</label>
                          <input
                            id="form_estado"
                            type="text"
                            name="estado"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroSalon.estado"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_comodidades">Comodidades</label>
                          <textarea
                            id="form_comodidades"
                            name="comodidades"
                            class="form-control"
                            rows="4"
                            required="required"
                            data-error="Is required."
                            v-model="registroSalon.comodidades"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="container">
                <br />
                <div class="col-md-12">
                  <input
                    type="submit"
                    class="btn btn-primary btn-send pt-2 btn-block"
                    value="Enviar"
                    v-on:click="updateRegister(registroSalon)"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- /.8 -->
        </div>
        <!-- /.row-->
      </div>
    </div>
    <div class="container" v-else-if="tipoRegistro === 'asignaturas'">
      <br />
      <div class="text-center mt-5">
        <h1>Editar datos de la asignatura</h1>
      </div>

      <div class="row">
        <div class="col-lg-7 mx-auto">
          <div class="card mt-2 mx-auto p-4 bg-light">
            <div class="card-body bg-light">
              <div class="container">
                <form id="contact-form" role="form">
                  <div class="controls">
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label for="form_name">Nombre</label>
                          <input
                            id="form_name"
                            type="text"
                            name="name"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroAsignatura.nombre"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_codigo">Codigo</label>
                          <input
                            id="form_codigo"
                            type="text"
                            name="codigo"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroAsignatura.codigo"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_creditos">Creditos</label>
                          <input
                            id="form_creditos"
                            type="number"
                            name="creditos"
                            class="form-control"
                            required="required"
                            data-error="Lastname is required."
                            v-model="registroAsignatura.creditos"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_tipo">Tipo</label>
                          <input
                            id="form_tipo"
                            type="text"
                            name="tipo"
                            class="form-control"
                            required="required"
                            data-error="Is required."
                            v-model="registroAsignatura.tipo"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="form_descripcion">Descripcion</label>
                          <textarea
                            id="form_descripcion"
                            name="message"
                            class="form-control"
                            rows="4"
                            required="required"
                            data-error="Is required."
                            v-model="registroAsignatura.descripcion"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="container">
                <br />
                <div class="col-md-12">
                  <input
                    type="submit"
                    class="btn btn-primary btn-send pt-2 btn-block"
                    value="Enviar"
                    v-on:click="updateRegister(registroAsignatura)"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- /.8 -->
        </div>
        <!-- /.row-->
      </div>
    </div>

    <Footer />
  </div>
</template>
<script>
import Header from "../components/header.vue";
import Footer from "../components/footer.vue";
import { API_BASE_URL } from "../config/api";
import Axios from "axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const token = localStorage.getItem("token");

let config = {
  headers: {
    Authorization: `authorization ${token}`,
  },
};

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Editar",
  components: {
    Header,
    Footer,
  },
  data: function () {
    return {
      idRegistro: null,
      tipoRegistro: null,
      registro: {},
      registroProfesor: {
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        numeroEmpleado: "",
        horasClase: "",
      },
      registroAlumno: {
        nombres: "",
        apellidoPaterno: "",
        apellidoMaterno: "",
        matricula: "",
        promedio: "",
      },
      registroSalon: {
        nombre: "",
        tipo: "",
        capacidad: "",
        estado: "",
        comodidades: "",
      },
      registroAsignatura: {
        nombre: "",
        descripcion: "",
        creditos: "",
        tipo: "",
        codigo: "",
      },
    };
  },
  mounted: function () {
    this.refreshToken();

    const { path, params } = this.$route;

    this.idRegistro = params.id;

    if (path.includes("/profesores")) {
      this.tipoRegistro = "profesores";
      this.getRegister();
    } else if (path.includes("/alumnos")) {
      this.tipoRegistro = "alumnos";
      this.getRegister();
    } else if (path.includes("/asignaturas")) {
      this.tipoRegistro = "asignaturas";
      this.getRegister();
    } else if (path.includes("/salones")) {
      this.tipoRegistro = "salones";
      this.getRegister();
    }
  },
  methods: {
    getRegister() {
      Axios.get(
        `${API_BASE_URL}/${this.tipoRegistro}/${this.idRegistro}`,
        config
      )
        .then((data) => {
            console.log(data)
          if (this.tipoRegistro == "profesores") {
            this.asignarVariablesProfesor(data.data);
          }

          if (this.tipoRegistro == "alumnos") {
            this.asignarVariablesAlumno(data.data);
          }

          if (this.tipoRegistro == "salones") {
            this.asignarVariablesSalon(data.data);
          }

          if (this.tipoRegistro == "asignaturas") {
            this.asignarVariablesAsignatura(data.data);
          }
        })
        .catch((error) => {
          console.log(error);

          this.$router.push(`/dashboard${this.tipoRegistro}`);
          toast.error(error.response.data.message, {
            autoClose: 3000,
          });
        });
    },
    updateRegister(nuevoRegistro) {
      Axios.put(
        `${API_BASE_URL}/${this.tipoRegistro}/${this.idRegistro}`,
        nuevoRegistro,
        config
      )
        .then((data) => {
          console.log(data);
          this.$router.push(`/dashboard${this.tipoRegistro}`);
          toast.success("El registro se ha modificado", {
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.log(error);

          this.$router.push(`/dashboard${this.tipoRegistro}`);
          toast.error(error.response.data.message, {
            autoClose: 3000,
          });
        });
    },
    refreshToken() {
      const newToken = localStorage.getItem("token");
      config.headers.Authorization = `Bearer ${newToken}`;
    },
    asignarVariablesProfesor(data) {
      this.registroProfesor.nombres = data.nombres;
      this.registroProfesor.apellidoPaterno = data.apellidoPaterno;
      this.registroProfesor.apellidoMaterno = data.apellidoMaterno;
      this.registroProfesor.numeroEmpleado = data.numeroEmpleado;
      this.registroProfesor.horasClase = data.horasClase;
      console.log(data.id);
    },
    asignarVariablesAlumno(data) {
      this.registroAlumno.nombres = data.nombres;
      this.registroAlumno.apellidoPaterno = data.apellidoPaterno;
      this.registroAlumno.apellidoMaterno = data.apellidoMaterno;
      this.registroAlumno.matricula = data.matricula;
      this.registroAlumno.promedio = data.promedio;
      console.log(data.id);
    },
    asignarVariablesSalon(data) {
      this.registroSalon.nombre = data.nombre;
      this.registroSalon.tipo = data.tipo;
      this.registroSalon.capacidad = data.capacidad;
      this.registroSalon.estado = data.estado;
      this.registroSalon.comodidades = data.comodidades;
      console.log(data.id);
    },
    asignarVariablesAsignatura(data) {
      this.registroAsignatura.nombre = data.nombre;
      this.registroAsignatura.descripcion = data.descripcion;
      this.registroAsignatura.creditos = data.creditos;
      this.registroAsignatura.tipo = data.tipo;
      this.registroAsignatura.codigo = data.codigo;
      console.log(data.id);
    },
  },
};
</script>
