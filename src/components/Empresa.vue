<template>
  <v-layout align-start>  
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="empresas"
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
            <v-toolbar-title>Empresas</v-toolbar-title>
            <v-divider
                class="mx-2"
                inset
                vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-text-field class="text-xs-center" v-model="search" append-icon="search" 
                label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>

            <v-dialog v-model="dialog" max-width="700px">
              <template v-slot:activator="{ on }">
                <v-btn color="success" dark class="mb-2" v-on="on">Nueva Empresa</v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span style="margin-bottom: 40px;" class="headline">{{ formTitle }}</span>
                </v-card-title>
                <form @submit.prevent="guardar" enctype="multipart/form-data">
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      
                      <v-flex xs12 sm12 md12>
                        <v-text-field id="nombre" v-model="nombre" label="Nombre" prepend-icon="description"  required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field id="nit" v-model="nit" label="Nit" prepend-icon="work" ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field id="direccion" v-model="direccion" label="Dirección" prepend-icon="business" ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field id="telefono" v-model="telefono" label="Teléfono" prepend-icon="phone" ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-text-field id="ciudad" v-model="ciudad" label="Ciudad" prepend-icon="location_city" ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-select id="categoriaempresa" v-model="categoriaempresa" prepend-icon="library_books" 
                          :items="categoriasEmpresa"
                          label="Categoría">
                        </v-select>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <v-btn raised class="primary" @click="onPickFile">Cargar logo </v-btn>
                            <input
                              type="file"
                              style="display: none"
                              ref="fileInput"
                              accept="image/*"
                              @change="onFilePicked"
                              name="image"
                        />
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                        <img :src="imageUrl" height="150">
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
                      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                      <v-btn color="blue darken-1" text @click="remove">Eliminar</v-btn>
                    </div>
                    <div v-else-if="dialogDelete === false">
                      <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                      <!--<v-btn type="submit" color="blue darken-1" text @click="guardar">Guardar</v-btn>-->
                      <v-btn type="submit" color="blue darken-1" text>Guardar</v-btn>
                    </div>
                </v-card-actions>
                </form> 
                </v-card>
            </v-dialog>
            <v-dialog v-model="adModal" max-width="290">
              <v-card>
                <v-card-title class="headline" v-if="adAccion==1">
                  Activar empresa
                </v-card-title>
                <v-card-title class="headline" v-if="adAccion==2">
                  Desactivar empresa
                </v-card-title>
                <v-card-text>
                  Esta seguro de <span v-if="adAccion==1">activar</span>
                  <span v-if="adAccion==2">desactivar</span> la empresa {{adNombre}} ?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="activarDesactivarCerrar()" color="green darken-1" >
                    Cancelar
                  </v-btn>
                  <v-btn v-if="adAccion==1" @click="activar()" color="orange darken-1" >
                    Activar
                  </v-btn>
                  <v-btn v-if="adAccion==2" @click="desactivar()" color="orange darken-1" >
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
                <v-icon medium color="success" class="mr-2" @click="editItem(item)">edit</v-icon>
              </v-btn>
            </template>
            <span>Editar empresa {{item.descripcion}}</span>
          </v-tooltip> 
          
          <template v-if="item.estado==='Activo'">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon medium color="success" class="mr-2" @click="activarDesactivarMostrar(2,item)">block</v-icon>
                </v-btn>
              </template>
              <span>Desactivar empresa {{item.descripcion}}</span>
            </v-tooltip>
          </template>
          <template v-else>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon medium color="success" class="mr-2" @click="activarDesactivarMostrar(1,item)">check</v-icon>
                </v-btn>
              </template>
              <span>Activar empresa {{item.descripcion}}</span>
            </v-tooltip>
          </template>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
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
    empresas:[],
    headers: [
      { text: "Nombre", align: "left", sortable: true, value: "nombre" },
      { text: "Nit", sortable: false, value: "nit" },
      { text: "Dirección", sortable: false, value: "direccion" },
      { text: "Teléfono", sortable: false, value: "telefono" },
      { text: "Ciudad", sortable: false, value: "ciudad" },
      { text: "Categoría", align: "left", sortable: true, value: "categoriaempresa.descripcion" },
      { text: "Estado", sortable: false, value: "estado" },
      { text: "Opciones", value: "action", sortable: false, width: "8%" }
    ],
    
    editedIndex: -1,  // Nueva empresa
    _id:'',
    nombre:'',
    nit:'',
    direccion:'',
    telefono:'',
    ciudad:'',
    categoriaempresa:'',
    valida:0,
    validaMensaje:[],
    categoriasEmpresa:[],
    adModal:0,
    adAccion:0,
    adNombre:'',
    adId:'',

    file:'',
    imageUrl:'',
    image:null
  }),

  

  computed: {
    formTitle() {
      if (this.dialogDelete) {
        return "Eliminar Empresa";
      } else if (this.editedIndex === -1) {
        return "Nueva Empresa";
      } else if (this.editedIndex > -1) {
        return "Editar Empresa";
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
    this.selectCategoriaEmpresa();
  },

  methods: {

    selectCategoriaEmpresa(){
      let me=this;
      let categoriaArray=[];
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      axios.get('categoriaempresa/list',configuracion).then(function (response){
        categoriaArray=response.data;
        categoriaArray.map(function(x){
          me.categoriasEmpresa.push({text:x.descripcion, value:x._id});
        });
      }).catch(function(error){
        console.log(error);
      });
    },
    getColorEstado (estado) {
        if (estado == 'Activo') return 'green'
        else if (estado == 'Inactivo') return 'red'
        
    },
    listar(){
      let me=this;
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      axios.get('empresa/list',configuracion).then(function (response){
        for (var i=0;i<response.data.length;i++){
          if(response.data[i].estado==1){
            response.data[i].estado = 'Activo';
          }else{
            response.data[i].estado = 'Inactivo';
          }
        
        }
        me.empresas=response.data;
      }).catch(function(error){
        console.log(error);
      });
    },
    limpiar(){
      this._id='';
      this.nombre='';
      this.nit='';
      this.direccion='';
      this.telefono='';
      this.ciudad='';
      this.categoriaempresa='',
      this.valida=0;
      this.validaMensaje=[];
      this.editedIndex=-1;
      this.image=null;
      this.imageUrl='';

    },
    validar(){
      this.valida=0;
      this.validaMensaje=[];
      if(this.nombre.length<1 || this.nombre.length>120){
        this.validaMensaje.push('El nombre de la empresa debe tener entre 1 y 120 caracteres')
      }
      if(this.nit.length>11){
        this.validaMensaje.push('El nit de la empresa no debe tener mas de 11 caracteres')
      }
      if(this.direccion.length>70){
        this.validaMensaje.push('La dirección de la empresa no debe tener mas de 70 caracteres')
      }
      if(this.telefono.length>11){
        this.validaMensaje.push('El teléfono de la empresa no debe tener mas de 15 caracteres')
      }
      if(this.ciudad.length>11){
        this.validaMensaje.push('El nombre de la ciudad a la que pertenece la empresa no debe tener mas de 30 caracteres')
      }
      if(this.validaMensaje.length){
        this.valida=1;
      }
      return this.valida;
    },
    guardar(){
      //console.log('entra a guardar');
      let me=this;
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      if(this.validar()){
        return;
      }
      if(this.editedIndex >-1){
        //codigo para editar
        axios.put('empresa/update',{'_id':this._id, 'categoriaempresa':this.categoriaempresa,'nombre':this.nombre,'nit':this.nit,'direccion':this.direccion,'telefono':this.telefono,'ciudad':this.ciudad},configuracion)
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
        //
        if(!this.image)
        {
          return;
        }

        const formData = new FormData();
        formData.append('categoriaempresa',this.categoriaempresa);
        formData.append('nombre',this.nombre);
        formData.append('nit',this.nit);
        formData.append('direccion',this.direccion);
        formData.append('telefono',this.telefono);
        formData.append('ciudad',this.ciudad);
        formData.append('image',this.image);

        //console.log(formData.image);
        axios.post('empresa/add',formData,configuracion)
        //axios.post('empresa/add',{'categoriaempresa':this.categoriaempresa,'nombre':this.nombre,'nit':this.nit,'direccion':this.direccion,'telefono':this.telefono,'ciudad':this.ciudad, 'image':this.image},configuracion)
        
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
      this.nombre=item.nombre;
      this.nit=item.nit;
      this.direccion=item.direccion;
      this.telefono=item.telefono;
      this.ciudad=item.ciudad;
      if(item.categoriaempresa != null)
      {
        this.categoriaempresa=item.categoriaempresa._id;
      }
        
      this.dialog = true;
      this.editedIndex = 1;
    },

    activarDesactivarMostrar(accion,item){
      this.adModal=1;
      this.adNombre=item.nombre;
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
      axios.put('empresa/activate',{'_id':this.adId},configuracion)
        .then(function(response){
          me.adModal=0;
          me.adAccion=0;
          me.adNombre='';
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
      axios.put('empresa/deactivate',{'_id':this.adId},configuracion)
        .then(function(response){
          me.adModal=0;
          me.adAccion=0;
          me.adNombre='';
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

    onPickFile(){
      this.$refs.fileInput.click();
    },
    onFilePicked(event){
      //this.file = this.$refs.file.files[0];
      const files = event.target.files;
      let filename = files[0].name;
      if(filename.lastIndexOf('.') <=0){
        return alert('Por favor seleccione un archivo válido!!');
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result;
      })
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
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