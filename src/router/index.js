import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Empresa from '../components/Empresa.vue'
import ListaEmpresas from '../components/ListaEmpresas.vue'
import Login from '../components/Login'
import Categoria from '../components/Categoria'
import Medida from '../components/Medida'
import Presentacion from '../components/Presentacion'
import Producto from '../components/Producto'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      libre:true
    }
  },
  {
    path: '/empresa',
    name: 'Empresa',
    component: Empresa,
    meta:{
      //libre:true
      administrador:true
      //usuario:true /**esta variable en meta se utilizara en rutas de acceso para los clientes de las empresas que contraten el servicio*/
    }
  },
  {
    path: '/listaempresas',
    name: 'ListaEmpresas',
    component: ListaEmpresas,
    meta:{
      libre:true
    }
  },
  {
    path: '/categoria',
    name: 'Categoria',
    component: Categoria,
    meta:{
      //libre:true
      administrador:true,
      usuario:true 
    }
  },
  {
    path: '/medida',
    name: 'Medida',
    component: Medida,
    meta:{
      //libre:true
      administrador:true,
      usuario:true 
    }
  },
  {
    path: '/presentacion',
    name: 'Presentacion',
    component: Presentacion,
    meta:{
      //libre:true
      administrador:true,
      usuario:true 
    }
  },
  {
    path: '/producto',
    name: 'Producto',
    component: Producto,
    meta:{
      //libre:true
      administrador:true,
      usuario:true 
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      libre:true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.libre)){
    next();
  } else if(store.state.usuario && store.state.usuario.rol == 'Administrador'){
    if(to.matched.some(record => record.meta.administrador)){
      next();
    }
  } else if(store.state.usuario && store.state.usuario.rol == 'Usuario'){
      if(to.matched.some(record => record.meta.usuario)){
       next();
      }
  } else {
    next({name: 'Home'}); //Login
  } 
})
export default router
