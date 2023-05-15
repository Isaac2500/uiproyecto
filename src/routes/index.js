import { createRouter, createWebHistory } from 'vue-router';

// Importa los componentes que se utilizarán en las rutas
import Login from '../views/Login.vue';
import DashboardProfesores from "../views/DashboardProfesores.vue";
import DashboardAlumnos from '../views/DashboardAlumnos.vue';
import DashboardSalones from "../views/DashboardSalones.vue";
import DashboardAsignaturas from "../views/DashboardAsignaturas";
import Register from "../views/Register.vue";
import Editar from "../views/Editar.vue";
import Crear from "../views/Crear.vue";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboardprofesores',
    name: 'Dashboardprofesores',
    component: DashboardProfesores
  },
  {
    path: '/dashboardalumnos',
    name: 'Dashboardalumnos',
    component: DashboardAlumnos
  },
  {
    path: '/dashboardsalones',
    name: 'Dashboardsalones',
    component: DashboardSalones
  },
  {
    path: '/dashboardasignaturas',
    name: 'Dashboardasignaturas',
    component: DashboardAsignaturas
  },
  {
    path: '/editar/:id/profesores',
    name: 'EditarProfesores',
    component: Editar
  },
  {
    path: '/editar/:id/alumnos',
    name: 'EditarAlumnos',
    component: Editar
  },
  {
    path: '/editar/:id/salones',
    name: 'EditarSalones',
    component: Editar
  },
  {
    path: '/editar/:id/asignaturas',
    name: 'EditarAsignaturas',
    component: Editar
  },
  {
    path: '/crear/profesores',
    name: 'CrearProfesores',
    component: Crear
  },
  {
    path: '/crear/alumnos',
    name: 'CrearAlumnos',
    component: Crear
  },
  {
    path: '/crear/asignaturas',
    name: 'CrearAsignaturas',
    component: Crear
  },
  {
    path: '/crear/salones',
    name: 'CrearSalones',
    component: Crear
  },
];

const router = createRouter({
  history: createWebHistory(), // Opcional: Modo de enrutamiento (history, hash)
  routes
});

export default router;