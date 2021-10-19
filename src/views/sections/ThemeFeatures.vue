<template>
  <base-section id="theme-features">
    <base-section-heading title="DAOSWAP Roadmap">
      DAO and NFT must lay a good financial foundation. The following three
      steps of dreaming cannot be missing.
    </base-section-heading>

    <v-container>
      <v-row>
        <v-col v-for="(feature, i) in features" :key="i" cols="12" md="4">
          <base-avatar-card v-bind="feature" align="left" horizontal>
            DAO and NFT must lay a good financial foundation. The following
            three steps of dreaming cannot be missing.
          </base-avatar-card>
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
export default {
  name: "SectionThemeFeatures",

  data: () => ({
    features: [
      {
        title: "DEX",
        icon: "mdi-swap-horizontal",
        text:
          "DEX to pave the way for a decentralized financial base more conducive to NFT, DAO organizations."
      },
      {
        title: "NFT",
        icon: "mdi-cube-outline",
        text:
          "Compatible with the full range of assets such as NFT to expand the financial base."
      },
      {
        title: "DAO",
        icon: "mdi-vector-link",
        text:
          "Provide DAO organizations with innovative contribution that is mining mechanism to achieve listing before starting a business, what you do is what you get."
      }
    ]
  })
};
</script>
