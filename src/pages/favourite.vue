<template>
  <v-container v-if="favourites.length > 0">
    <v-row>
      <v-col md="4" v-for="product in favourites" :key="product.id">
        <v-card class="pa-4">
          <img :src="product.image" :alt="product.name">
          <h3>Name: {{ product.name }}</h3>
          <p>Price: {{ product.price }}</p>

          <v-btn @click="removeFromFavourites(product)" color="red">Remove from Favourites</v-btn>
          <v-btn v-if="!isInCart(product)" @click="addToCart(product)" color="green" class="mt-2">
            Add to Cart
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div v-else>No Items Favourited</div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useFavouritesStore } from '@/stores/favourites'


const cartStore = useCartStore()
const favouritesStore = useFavouritesStore()


const favourites = computed(() => favouritesStore.favouriteItems)
const isInCart = (product) => cartStore.isInCart(product)


const addToCart = (product) => {
  cartStore.addToCart(product)
}

const removeFromFavourites = (product) => {
  favouritesStore.removeFromFavourites(product)
}
</script>
