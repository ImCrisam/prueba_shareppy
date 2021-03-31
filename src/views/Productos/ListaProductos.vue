<template>
      <div>
        
        <template v-for="(item, i) in data">
          <template v-if="item.state">
            <v-card   class="ma-2" :key="i">
                <h3 class="text-center">{{ item.nombre }}</h3>
                <h4 class="text-center">{{ item.valor }}</h4>
                <v-slider
                :v-model="item.cantidadVenta"
                  label="Cantidad"
                  thumb-color="blue"
                  thumb-label="always"
                  :max="item.cantidad"
                ></v-slider>
            </v-card>
          </template>
        </template>
        <v-btn block @click="comprar()">Comprar</v-btn>
      </div>
</template>

<script>
import firebase from "firebase/app";

export default {
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.listar();
  },
  methods: {
    comprar() {
    console.log(this.data[0].cantidadVenta)
       this.$store.commit("setCompra", this.data);
       //this.$router.push({ name: "confirmar" });
    },

    listar() {
      this.isloading = true;
      this.data = [];
      firebase
        .firestore()
        .collection("products")
        .get()
        .then((data) => {
          data.forEach((doc) => {
            this.data.push({
              id: doc.id,
              nombre: doc.data().nombre,
              cantidad: doc.data().cantidad,
              valor: doc.data().valor,
              cantidadVenta: 0,
              state: doc.data().state,
            });
          });
          this.isloading = false;
        })
        .catch((error) => {
          this.isloading = false;
        });
    },
  },
};
</script>

<style></style>
