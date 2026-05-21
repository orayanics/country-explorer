export const useFavoritesStore = defineStore("favorites", () => {
  const favorites = ref<string[]>([]);
  const isFavorite = (country: string) => favorites.value.includes(country);

  function addFavorite(country: string) {
    if (!favorites.value.includes(country)) {
      favorites.value.push(country);
    }
  }

  function removeFavorite(country: string) {
    favorites.value = favorites.value.filter((c) => c !== country);
  }

  return {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
  };
});
