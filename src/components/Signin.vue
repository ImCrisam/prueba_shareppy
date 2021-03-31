<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form>
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
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout class="mt-5">
                  <v-flex xs12 class="ma-auto">
                    <v-btn v-on:click="$router.push({ name: 'logup' })"
                      >Registrarse</v-btn
                    >
                  </v-flex>
                  <v-flex xs12 class="ma-auto">
                    <v-btn
                      v-on:click="onSignin"
                      color="primary"
                      block
                      :loading="loading"
                      >Entrar</v-btn
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
      email: "",
      password: "",
      loading: false,
      error: "",
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  methods: {
    onSignin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((auth) => {
          firebase
            .firestore()
            .collection("user")
            .doc(auth.user.uid)
            .get()
            .then((doc) => {
              if (doc.exists && doc.data().state) {
                this.$store.commit("setUser", auth.user);
                this.$store.commit("setAdmin", doc.data().admin);
                if (doc.data().admin) {
                  /* router.push({
                    name: "Importaciones",
                  }); */
                  console.log("entra admin");
                } else {
                  /* router.push({
                    name: "View",
                  }); */
                  console.log("entra user");
                }
              } else {
                if (!doc.data().state) {
                  console.log("usuario no Activo");
                } else {
                  console.log("usuario no Existe");
                }
              }
              this.loading = false;
            })
            .catch((error) => {
              this.loading = false;
            });
        });
    },
  },
};
</script>
