<template>
    <v-container>
        <v-layout row wrap>
            <v-flex  xs12 sm6 v-for="empresa in empresas" :key="empresa._id">
            <v-card
            :loading="loading"
            class="mx-auto my-12"
            max-width="500"
            >
            <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>

            <v-card-title>{{empresa.nombre}}</v-card-title>

            <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">4.5 (413)</div>
                </v-row>

                <div class="my-4 subtitle-1">
                   <b>Categoria</b> 
                </div>

                <div>Ciudad: {{empresa.ciudad}}</div>
                <div>Dirección {{empresa.direccion}}</div>
                <div>Teléfono: {{empresa.telefono}}</div>
            </v-card-text>

                <v-divider class="mx-4"></v-divider>

                <v-card-actions>
                <v-btn
                    color="deep-purple lighten-2"
                    text
                    @click="reserve"
                >
                    Ver productos
                </v-btn>
                </v-card-actions>
                </v-card>
            </v-flex>        
        </v-layout> 
        
        
    </v-container>
</template>
<script>
  import axios from 'axios';
  export default {
    data: () => ({
      loading: false,
      selection: 1,
      empresas:[]
    }),

    created() {
      this.listar();
    },

    methods: {
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