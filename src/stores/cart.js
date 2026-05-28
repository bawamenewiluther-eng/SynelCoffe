import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {

  // =========================
  // STATE
  // =========================
  state: () => ({

    items: []

  }),
    persist: true,
  
  
  // =========================
  // GETTERS
  // =========================
  getters: {

    // TOTAL ITEM
    totalItems: (state) => {

      return state.items.reduce(

        (total, item) =>

          total + item.quantity,

        0

      )

    },

    // TOTAL PRICE
    totalPrice: (state) => {

      return state.items.reduce(

        (total, item) => {

          // kalau price kosong
          if (!item.price) {

            return total

          }

          // bersihkan price
          const cleanPrice = Number(

            item.price
              .toString()
              .replace(/[^0-9]/g, '')

          )

          // kalau gagal parse
          if (isNaN(cleanPrice)) {

            return total

          }

          return total + (

            cleanPrice * item.quantity

          )

        },

        0

      )

    }

  },
  

  // =========================
  // ACTIONS
  // =========================
  actions: {

    // ADD TO CART
    addToCart(item) {

      const existingItem = this.items.find(

        cartItem =>

          cartItem.id === item.id

      )

      // kalau sudah ada
      if (existingItem) {

        existingItem.quantity++

      }

      // kalau belum ada
      else {

        this.items.push({

          ...item,

          quantity: 1

        })

      }

    },

    // REMOVE ITEM
    removeItem(id) {

      this.items = this.items.filter(

        item => item.id !== id

      )

    },

    // INCREASE QTY
    increaseQty(id) {

      const item = this.items.find(

        item => item.id === id

      )

      if (item) {

        item.quantity++

      }

    },

    // DECREASE QTY
    decreaseQty(id) {

      const item = this.items.find(

        item => item.id === id

      )

      if (

        item &&
        item.quantity > 1

      ) {

        item.quantity--

      }

    },

    // CLEAR CART
    clearCart() {

      this.items = []

    }

  }
})