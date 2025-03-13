<template>
  <v-container v-if="cart.length > 0">
    <v-row>
      <v-col md="4" v-for="product in cart" :key="product.id">
        <v-card class="pa-4">
          <img :src="product.image" :alt="product.name">
          <h3>Name: {{ product.name }}</h3>
          <p>Price: {{ product.price }}</p>

        
          <v-btn @click="decreaseQuantity(product)" :disabled="product.quantity === 1" color="red" class="mr-2">
            -
          </v-btn>
          <span>{{ product.quantity }}</span>
          <v-btn @click="increaseQuantity(product)" color="green" class="ml-2">
            +
          </v-btn>

          <v-btn @click="removeFromCart(product)" color="red">Remove from Cart</v-btn>
        </v-card>
      </v-col>
    </v-row>

  
    <v-row class="mt-4">
      <v-col class="text-right">
        <v-btn disabled color="primary">Total: {{ totalPrice.toFixed(2) }} KZT</v-btn>
      </v-col>
    </v-row>

  </v-container>
  <div v-else>No Items in the Cart</div>
</template>

<script setup>
import { computed } from 'vue'
import { useCartStore } from '@/stores/cart'


const cartStore = useCartStore()


const cart = computed(() => cartStore.cartItems)


const increaseQuantity = (product) => {
  cartStore.increaseQuantity(product)
}

const decreaseQuantity = (product) => {
  cartStore.decreaseQuantity(product)
}

const removeFromCart = (product) => {
  cartStore.removeFromCart(product)
}

const totalPrice = computed(() => {
  return cart.value.reduce((total, product) => {
    return total + product.price * product.quantity
  }, 0)
})
</script>
