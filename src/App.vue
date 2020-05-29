<template>
  <v-app id="app">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      color ="cyan lighten-1 "
      dark
      
    >
      <v-list dense>
        <template>
          <v-list-item :to="{name:'Home'}" active-class="border">
            <v-list-item-action>
              <v-icon>dashboard</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Inicio
            </v-list-item-title>
          </v-list-item>
        </template>
        <template>
          <v-list-item :to="{name:'Login'}" active-class="border">
            <v-list-item-action>
              <v-icon>home</v-icon>
            </v-list-item-action>
            <v-list-item-title>
              Ingresar
            </v-list-item-title>
          </v-list-item>
        </template>
        <template>
          
            
              
              <v-list-item :to="{name:'ListaEmpresas'}" active-class="border">
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
          
            <v-list-item :to="{name:''}" active-class="border">
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
            <v-list-item :to="{name:''}" active-class="border">
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
              <v-list-item :to="{name:'Empresa'}" active-class="border">
                <v-list-item-action>
                  <v-icon>folder</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Empresas
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
        </template>
        <template v-if="esAdministrador">    
              <v-list-item :to="{name:'CategoriaEmpresa'}" active-class="border">
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
              <v-list-item :to="{name:'Categoria'}" active-class="border">
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
              <v-list-item :to="{name:'Medida'}" active-class="border">
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
              <v-list-item :to="{name:'Presentacion'}" active-class="border">
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
              <v-list-item :to="{name:'Producto'}" active-class="border">
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
      Salir
      <v-btn @click="salir()" icon v-if="logueado">
        <v-icon>exit_to_app</v-icon> 
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