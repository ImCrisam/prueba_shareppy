<template>
  <div>
    <h3>Compra</h3>
    <template v-for="(item, i) in data">
      <template v-if="item.state"> 
          <div :key="i">
            <h4>{{item.nombre}}</h4>
            <span>Cantidad: {{item.cantidadVenta}}</span>
            <span>Valor: {{item.cantidadVenta*item.valor}}</span>
          </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: this.$store.getters.compra,
    };
  },
  created() {
    
  },

  
};
</script>

<style></style>
