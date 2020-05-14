<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template>
          <v-list-item :to="{name:'Home'}">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Inicio
            </v-list-item-title>
          </v-list-item>
        </template>
        <template>
          <v-list-item :to="{name:'Login'}">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Ingresar
            </v-list-item-title>
          </v-list-item>
        </template>
        <template>
          
            
              
              <v-list-item :to="{name:'ListaEmpresas'}">
                <v-list-item-action>
                  <v-icon>table_chart</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Mercados
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
          
        </template>
        <template>  
          
            <v-list-item :to="{name:''}">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Farmacias
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </template> 
        <template>   
            <v-list-item :to="{name:''}">
              <v-list-item-action>
                <v-icon>table_chart</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Tiendas
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
        </template>
        <template v-if="esAdministrador">    
              <v-list-item :to="{name:'Empresa'}">
                <v-list-item-action>
                  <v-icon>table_chart</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Empresas
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
        </template>
        <template v-if="esAdministrador">    
              <v-list-item :to="{name:'CategoriaEmpresa'}">
                <v-list-item-action>
                  <v-icon>table_chart</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Categoría de empresas
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
        </template>
        <template v-if="esAdministrador || esUsuario">    
              <v-list-item :to="{name:'Categoria'}">
                <v-list-item-action>
                  <v-icon>table_chart</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Categorias de producto
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
        </template>
        <template v-if="esAdministrador || esUsuario">    
              <v-list-item :to="{name:'Medida'}">
                <v-list-item-action>
                  <v-icon>table_chart</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Medidas de producto
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
        </template>
        <template v-if="esAdministrador || esUsuario">    
              <v-list-item :to="{name:'Presentacion'}">
                <v-list-item-action>
                  <v-icon>table_chart</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Presentaciones de producto
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
        </template>
        <template v-if="esAdministrador || esUsuario">    
              <v-list-item :to="{name:'Producto'}">
                <v-list-item-action>
                  <v-icon>table_chart</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Productos
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
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
      <v-btn @click="salir()" icon v-if="logueado">
        <v-icon>logout</v-icon> Salir
      </v-btn>
      
    </v-app-bar>
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
    
    <v-footer height="auto">
      <v-layout justify="center">
        <v-flex text-xs-center>
          <v-card flat tile color="primary" class="white--text">
            <v-card-text class="white--text pt-0">
              AureaIT &copy;2020
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
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
