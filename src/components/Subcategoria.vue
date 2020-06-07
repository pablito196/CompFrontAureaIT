<template>
  <v-layout align-start>  
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="subcategorias"
        :search="search"
        :items-per-page="10"
        :footer-props="{
          showFirstLastPage: true,
          firstIcon: 'mdi-arrow-collapse-left',
          lastIcon: 'mdi-arrow-collapse-right',
          prevIcon: 'mdi-minus',
          nextIcon: 'mdi-plusne'
        }"    
        class="elevation-1 category-table"
        
      >
        <template v-slot:item.estado="{ item }">
          <v-chip :color="getColorEstado(item.estado)" dark>{{ item.estado }}</v-chip>
        </template>

        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Subcategorías de producto</v-toolbar-title>
            <v-divider
                class="mx-2"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-text-field class="text-xs-center" v-model="search" append-icon="search" 
                label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on }">
                <v-btn  color="red lighten-2" dark class="mb-2" v-on="on">Nueva Subcategoría</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span style="margin-bottom: 40px;" class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm12 md12>
                        <v-select v-model="categoria" prepend-icon="assignment" 
                            :items="categorias"
                            label="Categoría">
                        </v-select>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field v-model="descripcion" label="Descripción" prepend-icon="library_books" ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12 v-show="valida">
                        <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div>
                      </v-flex>   
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                    <div v-if="dialogDelete === true">
                      <v-btn color="cyan darken-1" text @click="close">Cancelar</v-btn>
                      <v-btn color="cyan darken-1" text @click="remove">Eliminar</v-btn>
                    </div>
                    <div v-else-if="dialogDelete === false">
                      <v-btn color="cyan darken-1" text @click="close">Cancelar</v-btn>
                      <v-btn color="cyan darken-1" text @click="guardar">Guardar</v-btn>
                    </div>
                </v-card-actions>

              </v-card>
            </v-dialog>

            <v-dialog v-model="adModal" max-width="290">
              <v-card>
                <v-card-title class="headline" v-if="adAccion==1">
                  Activar categoría
                </v-card-title>
                <v-card-title class="headline" v-if="adAccion==2">
                  Desactivar categoría
                </v-card-title>
                <v-card-text>
                  Esta seguro de <span v-if="adAccion==1">activar</span>
                  <span v-if="adAccion==2">desactivar</span> la subcategoría {{adDescripcion}} ?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="activarDesactivarCerrar()" color="red lighten-2" dark>
                    Cancelar
                  </v-btn>
                  <v-btn v-if="adAccion==1" @click="activar()" color="cyan darken-1" dark>
                    Activar
                  </v-btn>
                  <v-btn v-if="adAccion==2" @click="desactivar()" color="cyan darken-1" dark>
                    Desactivar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>

        <template v-slot:item.action="{ item }">
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon medium color="cyan darken-1" class="mr-2" @click="editItem(item)">edit</v-icon>
              </v-btn>
            </template>
            <span>Editar subcategoría {{item.descripcion}}</span>
          </v-tooltip> 
          
          <template v-if="item.estado==='Activo'">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon medium color="cyan darken-1" class="mr-2" @click="activarDesactivarMostrar(2,item)">block</v-icon>
                </v-btn>
              </template>
              <span>Desactivar subcategoría {{item.descripcion}}</span>
            </v-tooltip>
          </template>
          <template v-else>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon medium color="cyan darken-1" class="mr-2" @click="activarDesactivarMostrar(1,item)">check</v-icon>
                </v-btn>
              </template>
              <span>Activar subcategoría {{item.descripcion}}</span>
            </v-tooltip>
          </template>
        </template>

        <template v-slot:no-data>
          <v-btn color="red lighten-2" dark @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>

import axios from 'axios';
export default {
  data: () => ({
    dialogDelete: false,
    dialog: false,
    search:'',
    subcategorias:[],
    categorias:[],
    headers: [
      { text: "Descripción", align: "left", sortable: true, value: "descripcion" },
      { text: "Categoría", align: "left", sortable: true, value: "categoria.descripcion" },
      { text: "Estado", sortable: false, value: "estado" },
      { text: "Opciones", value: "action", sortable: false, width: "8%" }
    ],
    
    editedIndex: -1,  
    _id:'',
    descripcion:'',

    valida:0,
    validaMensaje:[],
    adModal:0,
    adAccion:0,
    adDescripcion:'',
    adId:'',
    categoria:'',
    
    
  }),

  computed: {
    formTitle() {
      if (this.dialogDelete) {
        return "Eliminar Subcategoría";
      } else if (this.editedIndex === -1) {
        return "Nueva Subcategoría";
      } else if (this.editedIndex > -1) {
        return "Editar Subcategoría";
      }  
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listar();
    this.selectCategoria();
  },

  methods: {

    getColorEstado (estado) {
        if (estado == 'Activo') return 'cyan darken-1'
        else if (estado == 'Inactivo') return 'red lighten-2'
        
    },
    
    listar(){
      let me=this;
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      axios.get('subcategoria/list?valor='+this.$store.state.usuario.empresa,configuracion).then(function (response){
        
      for (var i=0;i<response.data.length;i++){
        if(response.data[i].estado==1){
          response.data[i].estado = 'Activo';
        }else{
            response.data[i].estado = 'Inactivo';
        }
        
      }
      me.subcategorias=response.data;
      }).catch(function(error){
        console.log(error);
      });
    },
    limpiar(){
      this._id='';
      this.descripcion='';
      this.categoria='';
      this.valida=0;
      this.validaMensaje=[];
      this.editedIndex=-1;
    },

    validar(){
      this.valida=0;
      this.validaMensaje=[];
      if(this.descripcion.length<1 || this.descripcion.length>100){
        this.validaMensaje.push('La descripción de la subcategoría debe tener entre 1 y 100 caracteres')
      }
      if(this.categoria.length<1){
        this.validaMensaje.push('Debe seleccionar una categoría para la subcategoría')
      }
      if(this.validaMensaje.length){
        this.valida=1;
      }
      return this.valida;
    },

    selectCategoria(){
      let me=this;
      let categoriaArray=[];
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      axios.get('categoria/list?valor='+this.$store.state.usuario.empresa,configuracion).then(function (response){
        categoriaArray=response.data;
        categoriaArray.map(function(x){
          me.categorias.push({text:x.descripcion, value:x._id});
        });
      }).catch(function(error){
        console.log(error);
      });
    },

    guardar(){
      let me=this;
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      if(this.validar()){
        return;
      }
      if(this.editedIndex >-1){
        //codigo para editar
        axios.put('subcategoria/update',{'_id':this._id, 'categoria':this.categoria,'descripcion':this.descripcion},configuracion)
        .then(function(response){
          me.limpiar();
          me.close();
          me.listar();
        })
        .catch(function(error){
          console.log(error);
        });
      } else {
        //codigo para guardar
        axios.post('subcategoria/add',{'empresa':this.$store.state.usuario.empresa,'categoria':this.categoria,'descripcion':this.descripcion},configuracion)
        .then(function(response){
          me.limpiar();
          me.close();
          me.listar();
        })
        .catch(function(error){
          console.log(error);
        });
      }
    },

    editItem(item) {
      this.dialogDelete = false;
      this._id=item._id;
      this.descripcion=item.descripcion;
      this.categoria=item.categoria._id;
      this.dialog = true;
      this.editedIndex = 1;
    },

    activarDesactivarMostrar(accion,item){
      this.adModal=1;
      this.adDescripcion=item.descripcion;
      this.adId=item._id;
      if(accion==1)
      {
        this.adAccion=1;
      }
      else if(accion==2)
      {
        this.adAccion=2;
      }
      else{
        this.adModal=0;
      }
    },

    activarDesactivarCerrar(){
      this.adModal=0;
    },

    activar(){
      let me=this;
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      axios.put('subcategoria/activate',{'_id':this.adId},configuracion)
        .then(function(response){
          me.adModal=0;
          me.adAccion=0;
          me.adDescripcion='';
          me.adId='';
          me.listar();
        })
        .catch(function(error){
          console.log(error);
        });
    },

    desactivar(){
      let me=this;
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      axios.put('subcategoria/deactivate',{'_id':this.adId},configuracion)
        .then(function(response){
          me.adModal=0;
          me.adAccion=0;
          me.adDescripcion='';
          me.adId='';
          me.listar();
        })
        .catch(function(error){
          console.log(error);
        });
    },

    close() {
      this.limpiar();
      this.dialog = false;
    },

    
  }
};
</script>

<style>
.category-table table th {
  background-color: lightgray;
  font-size: 20px !important;
}
</style>