<template>
  <v-flex>
    <v-toolbar d-flex class="elevation-2">
      <v-btn
        color="warning"
        fab
        small
        class="elevation-0"
        @click="$emit('reroll')"
        :loading="isloading"
        ><v-icon>mdi-update</v-icon></v-btn
      >
      <v-spacer></v-spacer>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-text-field
        class="text-xs-center"
        v-model="buscar"
        append-icon="mdi-magnify"
        label="Búsqueda"
        single-line
        hide-details
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn
        color="primary"
        fab
        small
        class="elevation-0"
        @click="$emit('add')"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="data"
      :search="buscar"
      :loading="isloading"
      class="elevation-1"
    >
      <template v-slot:[`item.rol`]="{ item }" class="text-center">
        <span
          :class="
            item.rol == 'Administrador' ? 'primary--text' : 'succes--text'
          "
          >{{ item.rol }}</span
        >
      </template>
      <template v-slot:[`item.opciones`]="{ item }">
        <v-icon class="mr-2" @click="$emit('edit', item)" color="accent">
          mdi-pencil-circle-outline</v-icon
        >

        <v-icon
          v-if="item.state"
          color="error"
          @click="$emit('active', item, false)"
        >
          mdi-close-circle-outline
        </v-icon>

        <v-icon v-else color="success" @click="$emit('active', item, true)">
          mdi-checkbox-marked-circle-outline
        </v-icon>
      </template>
      <template v-slot:[`item.borrar`]="{ item }">
        <v-icon class="mr-2" @click="/*$emit('delete', item)*/" color="blue-grey">
          mdi-delete-circle-outline</v-icon
        >
      </template>
      <template v-slot:[`item.state`]="{ item }">
        <div v-if="item.state">
          <span class="success--text">Activo</span>
        </div>
        <div v-else>
          <span class="error--text">Inactivo</span>
        </div>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
export default {
  props: {
    title: String,
    data: Array,
    headers: Array,
    isloading: Boolean,
  },
  data() {
    return {
      buscar: "",
    };
  },
};
</script>

<style></style>
