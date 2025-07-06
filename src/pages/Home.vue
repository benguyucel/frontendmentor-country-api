<script setup>
import SearchIcon from "../components/icons/SearchIcon.vue";
import ArrowUpIcon from "../components/icons/ArrowUpIcon.vue";
import ArrowDownIcon from "../components/icons/ArrowDownIcon.vue";
import {useDebounceFn} from "@vueuse/core";
import {onMounted, ref} from "vue";
import {useCountryStore} from "../../store/country.js";
import SpinnerIcon from "../components/SpinnerIcon.vue";

const countryStore = useCountryStore()
const isOpenDropdown = ref(false)
const localSearchQuery = ref('')

const handleDropdownSelect = (region) => {
  countryStore.setSelectedRegion(region);
  isOpenDropdown.value = false;
};
const debouncedSearch = useDebounceFn(() => {
  countryStore.setSearchQuery(localSearchQuery.value)
}, 500)
onMounted(() => {
  countryStore.fetchCountries()
})
</script>
<template>
  <main class="flex px-4 xl:px-0 text-text">
    <div class="w-7xl mx-auto">
      <div class="w-full flex-row  gap-10 sm:flex items-center justify-between">
        <div class="py-12 w-full">
          <div class="sm:max-w-[500px] flex items-center px-4 shadow-sm">
            <SearchIcon class="h-6 w-6"/>
            <input @input="debouncedSearch" type="text" name="search" v-model="localSearchQuery"
                   class="w-full  py-4 outline-0 indent-6 placeholder:text-text placeholder:text-sm"
                   placeholder="Search for a country..."/>
          </div>
        </div>
        <div class="flex-col text-right relative">
          <div class="min-w-50 text-center">
            <div @click="isOpenDropdown = !isOpenDropdown"
                 class="cursor-pointer  bg-elements  flex items-center justify-between px-6 shadow-md py-6 rounded-md">
              <span class="text-sm">{{ countryStore.selectedRegion || 'Select by Region' }}</span>
              <ArrowDownIcon class="h-4 w-4" v-if="isOpenDropdown"/>
              <ArrowUpIcon class="h-4 w-4" v-if="!isOpenDropdown"/>
            </div>
          </div>
          <div class="absolute z-50 mt-1 w-full" v-if="isOpenDropdown">
            <ul class="bg-elements rounded-sm text-left py-2 shadow-md w-full">
              <li @click="handleDropdownSelect(region.label)"
                  class="mb-2 hover:bg-background  px-6 py-1 cursor-pointer"
                  v-for="(region, index) in countryStore.regions" :key="index">
                {{ region.label }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Countries  -->
      <SpinnerIcon class="text-center" v-if="countryStore.countriesIsLoading"/>
      <div v-if="!countryStore.countriesIsLoading"
           class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-10 md:mt-0 md:gap-10 bg-background">
        <div v-for="(country, index) in countryStore.filteredCountries" :key="index"
             class="bg-background shadow-md">
          <RouterLink :to="{name:'Country',params:{alphaCode:country.alpha3Code}}">
            <img :src="country.flags.svg" :alt="country.name">
            <div class="py-6 px-6">
              <h1 class="text-md font-bold mb-10">{{ country.name }}</h1>
              <p class="text-sm mb-2"><span class="font-semibold">Population :</span> <span
                  class="font-thin">{{
                  country.population.toLocaleString()
                }}</span></p>
              <p class="text-sm mb-2"><span class="font-semibold">Region :</span> <span class="font-thin">{{
                  country.region
                }}</span></p>
              <p class="text-sm mb-2"><span class="font-semibold">Capital :</span> <span class="font-thin">{{
                  country.capital
                }}</span>
              </p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>