<template>
  <base-section id="features" class="secondary">
    <v-responsive class="mx-auto" max-width="1350">
      <v-container fluid>
        <v-row>
          <v-col
            v-for="card in cards"
            :key="card.title"
            cols="12"
            sm="4"
            md="3"
          >
            <base-info-card align="center" dark v-bind="card" />
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>
  </base-section>
</template>

<script>
export default {
  name: "SectionFeatures",

  data: () => ({
    cards: [
      {
        icon: "mdi-chart-timeline-variant",
        title: "Multi-chain",
        text:
          "Ethernet main network is the main one, integrating HECO, BSC, and the latest layer 2 technology to provide full chain ecological services."
      },
      {
        icon: "mdi-chart-areaspline",
        title: "For Digital Eco",
        text:
          "The first automatic liquidity ALP model, compatible with the governance of DAO projects, the flow of NFT, tapping the long tail demand of Defi, and truly serving the entity's native digital economy."
      },
      {
        icon: "mdi-rocket-launch-outline",
        title: "Efficient and low cost",
        text:
          "Achieve centralized efficiency and decentralized security, with fees as low as 0.01 USDT."
      },
      {
        icon: "mdi-vector-link",
        title: "DAO",
        text:
          "The project runs in community autonomy mode, all code is open source and published, and the whole chain is decentralized."
      }
    ]
  })
};
</script>
