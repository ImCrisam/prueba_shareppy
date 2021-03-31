<template>
  <v-layout>


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
      roles: ["Administrador", "Usuario", "Operador"],
      rol: "",
      email: "",
      id: "",
      nombre: "",
      cedula: "",
      telefono: "",
      

      dialogAlert: false,
      textDialogAler: "",
      coloAlert: "",
      timeout: 2000,

      isloading: false,
      title: "Usuario",
      titles: "Usuarios",
      data: [],

      headers: [
        { text: "Email", value: "email", sortable: true, align: "center" },
        { text: "Nombre", value: "nombre", sortable: true, align: "center" },
        { text: "Cedula", value: "cedula", sortable: true, align: "center" },
        { text: "Telefono", value: "telefono", sortable: true, align: "center" },
        {
          text: "Rol",
          value: "rol",
          sortable: true,
          align: "center",
        },
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
      this.$router.push({
        name: "logup",
      });
    },
    edit(item) {
      this.id = item.id;
      this.dialog = true;
      this.email = item.email;
      this.rol = item.rol;
      this.nombre = item.nombre;
      this.cedula = item.cedula;
      this.telefono = item.telefono;
    },
    active(item, is) {
      firebase
        .firestore()
        .collection("user")
        .doc(item.id)
        .update({
          state: is,
        })
        .then(() => {
          var mensaje = "Usuario ";
          mensaje += is ? "Activado" : "Desactivado";
          this.openDialogResponse(true, mensaje);
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
        .collection("user")
        .get()
        .then((data) => {
          data.forEach((doc) => {
            this.data.push({
              id: doc.id,
              rol: doc.data().rol,
              nombre: doc.data().nombre,
              cedula: doc.data().cedula,
              telefono: doc.data().telefono,
              email: doc.data().email,
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
      firebase
        .firestore()
        .collection("user")
        .doc(this.id)
        .update({
          rol: this.rol,
          nombre: this.nombre,
          cedula: this.cedula,
          telefono: this.telefono,
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
    },

    cambioContra() {},
  },
};
</script>

<style></style>
