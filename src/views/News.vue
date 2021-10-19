<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-timeline>
          <v-timeline-item
            v-for="(item, i) in list"
            :key="i"
            :color="item.color"
            small
          >
            <template v-slot:opposite>
              <span
                :class="`headline font-weight-bold ${item.color}--text`"
                v-text="item.time"
              ></span>
            </template>
            <div class="py-4">
              <h2
                :class="`headline font-weight-light mb-4 ${item.color}--text`"
              >
                {{ item.title }}
              </h2>
              <div>
                {{ item.content }}
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "News",
  data: () => ({
    list: [
      {
        color: "cyan",
        time: "2021/06/28",
        title: "Test News 001",
        content:
          "Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001"
      },
      {
        color: "green",
        time: "2021/06/28",
        title: "Test News 001",
        content:
          "Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001"
      },
      {
        color: "pink",
        time: "2021/06/28",
        title: "Test News 001",
        content:
          "Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001"
      },
      {
        color: "amber",
        time: "2021/06/28",
        title: "Test News 001",
        content:
          "Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001"
      },
      {
        color: "orange",
        time: "2021/06/28",
        title: "Test News 001",
        content:
          "Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001Test News 001"
      }
    ]
  })
};
</script>
