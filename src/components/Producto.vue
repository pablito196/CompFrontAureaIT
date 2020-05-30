<template>
  <v-layout align-start>  
    <v-flex>
      <h2>Productos</h2>
      <v-data-table
        :headers="headers"
        :items="productos"
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
        v-if="verNuevo==0"
      >
        <template v-slot:item.estado="{ item }">
          <v-chip :color="getColorEstado(item.estado)" dark>{{ item.estado }}</v-chip>
        </template>

        <template v-slot:top>
          <v-toolbar flat color="white">
           
            <v-spacer></v-spacer>
            <v-text-field v-if="verNuevo==0" class="text-xs-center" v-model="search" append-icon="search" 
                label="Búsqueda" single-line hide-details></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="success" v-if="verNuevo==0"  @click="mostrarNuevo()" dark class="mb-2" >Nuevo Producto</v-btn>
            
            <v-dialog v-model="dialogCargarImagenes" max-width="650px">
              <v-card>
                <v-card-title>
                  <span style="margin-bottom: 40px;" class="headline">Cargar imagen del producto</span>
                </v-card-title>

                <form @submit.prevent="guardarImagen" enctype="multipart/form-data">
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      
                      <v-flex xs12 sm12 md12>
                        <v-btn raised class="primary" @click="onPickFile">Cargar imagen </v-btn>
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
                        <img :src="imageUrl" height="550" >
                      </v-flex>
                      
                          
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <div class="flex-grow-1"></div>
                    
                    <div >
                      <v-btn color="blue darken-1" text @click="cerrarCargadoImagenes">Cerrar</v-btn>
                      <v-btn color="blue darken-1" text @click="cancelarCargadoImagenes">Cancelar</v-btn>
                      <v-btn type="submit" color="blue darken-1" text>Guardar</v-btn>
                    </div>
                </v-card-actions>
                </form> 

                

              </v-card>
            </v-dialog>

            <v-dialog v-model="adModal" max-width="290">
              <v-card>
                <v-card-title class="headline" v-if="adAccion==1">
                  Activar producto
                </v-card-title>
                <v-card-title class="headline" v-if="adAccion==2">
                  Desactivar producto
                </v-card-title>
                <v-card-text>
                  Esta seguro de <span v-if="adAccion==1">activar</span>
                  <span v-if="adAccion==2">desactivar</span> el producto {{adDescripcion}} ?
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
                <v-icon medium color="success" class="mr-2" @click="establecerCategoriaProducto(item)">more</v-icon>
              </v-btn>
            </template>
            <span>Añadir características</span>
          </v-tooltip>

          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon medium color="success" class="mr-2" @click="cargarImagenesProducto(item)">add_photo_alternate</v-icon>
              </v-btn>
            </template>
            <span>Cargar imágenes producto</span>
          </v-tooltip>

          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon medium color="success" class="mr-2" @click="editItem(item)">edit</v-icon>
              </v-btn>
            </template>
            <span>Editar producto</span>
          </v-tooltip>
          
          <template v-if="item.estado==='Activo'">
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon medium color="success" class="mr-2" @click="activarDesactivarMostrar(2,item)">block</v-icon>
                </v-btn>
              </template>
              <span>Desactivar producto {{item.descripcion}}</span>
            </v-tooltip>
          </template>
          <template v-else>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                  <v-icon medium color="success" class="mr-2" @click="activarDesactivarMostrar(1,item)">check</v-icon>
                </v-btn>
              </template>
              <span>Activar producto {{item.descripcion}}</span>
            </v-tooltip>
          </template>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="listar()">Resetear</v-btn>
        </template>
      </v-data-table>
      <v-container grid-list-sm class="pa-4 white" v-if="verNuevo">
        <v-layout row wrap>
          <v-flex xs12 sm8 md8 lg8 xl8>
            <v-text-field v-model="descripcion" label="Descripción" prepend-icon="library_books" ></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field v-model="codigo" label="Código" prepend-icon="assignment"></v-text-field>
          </v-flex>
          <v-flex xs12 sm8 md8 lg8 xl8>
            <v-select v-model="categoria" prepend-icon="assignment" 
              :items="categorias"
              label="Categoría">
            </v-select>
          </v-flex>
          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-select v-model="medida" prepend-icon="collections"
              :items="medidas"
              label="Medida">
            </v-select>
          </v-flex>
          <v-flex xs12 sm2 md2 lg2 xl2>
            <v-text-field v-model="cantidadMedida" label="Cantidad de la unidad de medida" prepend-icon="plus_one"></v-text-field>
          </v-flex>
          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-select v-model="presentacion" prepend-icon="layers" 
              :items="presentaciones"
              label="Presentación">
            </v-select>
          </v-flex>
          <v-flex xs12 sm2 md2 lg2 xl2>
            <v-text-field v-model="cantidadPresentacion" label="Cantidad en la presentación" prepend-icon="plus_one"></v-text-field>
          </v-flex>
           <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field v-model="precioVenta" label="Precio de venta" prepend-icon="monetization_ont"></v-text-field>
          </v-flex>
          <v-flex xs12 sm12 md12 v-show="valida">
            <div class="red--text" v-for="v in validaMensaje" :key="v" v-text="v"></div>
          </v-flex>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-btn color="blue darken-1" @click.native="ocultarNuevo()">Cancelar</v-btn>
            <v-btn color="success" @click.native="guardar()">Guardar</v-btn>
          </v-flex>   
        </v-layout>
      </v-container>
      <!-- container para otras características -->
      
      <v-container grid-list-sm class="pa-4 white" v-if="verCaracteristicas">
        <h3>Características del producto: </h3> <h2> {{this.nombreProducto}}</h2>
        <v-layout row wrap>
          <v-flex xs12 sm6 md6 lg6 xl6>
            <v-text-field v-model="nombreCaracteristica" label="Característica"></v-text-field>
          </v-flex>
          <v-flex xs12 sm4 md4 lg4 xl4>
            <v-text-field v-model="valorCaracteristica" label="Valor"></v-text-field>
          </v-flex >
          <v-flex xs12 sm12 md12 v-show="validaDetalleCaracteristica">
              <div class="red--text" v-for="v in validaMensajeDetalleCaracteristica" :key="v" v-text="v"></div>
          </v-flex>
          <v-flex xs12 sm2 md2 lg2 x12>
            <v-btn small fab dark @click=" agregarDetalle()" color="teal">
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-flex>
          <!--inicio detalle caracteristica -->
          <v-flex xs12 sm12 md12 lg12 xl12>
            <template>
              <v-data-table
                :headers="headersCaracteristicaProducto"
                :items="detalleCaracteristicaProducto"
                class="elevation-1"
                hide-default-footer
              >
              <template v-slot:item.actions="{ item }">
                                
                <v-icon color="teal" 
                  medium
                   @click="deleteItem(item)"
                >
                  delete
                </v-icon>
                </template>
                <template slot="no-data">
                  <h3>No hay características agregadas para el producto.</h3>
                </template>
                
              </v-data-table>
                            
              </template>
            </v-flex>
           
           <!--fin detalle caracteristica -->
             <v-divider></v-divider>        
           <v-data-table
              :headers="headersListadoCaracteristicas"
              :items="listadoCaracteristicas"
              class="elevation-1"
            >
             <template v-slot:item.action="{ item }">
          
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on">
                    <v-icon medium color="success" class="mr-2" @click="eliminarCaracteristicaProductoMostrar(item)">delete</v-icon>
                  </v-btn>
                </template>
              <span>Eliminar característica</span>
              </v-tooltip>
             </template>
            </v-data-table>
            <v-flex xs12 sm12 md12 v-show="validaListaCaracteristicas">
                  <div class="red--text" v-for="v in validaMensajeListaCaracteristicas" :key="v" v-text="v"></div>
            </v-flex> 
            <v-flex xs12 sm12 md12 lg12 xl12>
            <v-btn color="blue darken-1" @click.native="cancelarRegistroCategoria()">Cancelar</v-btn>
            <v-btn color="success" @click.native="guardarCaracteristicaProducto()" >Guardar características</v-btn>
          </v-flex>
          
          <v-dialog v-model="adModalCaracteristica" max-width="290">
              <v-card>
                <v-card-title class="headline">
                  Eliminar característica
                </v-card-title>
                <v-card-text>
                  Esta seguro de eliminar la característica {{adNombreCaracteristica}} ?
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="eliminarCaracteristicaCerrar()" color="green darken-1" >
                    Cancelar
                  </v-btn>
                  <v-btn  @click="eliminarCaracteristicaProducto()" color="orange darken-1" >
                    Eliminar
                  </v-btn>
                  
                </v-card-actions>
              </v-card>
           </v-dialog>
          
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>

import axios from 'axios';
export default {
  data: () => ({
    
    headersCaracteristicaProducto: [
      {
        text: 'Valores',
        align: 'start',
        sortable: false,
        value: 'nombre',
      },
      { text: 'Opciones', value: 'actions', sortable: false },
    ],
    
    headersListadoCaracteristicas: [
      {
        text: 'Nombre',
        align: 'start',
        value: 'nombre',
      },
      { 
        text: 'Valor', 
        value: 'valor'
      },
      { text: "Opciones", value: "action", sortable: false, width: "8%" }
    ],

    headers: [
        { text: "Descripción", align: "left", sortable: true, value: "descripcion" },
        { text: "Código", align: "left", value: "codigo" },
        { text: "Categoría", align: "left", sortable: true, value: "categoria.descripcion" },
        { text: "Cant. medida", align: "left", value: "cantidadMedida" },
        { text: "Medida", align: "left", sortable: true, value: "medida.descripcion" },
        { text: "Cant. presentación", align: "left", value: "cantidadPresentacion" },
        { text: "Presentación", align: "left", sortable: true, value: "presentacion.descripcion" },
        { text: "Precio venta", align: "left", value: "precioVenta" },
        { text: "Estado", sortable: false, value: "estado" },
        { text: "Opciones", value: "action", sortable: false, width: "8%" }
    ],
    
    listadoCaracteristicas: [],
    productos:[],
    categorias:[],
    medidas:[],
    presentaciones:[],
    validaMensaje:[],
    validaMensajeDetalleCaracteristica:[],
    validaMensajeListaCaracteristicas:[],
    detalleCaracteristicaProducto:[],
    
    dialogCargarImagenes:false,
    dialogDelete: false,
    dialog: false,
    search:'',
    editedIndex: -1,  
    _id:'',
    descripcion:'',
    codigo:'',
    categoria:'',
    medida:'',
    cantidadMedida:0,
    presentacion:'',
    cantidadPresentacion:0,
    precioVenta:0,
    verNuevo:0,
    verCaracteristicas:0,
    valida:0,
    validaDetalleCaracteristica:0,
    validaListaCaracteristicas:0,
    adModal:0,
    adAccion:0,
    adDescripcion:'',
    adId:'',
    nombreCaracteristica:'',
    valorCaracteristica:'',
    nombreProducto:'',
   
    adModalCaracteristica:0,
    adNombreCaracteristica:'',
    adIdCaracteristica:0,

    file:'',
    image:null,
    imageUrl:'',
    cantidadImagenes:0,
    
  }),

  computed: {
    /*formTitle() {
      if (this.dialogDelete) {
        return "Eliminar Categoría";
      } else if (this.editedIndex === -1) {
        return "Nueva Categoría";
      } else if (this.editedIndex > -1) {
        return "Editar Categoría";
      }  
    }*/
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.listar();
    this.selectCategoria();
    this.selectMedida();
    this.selectPresentacion();
  },

  methods: {
    //OPERACIONES CON IMAGENES PRODUCTO
    guardarImagen(){
      if(!this.image)
      {
        alert('Debe cargarse una imagen...')
        return;
      }
        
        let me=this;
        let header = {"Token":this.$store.state.token};
        let configuracion = {headers : header};

        const formData = new FormData();
        
        formData.append('image',this.image);
        formData.append('producto',this._id);
        axios.post('imagenproducto/add',formData,configuracion)
        
        
        .then(function(response){
          me.limpiarImagenesCargadas();
          me.dialogCargarImagenes= false;
          
        })
        .catch(function(error){
          console.log(error);
        });
    
    },
    limpiarImagenesCargadas(){
      //this._id='';
      this.file='',
      this.image=null,
      this.imageUrl=''
      //this.cantidadImagenes=0
      
    },
    cancelarCargadoImagenes(){
      this.limpiarImagenesCargadas();
    },
    cerrarCargadoImagenes(){
      this.limpiarImagenesCargadas();
      this.dialogCargarImagenes=false;
    },
    cargarImagenesProducto: function(item){
      this.cantidadImagenes=0;
      this._id=item._id;
      var me = this;
      axios.get('imagenproducto/queryimagenes?producto='+this._id).then(function (response){
        if(response.data!=null){
          me.cantidadImagenes=response.data;
          
          if(me.cantidadImagenes>=3)
          {
            alert('Ya se cargó la cantidad de imágenes permitidas para este producto');
            me.dialogCargarImagenes = false;
          }
          else
          {
            me.dialogCargarImagenes = true;
          }
          
        }
        
        

      }).catch(function(error){
        console.log(error);
      });


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
    //OPERACIONES CON CARACTERISTICAS
    deleteItem (item) {
      const index = this.detalleCaracteristicaProducto.indexOf(item)
      this.detalleCaracteristicaProducto.splice(index, 1)
    },
    
    eliminarCaracteristicaProductoMostrar(item){
      this.adModalCaracteristica=1;
      this.adNombreCaracteristica=item.nombre;
      this.adIdCaracteristica=item._id;
    },

    eliminarCaracteristicaCerrar(){
      this.adModalCaracteristica=0;
    },

    eliminarCaracteristicaProducto(){
      let me=this;
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      axios.delete('caracteristicaproducto/remove?valor='+this.adIdCaracteristica,configuracion)
        .then(function(response){
          me.adModalCaracteristica=0;
          me.adNombreCaracteristica='';
          me.adIdCaracteristica='';
          me.listarCaracteristicasProducto(me._id)
        })
        .catch(function(error){
          console.log(error);
        });
    },

    establecerCategoriaProducto(item){
      this.limpiar();
      this.caracteristicasProducto = item;
      this._id = item._id;
      this.nombreProducto = item.descripcion;
      this.verCaracteristicas=1;
      this.listarCaracteristicasProducto(this._id)
    },

    listarCaracteristicasProducto(id){
      let me=this;
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      let valores='';
      me.listadoCaracteristicas=[];
      axios.get('caracteristicaproducto/list?valor='+id,configuracion).then(function (response){
        for (var i=0;i<response.data.length;i++){
          let _id = response.data[i]._id; 
          let _nombreCaracteristica = response.data[i].nombre;
          let _valor = response.data[i].valor;
          for(var j=0;j<_valor.length;j++){
            if(valores!='')
              valores = valores+', '+ _valor[j].nombre;
            else  
              valores = valores+ _valor[j].nombre;
          }
          me.listadoCaracteristicas.push({'_id':_id,'nombre':_nombreCaracteristica, 'valor':valores});
          valores='';
        }
        
      }).catch(function(error){
        console.log(error);
      });
      
    },

    validarDetalleCaracteristica(){
      this.validaDetalleCaracteristica=0;
      this.validaMensajeDetalleCaracteristica=[];
      if(this.nombreCaracteristica.length<1 || this.nombreCaracteristica.length>100){
        this.validaMensajeDetalleCaracteristica.push('El nombre de la característica debe tener entre 1 y 100 caracteres');
      }
      if(this.valorCaracteristica.length<1 || this.valorCaracteristica.length>80){
        this.validaMensajeDetalleCaracteristica.push('El valor de la característica debe tener entre 1 y 80 caracteres');
      }
      
      if(this.validaMensajeDetalleCaracteristica.length){
        this.validaDetalleCaracteristica=1;
      }
      return this.validaDetalleCaracteristica;
    },
    agregarDetalle(){
      if(this.validarDetalleCaracteristica()){
        return;
      }
      this.detalleCaracteristicaProducto.push(
      {
        nombre:this.valorCaracteristica,
      } );
      this.valorCaracteristica='';
    },

    encuentraCaracteristicaRepetida(nombreCaracteristica){
      
      let sw=0;
      for (var i=0;i<this.listadoCaracteristicas.length;i++){
        if(this.listadoCaracteristicas[i].nombre==nombreCaracteristica){
          sw=true;
          
        }
      }
      return sw;
    },

    validarListaCaracteristicas(){
      this.validaListaCaracteristicas=0;
      this.validaMensajeListaCaracteristicas=[];
      if(this.encuentraCaracteristicaRepetida(this.nombreCaracteristica)){
        this.validaMensajeListaCaracteristicas.push('La característica ya se encuentra registrada');
      }
      
      if(this.validaMensajeListaCaracteristicas.length){
        this.validaListaCaracteristicas=1;
      }
      return this.validaListaCaracteristicas;
    },

    guardarCaracteristicaProducto(){
      let me=this;
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      let idProducto = this._id;
      
      if(this.validarListaCaracteristicas()){
        this.detalleCaracteristicaProducto=[];
        return;
      }
      
       axios.post('caracteristicaproducto/add',{
         'producto':this._id,
         'nombre':this.nombreCaracteristica,
         'valor':this.detalleCaracteristicaProducto
        },configuracion)
        .then(function(response){
          
          me.listarCaracteristicasProducto(idProducto);
          me.limpiarDetalleCaracteristicaProducto();
          
          
        })
        .catch(function(error){
          console.log(error);
        });
      
    
    },
    limpiarDetalleCaracteristicaProducto(){
      this._id='';
      this.nombreCaracteristica='';
      this.detalleCaracteristicaProducto=[];
      this.valorCaracteristica='';
    },

    cancelarRegistroCategoria(){

      this.limpiarDetalleCaracteristicaProducto();     
      this.limpiar();
      this.verNuevo=0;
    
    },

    /////// OPERACIONES CON PRODUCTO
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
    
    selectMedida(){
      let me=this;
      let medidaArray=[];
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      axios.get('medida/list?valor='+this.$store.state.usuario.empresa,configuracion).then(function (response){
        medidaArray=response.data;
        medidaArray.map(function(x){
          me.medidas.push({text:x.descripcion, value:x._id});
        });
      }).catch(function(error){
        console.log(error);
      });
    },

    selectPresentacion(){
      let me=this;
      let presentacionArray=[];
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      axios.get('presentacion/list?valor='+this.$store.state.usuario.empresa,configuracion).then(function (response){
        presentacionArray=response.data;
        presentacionArray.map(function(x){
          me.presentaciones.push({text:x.descripcion, value:x._id});
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
      axios.get('producto/list?valor='+this.$store.state.usuario.empresa,configuracion).then(function (response){
        for (var i=0;i<response.data.length;i++){
          if(response.data[i].estado==1){
            response.data[i].estado = 'Activo';
          }else{
            response.data[i].estado = 'Inactivo';
          }
        }
        me.productos=response.data;
      }).catch(function(error){
        console.log(error);
      });
    },
    limpiar(){
      this._id='';
      this.descripcion='';
      this.codigo='';
      this.categoria='';
      this.medida='';
      this.cantidadMedida=0;
      this.presentacion='';
      this.cantidadPresentacion=0;
      this.precioVenta=0;
      
      this.verNuevo=0;
      this.verCaracteristicas=0;
      this.valida=0;
      this.validaMensaje=[];
      this.editedIndex=-1;
    },

    validar(){
      this.valida=0;
      this.validaMensaje=[];
      if(this.descripcion.length<1 || this.descripcion.length>255){
        this.validaMensaje.push('La descripción del producto debe tener entre 1 y 255 caracteres')
      }
      if(this.categoria.length<1){
        this.validaMensaje.push('Debe seleccionar una categoría para el producto')
      }
      if(this.precioVenta < 1){
        this.validaMensaje.push('Debe asignar un precio al producto')
      }
      if(this.validaMensaje.length){
        this.valida=1;
      }
      return this.valida;
    },

    mostrarNuevo(){
      this.limpiar();
      this.verNuevo=1;
    },

    ocultarNuevo(){
      this.limpiar();
      this.verNuevo=0;
    },

    guardar(){
      let me=this;
      let header = {"Token":this.$store.state.token};
      let configuracion = {headers : header};
      if(this.validar()){
        return;
      }
      //console.log('editIndex: ',this.editedIndex);
      if(this.editedIndex >-1){
        //codigo para editar
        axios.put('producto/update',{'_id':this._id, 'categoria':this.categoria,'descripcion':this.descripcion,
                  'codigo':this.codigo,'presentacion':this.presentacion,'cantidadPresentacion':this.cantidadPresentacion,'medida':this.medida,
                  'cantidadMedida':this.cantidadMedida,'precioVenta':this.precioVenta},configuracion)
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
        axios.post('producto/add',{'empresa':this.$store.state.usuario.empresa,'categoria':this.categoria,'descripcion':this.descripcion,
                  'codigo':this.codigo,'presentacion':this.presentacion,'cantidadPresentacion':this.cantidadPresentacion,'medida':this.medida,
                  'cantidadMedida':this.cantidadMedida,'precioVenta':this.precioVenta},configuracion)
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
      this.verNuevo = 1;
      this._id=item._id;
      this.descripcion=item.descripcion;
      this.codigo=item.codigo;
      this.categoria=item.categoria._id;
      this.medida=item.medida._id;
      this.cantidadMedida=item.cantidadMedida;
      this.presentacion=item.presentacion._id;
      this.cantidadPresentacion=item.cantidadPresentacion;
      this.precioVenta=item.precioVenta;
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
      axios.put('producto/activate',{'_id':this.adId},configuracion)
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
      axios.put('producto/deactivate',{'_id':this.adId},configuracion)
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

    /*remove() {
      this.categories.splice(this.editedIndex, 1);
      this.close();
    }*/
  }
};
</script>

<style>
.category-table table th {
  background-color: lightgray;
  font-size: 20px !important;
}
</style>