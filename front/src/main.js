import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import App from "./App.vue";
import router from "./router";
import axios from "axios"; 
import "./assets/main.css";

library.add(fas);
const app = createApp(App);

app.use(router);
app.component("fontAwesome", FontAwesomeIcon);
app.mount("#app");
