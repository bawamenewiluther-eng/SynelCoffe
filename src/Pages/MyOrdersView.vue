```vue
<template>

  <section class="my-orders">

    <!-- HEADER -->
    <div class="orders-header">

      <h1>

        My Orders

      </h1>

      <p>

        Track pesanan kopi kamu ☕

      </p>

    </div>

    <!-- ORDER LIST -->
    <div
      v-for="order in orders"
      :key="order.id"
      class="order-card"
    >

      <!-- TOP -->
      <div class="order-top">

        <div>

          <h2>

            Antrian
            O{{ order.queue_number }}

          </h2>

          <p>

            {{ formatDate(order.created_at) }}

          </p>

        </div>

        <span class="status">

          {{ order.order_status }}

        </span>

      </div>

      <!-- ITEMS -->
      <div class="items">

        <div
          v-for="item in order.items"
          :key="item.id"
          class="item"
        >

          <span>

            {{ item.menu_name }}

          </span>

          <span>

            x{{ item.quantity }}

          </span>

        </div>

      </div>

      <!-- MESSAGE -->
      <div class="message">

        <p
          v-if="
            order.order_status
            === 'pending'
          "
        >

          ☕ Menunggu barista

        </p>

        <p
          v-else-if="
            order.order_status
            === 'brewing'
          "
        >

          🔥 Pesanan sedang dibuat

        </p>

        <p
          v-else-if="
            order.order_status
            === 'completed'
          "
        >

          ✅ Pesanan selesai

        </p>

      </div>

    </div>

  </section>

</template>

<script>

import axios from '../axios'

import {

  useAuthStore

}

from '../stores/auth'

export default {

  data() {

    return {

      orders: [],

      authStore:
        useAuthStore()

    }

  },

  methods: {

    async fetchOrders() {

      try {

        const response =
          await axios.post(

            'http://localhost:8000/api/my-orders',

            {

              email:

              this.authStore.user.email

            }

          )

        this.orders =
          response.data

      }

      catch(error) {

        console.log(error)

      }

    },

    formatDate(date) {

      return new Date(date)

        .toLocaleString(

          'id-ID',

          {

            dateStyle: 'medium',

            timeStyle: 'short'

          }

        )

    }

  },

mounted() {

  // FIRST LOAD
  this.fetchOrders()

  // AUTO REFRESH
  setInterval(() => {

    this.fetchOrders()

  }, 2000)

}

}

</script>

<style scoped>

.my-orders {

  min-height: 100vh;

  padding:
    140px 80px;

  background:
    #050301;

  color: white;

}

.orders-header {

  margin-bottom: 50px;

}

.orders-header h1 {

  font-size: 60px;

  color: var(--cream);

}

.order-card {

  border:
    1px solid
    rgba(255,255,255,0.06);

  background:
    rgba(18,10,5,0.92);

  padding: 30px;

  margin-bottom: 24px;

}

.order-top {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 24px;

}

.status {

  padding:
    8px 18px;

  background:
    rgba(59,178,115,0.14);

  color:
    #65d79c;

  text-transform: uppercase;

}

.items {

  display: flex;

  flex-direction: column;

  gap: 12px;

  margin-bottom: 24px;

}

.item {

  display: flex;

  justify-content: space-between;

}

.message {

  color:
    rgba(240,223,200,0.8);

}

</style>
```
