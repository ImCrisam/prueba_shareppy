<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignup">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="E-mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                   <v-flex xs12>
                <v-select
                  v-model="rol"
                  :items="roles"
                  label="Rol"
                  item-text="nombre"
                  persistent-hint
                  return-object
                  single-line
                >
                </v-select>
                   </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                      :rules="[minPasswords]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Validate Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout class="mt-5">
                  <v-flex xs12 class="">
                    <v-btn @click="$router.go(-1)">cancelar</v-btn>
                  </v-flex>
                  <v-flex xs12 class="">
                    <v-btn
                      type="submit"
                      block
                      color="primary"
                      :loading="loading"
                      >Register</v-btn
                    >
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase/app";
export default {
  data() {
    return {
      roles: ["Administrador", "Usuario", "Operador"],
      rol: "",
      email: "",
      password: "",
      confirmPassword: "",
      loading: false,
      error: "",
    };
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword
        ? "Contraseña debe ser iguales"
        : true;
    },
    minPasswords() {
      return this.password.length < 6 ? "Min 6 caracteres" : true;
    },
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    onSignup() {
      this.loading = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((auth) => {
          firebase
            .firestore()
            .collection("user")
            .doc(auth.user.uid)
            .set({
              email: auth.user.email,
              rol: this.rol,
              state: true,
            })
            .then((message) => {
              this.loading = false;
              this.$router.go(-1);
            })
            .catch((error) => {
              console.log("erro doc " + error);
              this.loading = false;
            });
        })
        .catch((error) => {
          console.log("auth erro" + error);
          this.loading = false;
        });
    },
  },
};
</script>
