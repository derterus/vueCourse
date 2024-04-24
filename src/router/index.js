import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/doctors',
      name: 'doctors',
      component: () => import('../views/doctors/DoctorsView.vue')
    },
    {
      path: '/patient',
      name: 'patient',
      component: () => import('../views/patient/PatientView.vue')
    },
    {
      path: '/doctors/create',
      name: 'doctorsCreate',
      component: () => import('../views/doctors/DoctorsCreateView.vue')
    },
    {
      path: '/patient/create',
      name: 'patientCreate',
      component: () => import('../views/patient/PatientCreateView.vue')
    },
    {
      path: '/doctors/edit/:id',
      name: 'doctorsEdit',
      component: () => import('../views/doctors/DoctorsEditView.vue')
    },
    {
      path: '/patient/edit/:id',
      name: 'patientEdit',
      component: () => import('../views/patient/PatientEditView.vue')
    },
    {
      path: '/doctors/show/:id',
      name: 'doctorsShow',
      component: () => import('../views/doctors/DoctorsShowView.vue')
    },
    {
      path: '/patient/show/:id',
      name: 'patientShow',
      component: () => import('../views/patient/PatientShowView.vue')
    },
  ]
})

export default router
