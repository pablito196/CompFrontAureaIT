<template>
  <v-container>
    <v-layout align-start>
    <v-flex>
      <div >
        <h1 class="subheading grey--text">Pedidos pendientes</h1>
        <v-container >
          <v-layout row wrap>
            
            
            <v-flex xs12 sm6 md4 lg3
              
              v-for="pedido in pedidos" :key="pedido._id"
            >
         
              <v-card class="ma-3">
                <v-list-item  >
                  <v-list-item-avatar
                    tile
                    class="mt-n7"
                  >
                    <v-sheet color="#03A9F4" width="80" height="80" elevation="10">
                          <v-icon dark large>store</v-icon>
                    </v-sheet>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <div class="overline text-right">Total</div>
                    <v-list-item-title class="headline mb-1 text-right" >{{pedido.total}}</v-list-item-title>
                    <div><v-divider></v-divider></div>
                  </v-list-item-content> 
                </v-list-item>
                <v-card-text>
                  <v-icon >person </v-icon> Cliente: {{pedido.cliente.nombre}} <br>
                  <v-icon>emoji_people</v-icon> Recibe: {{pedido.quienRecibe}} <br>
                  <v-icon>location_on</v-icon> Ciudad: {{pedido.cliente.ciudad}} <br>
                  <v-icon>import_contacts</v-icon> Dirección: {{pedido.cliente.direccion}} <br>
                  <v-icon>phone</v-icon> Teléfono: {{pedido.cliente.telefono}} <br>
                  <v-icon>event_note</v-icon> Fecha de entrega: {{pedido.fechaEntrega}} <br>
                </v-card-text>
               
                <v-card-actions>
                        <v-btn outlined color="red" @click="verDetallePedido(pedido)">
                            <v-icon small left >shopping_cart</v-icon>
                            <span>Ver detalle</span>
                        </v-btn>
                    </v-card-actions>
              </v-card>
            </v-flex>
         
          
            
          
          </v-layout>
        </v-container>
      </div>
    </v-flex>
    
    <v-dialog v-model="dialogDetalle" max-width="700px">
              
    <v-card>
        <v-card-title>
                  <span style="margin-bottom: 40px;" class="headline">Detalle de pedido</span>
                </v-card-title>

                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                         <v-card
      max-width="550"
      class="mx-auto"
    >
        
      <v-container>
        <v-row dense>
         
  
          <v-col
            v-for="(item, i) in detallePedido"
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
                      <v-btn color="blue darken-1" >Cancelar</v-btn>
                      <v-btn color="blue darken-1" >Eliminar</v-btn>
                    </div>
                    
                </v-card-actions>

              </v-card>
            </v-dialog>



  </v-layout>
  </v-container>
  
  
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
 
  data : () => ({

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