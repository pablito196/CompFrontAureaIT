<template>
  <v-container >
    <h1 class="subheading grey--text">Pedidos pendientes</h1>
    <v-layout row wrap v-for="pedido in pedidos" :key="pedido._id"  >
      <v-flex md4 >
        
          <v-container>
            <v-flex >
              <v-card class="ma-5 text-center mt-8" shaped elevation="10">
                <v-avatar class="mt-n8" size="60" elevation="10">
                  <img src="avatar1.png">
                </v-avatar>  
                <v-card-title class="layout justify-center">Cliente: {{pedido.cliente.nombre}} </v-card-title>
                <v-card-subtitle class="layout justify-center">Recibe: {{pedido.quienRecibe}} </v-card-subtitle>
                <v-list class="mt-n5">
                    <v-list-item>
                      <v-list-item-title class="cyan--text text--darken-1">Ciudad</v-list-item-title>
                      <v-list-item-title class="cyan--text text--darken-1">Dirección</v-list-item-title>
                      <v-list-item-title class="cyan--text text--darken-1">Teléfono</v-list-item-title>
                    </v-list-item>
                    <v-list-item class="mt-n5">
                      <v-list-item-subtitle>{{pedido.cliente.ciudad}}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{pedido.cliente.direccion}}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{pedido.cliente.telefono}}</v-list-item-subtitle>
                    </v-list-item>
                    
                </v-list>
                
              </v-card>
            </v-flex>
            <v-flex>
              <v-card class="ma-5 mt-n2" shaped elevation="10">
                 <v-card-title class="layout justify-center">Pedido</v-card-title>
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar size="10" color="cyan darken-1"></v-list-item-avatar>
                    <v-list-item-title class="ml-n2">Fecha de entrega</v-list-item-title>
                    <v-list-item-subtitle>{{pedido.fechaEntrega}} </v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-avatar size="10" color="cyan darken-1"></v-list-item-avatar>
                    <v-list-item-title class="ml-n3">Hora para entrega</v-list-item-title>
                    <v-list-item-subtitle>{{pedido.horaInicioRango}} - {{pedido.horaFinRango}}</v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-avatar size="10" color="cyan darken-1"></v-list-item-avatar>
                    <v-list-item-title class="ml-n2">Transporte</v-list-item-title>
                    <v-list-item-subtitle>{{pedido.transporte}}</v-list-item-subtitle>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item>
                    <v-list-item-title class="cyan--text text--darken-1">Total Pedido</v-list-item-title>
                    <v-list-item-subtitle>Bs. {{pedido.total}}</v-list-item-subtitle>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-flex>
            
          </v-container>
        
      </v-flex>

      <v-flex md8>
        

          <v-container >
            <v-card >
              <v-card-title>
                <span style="margin-bottom: 30px;" class="headline">Detalle de pedido</span>
          
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                <v-layout wrap>
                <v-card
                  max-width="1000"
                  class="mx-auto"
                >
        
              <v-container>
                <v-row dense>
                 <v-col
                  v-for="(item, i) in pedido.detalles"
                  :key="i"
                  cols="12"
                  >
                    <v-card
                      :color="'#1F7087'"
                      dark
                    >
                  <div class="d-flex flex-no-wrap justify-space-between">
                    <div>
                      <v-card-title
                        class="headline"
                        v-text="item.producto.descripcion"
                      ></v-card-title>
                      <v-card-subtitle
                        class="headline"
                        v-text="item.producto.codigo"
                      ></v-card-subtitle>
      
                      <v-card-text v-text="'Cantidad: '+ item.cantidad"></v-card-text>
                      <v-card-text v-text="'Costo: '+ item.costo"></v-card-text>
                      <v-card-text v-text="'Comentario: '+ item.comentario"></v-card-text>
                    </div>
      
                    <v-avatar
                      class="ma-3"
                      size="125"
                      tile
                    >
                      <v-img :src="'http://localhost:3000/img/uploads/image-1590177477304.jpg'"></v-img>
                    </v-avatar>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card> 
                    </v-layout>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  
                  <div class="flex-grow-1"></div>
                    <div >
                      <v-btn outlined color="cyan darken-1" >Confirmar pedido</v-btn>
                      <v-btn outlined color="cyan darken-1" >Eliminar</v-btn>
                    </div>
                    
                </v-card-actions>

              </v-card>
          </v-container>


       
      </v-flex>
      
    </v-layout>
    
    
   
  </v-container>
  
  
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
const gradients = [
  ['#222'],
    ['#42b3f4'],
    ['red','orange','yelow'],
    ['purple','violet'],
    ['#00c6ff','#f0f','#ff0'],
    ['#f72047','#ffd200','#1feaea'],
]
export default {
 
  data : () => ({

    ///
    items: [
      {
        color: '#1F7087',
        src: 'https://cdn.vuetifyjs.com/images/cards/foster.jpg',
        title: 'Supermodel',
        artist: 'Foster the People',
      },
      {
        color: '#952175',
        src: 'https://cdn.vuetifyjs.com/images/cards/halcyon.png',
        title: 'Halcyon Days',
        artist: 'Ellie Goulding',
      },
    ],
    //
    ////
    with:2,
    radius:10,
    padding:8,
    lineCap:'round',
    gradient:gradients[5],
    value:[0,2,5,9,5,10,3,5,0,0,1,8,2,9,0],
    gradientDirection:'top',
    gradients,
    fill:false,
    type:'trend',
    autoLineWidth:false,
    arrayEvents:null,
    date2: new Date().toISOString().substr(0,10),
    ////

    dialogDetalle:false,
    pedido:null,
    detallePedido:null,
   
    
    pedidos: [
      {
          _id:1,
          cliente: 
            {nombre:'Juan Perez', nit:'12345678', ciudad:'Sucre', direccion:'calle loa 185', telefono:'6412345'}
          ,
          quienRecibe: 'Juan Perez',
          fechaEntrega: '26/05/2020',
          horaInicioRango: '8:00',
          horaFinRango: '12:00',
          transporte: 'Moto',
          detalles:[
            {
              producto:
              {
                descripcion:'licuadora plastico',
                codigo: 'hr2100',
              }, 
              cantidad:2, 
              costo:240, 
              comentario:'color negra'
            },
            {
              producto:
              {
                descripcion:'zumidora',
                codigo: 'hr1858',
              }, 
              cantidad:1, 
              costo:650,
              comentario:'tamaño grande'
            },
          ],
          total: 890
      },
      {
          _id:2,
          cliente: 
            {nombre:'Eliseo Lopez', nit:'12345678', ciudad:'Sucre', direccion:'calle loa 185', telefono:'6412345'}
          ,
          quienRecibe: 'Juan Perez',
          fechaEntrega: '26/05/2020',
          horaInicioRango: '8:00',
          horaFinRango: '14:00',
          transporte: 'Moto',
          detalles:[
            {producto:'Ollas', cantidad:1, costo:290},
            {producto:'cubiertos', cantidad:2, costo:280},
            {producto:'sarten 18 cm', cantidad:1, costo:60},
          ],
          total: 630
      },
      {
          _id:3,
          cliente: 
            {nombre:'Patricia Fernandez', nit:'12345678', ciudad:'Sucre', direccion:'calle loa 185', telefono:'6412345'}
          ,
          quienRecibe: 'Luis Fernandez',
          fechaEntrega: '26/05/2020',
          horaInicioRango: '13:00',
          horaFinRango: '15:00',
          transporte: 'Moto',
          detalles:[
            {producto:'Alisador', cantidad:1, costo:220},
            {producto:'Plancha de ropa', cantidad:1, costo:100},
            {producto:'sarten 18 cm', cantidad:1, costo:60},
          ],
          total: 380
      },
      {
          _id:4,
          cliente: 
            {nombre:'Patricia Fernandez', nit:'12345678', ciudad:'Sucre', direccion:'calle loa 185', telefono:'6412345'}
          ,
          quienRecibe: 'Luis Fernandez',
          fechaEntrega: '26/05/2020',
          horaInicioRango: '13:00',
          horaFinRango: '15:00',
          transporte: 'Moto',
          detalles:[
            {producto:'Alisador', cantidad:1, costo:220},
            {producto:'Plancha de ropa', cantidad:1, costo:100},
            {producto:'sarten 18 cm', cantidad:1, costo:60},
          ],
          total: 380
      },
      {
          _id:5,
          cliente: 
            {nombre:'Patricia Fernandez', nit:'12345678', ciudad:'Sucre', direccion:'calle loa 185', telefono:'6412345'}
          ,
          quienRecibe: 'Luis Fernandez',
          fechaEntrega: '26/05/2020',
          horaInicioRango: '13:00',
          horaFinRango: '15:00',
          transporte: 'Moto',
          detalles:[
            {producto:'Alisador', cantidad:1, costo:220},
            {producto:'Plancha de ropa', cantidad:1, costo:100},
            {producto:'sarten 18 cm', cantidad:1, costo:60},
          ],
          total: 380
      },
      {
          _id:6,
          cliente: 
            {nombre:'Patricia Fernandez', nit:'12345678', ciudad:'Sucre', direccion:'calle loa 185', telefono:'6412345'}
          ,
          quienRecibe: 'Luis Fernandez',
          fechaEntrega: '26/05/2020',
          horaInicioRango: '13:00',
          horaFinRango: '15:00',
          transporte: 'Moto',
          detalles:[
            {producto:'Alisador', cantidad:1, costo:220},
            {producto:'Plancha de ropa', cantidad:1, costo:100},
            {producto:'sarten 18 cm', cantidad:1, costo:60},
          ],
          total: 380
      },
      {
          _id:7,
          cliente: 
            {nombre:'Patricia Fernandez', nit:'12345678', ciudad:'Sucre', direccion:'calle loa 185', telefono:'6412345'}
          ,
          quienRecibe: 'Luis Fernandez',
          fechaEntrega: '26/05/2020',
          horaInicioRango: '13:00',
          horaFinRango: '15:00',
          transporte: 'Moto',
          detalles:[
            {producto:'Alisador', cantidad:1, costo:220},
            {producto:'Plancha de ropa', cantidad:1, costo:100},
            {producto:'sarten 18 cm', cantidad:1, costo:60},
          ],
          total: 380
      },
      {
          _id:8,
          cliente: 
            {nombre:'Patricia Fernandez', nit:'12345678', ciudad:'Sucre', direccion:'calle loa 185', telefono:'6412345'}
          ,
          quienRecibe: 'Luis Fernandez',
          fechaEntrega: '26/05/2020',
          horaInicioRango: '13:00',
          horaFinRango: '15:00',
          transporte: 'Moto',
          detalles:[
            {producto:'Alisador', cantidad:1, costo:220},
            {producto:'Plancha de ropa', cantidad:1, costo:100},
            {producto:'sarten 18 cm', cantidad:1, costo:60},
          ],
          total: 380
      },
      {
          _id:9,
          cliente: 
            {nombre:'Patricia Fernandez', nit:'12345678', ciudad:'Sucre', direccion:'calle loa 185', telefono:'6412345'}
          ,
          quienRecibe: 'Luis Fernandez',
          fechaEntrega: '26/05/2020',
          horaInicioRango: '13:00',
          horaFinRango: '15:00',
          transporte: 'Moto',
          detalles:[
            {producto:'Alisador', cantidad:1, costo:220},
            {producto:'Plancha de ropa', cantidad:1, costo:100},
            {producto:'sarten 18 cm', cantidad:1, costo:60},
          ],
          total: 380
      },
      {
          _id:10,
          cliente: 
            {nombre:'Patricia Fernandez', nit:'12345678', ciudad:'Sucre', direccion:'calle loa 185', telefono:'6412345'}
          ,
          quienRecibe: 'Luis Fernandez',
          fechaEntrega: '26/05/2020',
          horaInicioRango: '13:00',
          horaFinRango: '15:00',
          transporte: 'Moto',
          detalles:[
            {producto:'Alisador', cantidad:1, costo:220},
            {producto:'Plancha de ropa', cantidad:1, costo:100},
            {producto:'sarten 18 cm', cantidad:1, costo:60},
          ],
          total: 380
      },
      {
          _id:11,
          cliente: 
            {nombre:'Patricia Fernandez', nit:'12345678', ciudad:'Sucre', direccion:'calle loa 185', telefono:'6412345'}
          ,
          quienRecibe: 'Luis Fernandez',
          fechaEntrega: '26/05/2020',
          horaInicioRango: '13:00',
          horaFinRango: '15:00',
          transporte: 'Moto',
          detalles:[
            {producto:'Alisador', cantidad:1, costo:220},
            {producto:'Plancha de ropa', cantidad:1, costo:100},
            {producto:'sarten 18 cm', cantidad:1, costo:60},
          ],
          total: 380
      },
    ],

    
  }),
//
  computed:{
    theme(){
      return this.$vuetify.theme.dark ? "dark" : "light";
    }
  },
//


  created() {
      this.listar();
    },

    methods: {

      verDetallePedido(item){
        this.producto=item;
        this.detallePedido = item.detalles;
        console.log(this.detallePedido);
        this.dialogDetalle = true;
      },
      listar(){
      let me=this;
      axios.get('empresa/listActivas').then(function (response){
        me.empresas=response.data;
      }).catch(function(error){
        console.log(error);
      });
    },
      reserve () {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
      },
    },
}
</script>
<style scoped>
.rounded {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
}
</style>