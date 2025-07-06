  <template>
    <div class="xl:w-7xl mx-auto mt-10 px-4 xl:px-0" v-if="!countryStore.countryIsLoading && countryStore.country">
      <RouterLink to="/"
        class="w-30  text-sm py-4 gap-3  flex items-center justify-center text-text bg-background shadow-[0px_0px_10px_4px_rgba(0,_0,_0,_0.1)] ">
        <ArrowLeftIcon class="h-4 w-4" />
        <span>Back</span>
      </RouterLink>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-30 mt-20 sm:gap-40">
        <img :src="countryStore.country?.flags?.svg" :alt="countryStore.country.name" />
        <div class="pt-0 sm:pt-10">
          <h1 class="text-text text-2xl font-bold ">{{ countryStore.country.name }}</h1>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-5">
            <div class="flex flex-col gap-y-2">
              <p class="text-text flex gap-3">
                <span class="font-semibold text-md ">Native Name :</span>
                <span class="font-light">{{ countryStore.country.nativeName }}</span>
              </p>
              <p class="text-text flex gap-3">
                <span class="font-semibold text-md ">Population :</span>
                <span class="font-light">{{ countryStore.country.population.toLocaleString() }}</span>
              </p>
              <p class="text-text flex gap-3">
                <span class="font-semibold text-md ">Region :</span>
                <span class="font-light">{{ countryStore.country.region }}</span>
              </p>
              <p class="text-text flex gap-3">
                <span class="font-semibold text-md ">Sub Region :</span>
                <span class="font-light">{{ countryStore.country.subregion }}</span>
              </p>
              <p class="text-text flex gap-3">
                <span class="font-semibold text-md ">Capital :</span>
                <span class="font-light">{{ countryStore.country.capital }}</span>
              </p>
            </div>
            <div class="flex flex-col gap-y-2">
              <p class="text-text flex gap-3">
                <span class="font-semibold text-md ">Top Level Domain :</span>
                <span class="font-light">{{ countryStore.country.topLevelDomain[0] }}</span>
              </p>
              <p class="text-text flex gap-3">
                <span class="font-semibold text-md ">Curencies :</span>
                <span class="font-light">{{ countryStore.country.currencies[0].name }}</span>
              </p>
              <p class="text-text flex gap-3">
                <span class="font-semibold text-md ">Languages :</span>
                <span class="font-light">{{countryStore.country.languages.map(item => item.name).join(',')}}</span>
              </p>
            </div>
          </div>
          <div class="text-text mt-2 flex gap-5 w-full">
            <span class="font-semibold shrink-0">Border Countries:</span>
            <div class="flex items-center gap-2 flex-wrap gap-y-5">
              <template v-if="countryStore.country.borders && countryStore.country.borders.length">
                <RouterLink v-for="border in countryStore.country.borders" :key="border"
                  :to="{ name: 'Country', params: { alphaCode: border } }"
                  class="text-sm px-6 py-2 bg-background shadow-md flex-wrap">
                  {{ countryStore.countryAlpaCodeToName()[border] }}
                </RouterLink>

              </template>

            </div>
          </div>
        </div>

      </div>
    </div>
  </template>
<script setup>
import ArrowLeftIcon from "./icons/ArrowLeftIcon.vue";
import { useRoute } from "vue-router";
import { useCountryStore } from "../../store/country.js";
import { watch } from "vue";

const route = useRoute()
const { alphaCode } = route.params
const countryStore = useCountryStore()
countryStore.getCountry(alphaCode)
watch(() => route.params, async (newCode) => {
  countryStore.getCountry(route.params.alphaCode)
})

</script>