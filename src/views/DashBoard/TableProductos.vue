<template>
  <v-layout>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title>
          <span class="headline">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 md6>
                <v-text-field
                  name="Nombres"
                  label="Nombres"
                  id="Nombres"
                  v-model="nombre"
                ></v-text-field>
              </v-flex>
              <v-flex xs12 md6>
                <v-text-field
                  name="cantidad"
                  label="cantidad"
                  id="cantidad"
                  v-model="cantidad"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  name="valor"
                  label="valor"
                  id="valor"
                  v-model="valor"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">Cancelar</v-btn>
          <v-btn color="primary" @click="dialogAcepter">{{
            isNew ? "Agregar" : "Actualizar"
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="dialogAlert"
      :timeout="timeout"
      center
      shaped
      bottom
      right
      transition="slide-y-reverse-transition"
      :color="coloAlert"
    >
      <div class="text-center title text">
        {{ textDialogAler }}
      </div>

      <template v-slot:action="{ attrs }">
        <v-btn
          small
          icon
          class="elevation-0"
          v-bind="attrs"
          @click="snackbar = dialogAlert"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <data-table-base
      :title="titles"
      :data="data"
      :headers="headers"
      :isloading="isloading"
      @reroll="reroll"
      @add="add"
      @edit="edit"
      @active="active"
      @delete="borrar"
    >
    </data-table-base>
  </v-layout>
</template>

<script>
import DataTableBase from "@/components/DataTableBase.vue";
import firebase from "firebase/app";
export default {
  components: {
    DataTableBase,
  },
  data() {
    return {
      dialog: false,
      id: "",
      nombre: "",
      cantidad: "",
      valor: "",
      isNew: false,

      dialogAlert: false,
      textDialogAler: "",
      coloAlert: "",
      timeout: 2000,

      isloading: false,
      title: "Producto",
      titles: "Productos",
      data: [],

      headers: [
        { text: "Nombre", value: "nombre", sortable: true, align: "center" },
        {
          text: "Cantidad",
          value: "cantidad",
          sortable: true,
          align: "center",
        },
        { text: "Valor", value: "valor", sortable: true, align: "center" },
        {
          text: "Estado",
          value: "state",
          sortable: true,
          align: "center",
        },
        {
          text: "Opciones",
          value: "opciones",
          sortable: false,
          align: "center",
        },
        {
          text: "Borrar Disabled",
          value: "borrar",
          sortable: false,
          align: "center",
        },
      ],
    };
  },

  created() {
    this.listar();
  },
  methods: {
    reroll() {
      this.listar();
    },
    add() {
      this.isNew = true;
      this.dialog = true;
      this.id = "";
      this.nombre = "";
      this.cantidad = "";
      this.valor = "";
    },
    edit(item) {
      this.isNew = false;
      this.id = item.id;
      this.dialog = true;
      this.nombre = item.nombre;
      this.cantidad = item.cantidad;
      this.valor = item.valor;
    },
    active(item, is) {
      firebase
        .firestore()
        .collection("products")
        .doc(item.id)
        .update({
          state: is,
        })
        .then(() => {
          var mensaje = "Producto ";
          mensaje += is ? "Activado" : "Desactivado";
          this.openDialogResponse(true, mensaje);
        })
        .catch((error) => {
          this.openDialogResponse(false, "Error");
          console.log(error);
        });
    },
    borrar(item) {
      firebase
        .firestore()
        .collection("products")
        .doc(item.id)
        .delete()
        .then(() => {
          this.openDialogResponse(true, "Producto borrado");
        })
        .catch((error) => {
          this.openDialogResponse(false, "Error");
          console.log(error);
        });
    },
    openDialogResponse(type, mensaje) {
      this.listar();
      this.textDialogAler = mensaje;
      this.coloAlert = type ? "accent" : "error";
      this.isloading = false;
      this.dialogAlert = true;
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
              state: doc.data().state,
            });
          });
          this.isloading = false;
        })
        .catch((error) => {
          this.isloading = false;
        });
    },
    dialogAcepter() {
      if (this.isNew) {
        firebase
          .firestore()
          .collection("products")
          .add({
            nombre: this.nombre,
            cantidad: this.cantidad,
            valor: this.valor,
            state: true
          })
          .then(() => {
            this.openDialogResponse(true, "Creado");
            this.dialog = false;
          })
          .catch((error) => {
            this.openDialogResponse(false, "Error");
            this.dialog = false;
            console.log(error);
          });
      } else {
        firebase
          .firestore()
          .collection("products")
          .doc(this.id)
          .update({
            nombre: this.nombre,
            cantidad: this.cantidad,
            valor: this.valor,
          })
          .then(() => {
            this.openDialogResponse(true, "actualizado");
            this.dialog = false;
          })
          .catch((error) => {
            this.openDialogResponse(false, "Error");
            this.dialog = false;
            console.log(error);
          });
      }
    },
  },
};
</script>

<style></style>
