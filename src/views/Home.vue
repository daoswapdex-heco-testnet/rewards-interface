<template>
  <v-card
    class="d-flex justify-center align-center"
    color="grey lighten-2"
    flat
    height="100%"
    tile
  >
    Hello Daoswap!!!
    <br />
    {{ address }}
  </v-card>
</template>

<script>
export default {
  name: "Home",
  data: () => ({
    //
  }),
  computed: {
    address() {
      return this.$store.state.web3.address;
    }
  }
};
</script>
