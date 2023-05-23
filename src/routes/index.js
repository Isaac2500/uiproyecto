import { createRouter, createWebHistory } from 'vue-router';

// Importa los componentes que se utilizarán en las rutas
import Login from '../views/Login.vue';
import DashboardProfesores from '../views/DashboardProfesores.vue';
import DashboardAlumnos from '../views/DashboardAlumnos.vue';
import DashboardSalones from '../views/DashboardSalones.vue';
import DashboardAsignaturas from '../views/DashboardAsignaturas';
import Register from '../views/Register.vue';
import Editar from '../views/Editar.vue';
import Crear from '../views/Crear.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/dashboardprofesores',
    name: 'Dashboardprofesores',
    component: DashboardProfesores,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboardalumnos',
    name: 'Dashboardalumnos',
    component: DashboardAlumnos,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboardsalones',
    name: 'Dashboardsalones',
    component: DashboardSalones,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/dashboardasignaturas',
    name: 'Dashboardasignaturas',
    component: DashboardAsignaturas,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/editar/:id/profesores',
    name: 'EditarProfesores',
    component: Editar,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/editar/:id/alumnos',
    name: 'EditarAlumnos',
    component: Editar,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/editar/:id/salones',
    name: 'EditarSalones',
    component: Editar,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/editar/:id/asignaturas',
    name: 'EditarAsignaturas',
    component: Editar,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/crear/profesores',
    name: 'CrearProfesores',
    component: Crear,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/crear/alumnos',
    name: 'CrearAlumnos',
    component: Crear,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/crear/asignaturas',
    name: 'CrearAsignaturas',
    component: Crear,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/crear/salones',
    name: 'CrearSalones',
    component: Crear,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(), // Opcional: Modo de enrutamiento (history, hash)
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserAuthenticated()) {
    // Si la ruta requiere autenticación y el usuario no está autenticado, redirigir al login
    next({ name: 'Login' });
  } else {
    // De lo contrario, permitir la navegación
    next();
  }
});

// Función para verificar si el usuario está autenticado (puedes ajustarla según tus necesidades)
function isUserAuthenticated() {
  const token = localStorage.getItem('token');
  return token && token !== 'null' && token !== 'undefined'; // Verifica si el token existe y tiene un valor válido
}

export default router;
