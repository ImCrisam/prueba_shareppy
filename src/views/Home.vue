<template>
  <div class="home mt-10">
    <signin />
  </div>
</template>

<script>
// @ is an alias to /src
import Signin from '@/components/Signin.vue'

export default {
  name: 'Home',
  components: {
     Signin,
  }
}
</script>
