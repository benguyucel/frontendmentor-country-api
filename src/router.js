import Home from "./pages/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import CountryDetail from "./components/CountryDetail.vue";
import {useCountryStore} from "../store/country.js";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:alphaCode",
    name: "Country",
    component: CountryDetail
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
