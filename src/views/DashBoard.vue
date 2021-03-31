<template>
  <div>
    <v-app id="sandbox">
      <v-navigation-drawer v-model="primaryDrawer.model" :clipped="true" app>
        <v-list dense class="py-0">
          <v-card align="center ">
            <v-card-text class="pb-0 pt-7">
              <v-row align="center" justify="space-around">
                <v-col class="py-0" cols="10">
                  <v-list-item>
                    <v-list-item-content class="text-center">
                      <v-list-item-title class="sub-title">
                        {{ getEmail }}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ getRol }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-row>
              <v-row align="center" justify="space-around">
                <v-col cols="6">
                  <v-btn tile color="error" small @click="salir">
                    <v-icon left> mdi-keyboard-backspace </v-icon>
                    Salir
                  </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn-toggle v-model="$vuetify.theme.dark" rounded small>
                    <v-btn small>
                      <v-icon>mdi-brightness-7</v-icon>
                    </v-btn>

                    <v-btn small>
                      <v-icon>mdi-brightness-4</v-icon>
                    </v-btn>
                  </v-btn-toggle>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-list>
        <v-row>
          <v-btn tile block color="error" class="mt-5" @click="vista">
            <v-icon left> mdi-eye-outline </v-icon>
            Vista
          </v-btn>
        </v-row>
        <v-list class="mt-5">
          <v-list-item
            v-for="(item, key) in menu"
            :key="key"
            :to="{ name: item.to }"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-title> {{ item.text }} </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar :clipped-left="true" app>
        <v-app-bar-nav-icon
          @click.stop="primaryDrawer.model = !primaryDrawer.model"
          :loading="isloading"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>Shareppy</v-toolbar-title>
      </v-app-bar>

      <v-main class="pa-4">
        <v-container>
          <v-slide-y-transition>
            <router-view />
          </v-slide-y-transition>
        </v-container>
      </v-main>

      <v-footer app class="justify-center">
        <span class="px-4 text-center">&copy; {{ 2021 }}</span>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
export default {
  name: "DashBoard",
  data() {
    return {
      primaryDrawer: {
        model: null,
        type: "default (no property)",
      },
      menu: [
        { to: "usuarios", text: "Usuarios", icon: "mdi-table-account" },
        { to: "productos", text: "Productos", icon: "mdi-table" },
      ],

      isloading: false,
    };
  },
  computed: {
    getRol() {
      return this.$store.getters.rol;
    },
    getEmail() {
      return this.$store.getters.user.email;
    },
  },

  methods: {
    salir() {
      this.$store.commit("setUser", null);
      this.$store.commit("setAdmin", null);
      this.$router.push({ name: "home" });
    },
    vista() {
      this.$router.push({
        name: "View",
      });
    },
  },
};
</script>

<style></style>
