
import { defineStore } from 'pinia'

export const useFavouritesStore = defineStore('favourites', {
  state: () => ({
    favouriteItems: [],
  }),

  actions: {
    addToFavourites(product) {
      if (!this.isFavourite(product)) {
        this.favouriteItems.push(product)
      } else {
        this.removeFromFavourites(product)
      }
    },

    removeFromFavourites(product) {
      this.favouriteItems = this.favouriteItems.filter(item => item.id !== product.id)
    },

    isFavourite(product) {
      return this.favouriteItems.some(item => item.id === product.id)
    },
  },
})
