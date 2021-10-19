<template>
  <v-footer id="home-footer" color="black" dark min-height="72">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <div
            class="d-flex flex-wrap justify-md-start justify-center justify-md-none"
          >
            <template v-for="(s, i) in social">
              <a
                :key="s.title"
                class="white--text pa-1 pa-md-0"
                :href="s.url"
                target="_blank"
                v-text="s.title"
              />

              <v-responsive
                v-if="i < social.length - 1"
                :key="`divider-${s}`"
                class="mx-4 shrink hidden-sm-and-down"
                max-height="24"
              >
                <v-divider vertical />
              </v-responsive>
            </template>
          </div>
        </v-col>

        <v-col class="text-center text-md-right" cols="12" md="6">
          Copyright &copy; {{ new Date().getFullYear() }} Daoswap
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "HomeFooter",

  data: () => ({
    social: [
      {
        title: "Twitter",
        url: "https://twitter.com/Daoswapdex"
      },
      {
        title: "Email",
        url: "mailto:contact@daoswap.cc"
      }
    ]
  })
};
</script>

<style lang="sass">
#home-footer a
  text-decoration: none
</style>
