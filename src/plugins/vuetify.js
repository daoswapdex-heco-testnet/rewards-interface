import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import i18n from "./i18n";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  },
  theme: {
    dark: false,
    themes: {
      light: {
        primary: "#93B954",
        secondary: "#050B1F",
        accent: "#204165"
      },
      dark: {
        primary: "#50778D",
        secondary: "#0B1C3D",
        accent: "#204165"
      }
    }
  }
});
