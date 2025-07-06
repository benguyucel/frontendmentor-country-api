import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCountryStore = defineStore("country", () => {
  const countries = ref([]);
  const selectedRegion = ref(null);
  const searchQuery = ref(null);
  const countriesIsLoading = ref(false);
  const countryIsLoading = ref(false);

  const country = ref({});
  const regions = ref([
    { label: "Africa" },
    { label: "Americas" },
    { label: "Asia" },
    { label: "Europe" },
    { label: "Oceania" },
  ]);
  const getCountry = async (alphaCode) => {
    countryIsLoading.value = true;
    if (countries.value.length === 0) {
      await fetchCountries();
    }
    const foundCountry = countries.value.find(
      (item) => item.alpha3Code === alphaCode
    );
    country.value = foundCountry || {};
    countryIsLoading.value = false;
  };
  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  async function fetchCountries() {
    countriesIsLoading.value = true;
    const response = await fetch("data.json");
    countries.value = await response.json();
    countriesIsLoading.value = false;
  }

  const setSelectedRegion = (region) => {
    selectedRegion.value = region;
  };
  const filteredCountries = computed(() => {
    let filtered = countries.value;
    if (selectedRegion.value != null) {
      filtered = countries.value.filter(
        (item) => item.region === selectedRegion.value
      );
    }
    if (searchQuery.value) {
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    }
    return filtered;
  });

  const countryAlpaCodeToName =  () => {
    const countryMap = {};
    countries.value.forEach((country) => {
      countryMap[country.alpha3Code] = country.name;
    });
    return countryMap;
  };
  return {
    countries,
    country,
    fetchCountries,
    regions,
    setSelectedRegion,
    selectedRegion,
    filteredCountries,
    searchQuery,
    setSearchQuery,
    getCountry,
    countriesIsLoading,
    countryIsLoading,
    countryAlpaCodeToName,
  };
});
