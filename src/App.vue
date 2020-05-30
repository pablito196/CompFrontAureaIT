<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      
      app
      color ="cyan darken-1 "
      dark
      mini-variant
      mini-variant-width="160"
      
    >
      <v-list>
        <v-list-item class="mb-12">
          <v-list-item-action></v-list-item-action>
        </v-list-item>
      </v-list>

      <v-list flat>
        <v-list-item router to="/login">
          <v-list-item-content>
            <v-icon class="mb-2">sensor_door</v-icon>
            <v-list-item-subtitle align="center">Ingreso</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      

      <template  v-if="esAdministrador || esUsuario">
        <v-list flat>
          <v-list-item router to="/">
           <v-list-item-content>
              <v-icon class="mb-2">dashboard</v-icon>
              <v-list-item-subtitle align="center">Inicio</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template  v-if="esAdministrador || esUsuario">
        <v-list flat>
          <v-list-item router to="/categoria">
           <v-list-item-content>
              <v-icon class="mb-2">assignment</v-icon>
              <v-list-item-subtitle align="center">Categorías producto</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template  v-if="esAdministrador || esUsuario">
        <v-list flat>
          <v-list-item router to="/medida">
           <v-list-item-content>
              <v-icon class="mb-2">collections</v-icon>
              <v-list-item-subtitle align="center">Medidas producto</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template  v-if="esAdministrador || esUsuario">
        <v-list flat>
          <v-list-item router to="/presentacion">
           <v-list-item-content>
              <v-icon class="mb-2">layers</v-icon>
              <v-list-item-subtitle align="center">Present. producto</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template  v-if="esAdministrador || esUsuario">
        <v-list flat>
          <v-list-item router to="/producto">
           <v-list-item-content>
              <v-icon class="mb-2">article</v-icon>
              <v-list-item-subtitle align="center">Productos</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template  v-if="esAdministrador || esUsuario">
        <v-list flat>
          <v-list-item router to="/categoriaempresa">
           <v-list-item-content>
              <v-icon class="mb-2">assignment</v-icon>
              <v-list-item-subtitle align="center">Categorías empresa</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template  v-if="esAdministrador || esUsuario">
        <v-list flat>
          <v-list-item router to="/empresa">
           <v-list-item-content>
              <v-icon class="mb-2">add_business</v-icon>
              <v-list-item-subtitle align="center">Empresas</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <template  v-if="esAdministrador || esUsuario">
        <v-list style="position: aboslute; bottom:0" class="ml-3">
          <v-list-item router to="/login">
           <v-list-item-action>
              <v-btn @click="salir()" icon v-if="logueado">
                <v-icon>exit_to_app</v-icon> 
                <v-list-item-subtitle align="center">Salir</v-list-item-subtitle>
              </v-btn>
           </v-list-item-action>
          </v-list-item>
        </v-list>
      </template>
     
    </v-navigation-drawer>

    <!--<v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-3"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <span class="hidden-sm-and-down">Compras en linea</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      Salir
      <v-btn @click="salir()" icon v-if="logueado">
        <v-icon>exit_to_app</v-icon> 
      </v-btn>
      
    </v-app-bar>-->
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
       
      </v-container>
    </v-content>
    
    <v-footer
      dark
      padless
      app
      inset
    
    >
      <v-card
        class="flex"
        flat
        tile
        color="cyan darken-1"
        :elevation="10"
      >

        <v-card-text class="py-2 white--text text-center">
          {{ new Date().getFullYear() }} — <strong>&copy; AureaIT</strong>
       </v-card-text>
      </v-card>
    </v-footer>
    
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data (){
    return{
      drawer: true
    }
  },
  computed:{
    logueado(){
      return this.$store.state.usuario;
    },
    esAdministrador(){
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'Administrador';
    },
    esUsuario(){
      return this.$store.state.usuario && this.$store.state.usuario.rol == 'Usuario';
    }
  },
  created(){
    this.$store.dispatch("autoLogin");
  },
  methods:{
    salir(){
      this.$store.dispatch("salir");
    }
  }

};
</script>
<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
</style>