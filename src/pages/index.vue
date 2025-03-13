<template>
  <v-container class="h-100">
    <v-row>
      <v-col md="3">
        <v-card>
          <v-card-title>
            Фильтры
          </v-card-title>
          <v-card-text>
            <div v-if="flags.isLoading" v-for="i in 5" :key="i">
              <v-skeleton-loader type="list-item" :lines="5" />
            </div>
            <div v-for="(category, index) in categories" :key="index">
              <v-checkbox :label="category" v-model="selectedCategories" :value="category" hide-details></v-checkbox>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col md="9">
        <div>
          Все товары
          <v-row class="mt-2">
            <v-col v-if="flags.isLoading" md="4" v-for="i in 6" :key="i">
              <v-skeleton-loader type="card"></v-skeleton-loader>
            </v-col>
            <v-col md="4" v-for="product in filteredProducts" :key="product.id">
              <v-card class="pa-4">
                <img :src="product.image" :alt="product.name">
                <h3>Name: {{ product.name }}</h3>
                <p>Price: {{ product.price }} KZT</p>
                <p>Category: {{ product.category }}</p>

                
                <v-btn class="mr-2 my-2" @click="favouriteItem(product)" :color="isFavourite(product) ? 'pink' : 'default'">
                  {{ isFavourite(product) ? 'Added to Favourites' : 'Favourite the product' }}
                </v-btn>
                <v-btn class="mr-2 my-2" @click="addToCart(product)" :color="isInCart(product) ? 'green' : 'default'">
                  {{ isInCart(product) ? 'Added to Cart' : 'Add to Cart' }}
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import useProducts from '@/composables/useProducts'
import { useFavouritesStore } from '@/stores/favourites'
import { useCartStore } from '@/stores/cart'

const { flags, products, getAllProducts } = useProducts()

const selectedCategories = ref([])

onMounted(async () => {
  await getAllProducts()
})

const categories = computed(() => {
  const uniqueCategories = new Set(products.value.map(product => product.category))
  return [...uniqueCategories]
})

const filteredProducts = computed(() => {
  if (selectedCategories.value.length === 0) {
    return products.value
  }
  return products.value.filter(product => selectedCategories.value.includes(product.category))
})


const favouritesStore = useFavouritesStore()
const cartStore = useCartStore()


const favouriteItem = (product) => {
  favouritesStore.addToFavourites(product)
}

const addToCart = (product) => {
  cartStore.addToCart(product)
}


const isFavourite = (product) => favouritesStore.isFavourite(product)
const isInCart = (product) => cartStore.isInCart(product)
</script>
