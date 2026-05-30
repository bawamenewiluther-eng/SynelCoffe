<template>

  <section class="admin-orders">

    <!-- HEADER -->
    <div class="orders-header">

      <h1>

        Orders Dashboard

      </h1>

      <p>

        Semua transaksi Synel Coffee ☕

      </p>
    </div>
    <div class="orders-table">

  <!-- HEADER -->
  <div class="table-head">

    <div>Customer</div>

    <div>Payment</div>

    <div>Total</div>

        <div>Status</div>

        <div>Queue</div>

        <div>Date</div>

  </div>
<!-- BODY -->
<div
  v-for="order in orders"
  :key="order.id"
  class="table-row"
>

  <!-- CUSTOMER -->
  <div>

    <h3>
      {{ order.customer_name }}
    </h3>

    <p>
      {{ order.customer_email }}
    </p>

  </div>

  <!-- PAYMENT -->
  <div>
    {{ order.payment_method }}
  </div>

  <!-- TOTAL -->
  <div>
    Rp {{ order.total_price }}
  </div>

  <!-- STATUS -->
  <div class="status-actions">

    <span class="paid-status">

      {{ order.order_status }}

    </span>

    <!-- PENDING -->
    <button

      v-if="
        order.order_status
        === 'pending'
      "

      class="status-btn"

      @click="updateStatus(

        order.id,

        'Process...'

      )"
    >

      Ambil

    </button>

    <!-- BREWING -->
    <button

      v-else-if="
        order.order_status
        === 'Process...☕'
      "

      class="status-btn done"

      @click="updateStatus(

        order.id,

        'completed'

      )"
    >

      Selesai

    </button>

    <!-- COMPLETED -->
    <span

      v-else

      class="completed-badge"
    >

      Done

    </span>

  </div>

  <!-- QUEUE -->
  <div class="queue-number">

    O{{ order.queue_number }}

  </div>

  <!-- DATE -->
  <div>

    {{ formatDate(order.created_at) }}

  </div>

</div>



</div>
  </section>

</template>

<script>

import axios from '../api'

export default {

  data() {

    return {

      orders: []

    }

  },

  methods: {
    formatDate(date) {
  return new Date(date)
    .toLocaleString(

      'id-ID',

      {

        dateStyle: 'medium',

        timeStyle: 'short'

      }

    )

},
async fetchOrders() {

  try {

    // RESET
    const response =
      await axios.get(

        'https://synelcoffebackend-production.up.railway.app/api/orders'

      )

    this.orders =
      response.data

  }

  catch(error) {

    console.log(error)

  }

},
async updateStatus(

  orderId,

  status

) {

  try {

    await axios.post(
 
         `https://synelcoffebackend-production.up.railway.app/api/orders/update-status/${orderId}`,
      {

        order_status: status

      }

    )

    // REFRESH
    this.fetchOrders()

  }

  catch(error) {

    console.log(error)

  }

}
  },

mounted() {

  // FIRST LOAD
  this.fetchOrders()

  // REALTIME REFRESH
  setInterval(() => {

    this.fetchOrders()

  }, 2000)

}

}

</script>

<style scoped>
.status-btn {

  margin-left: 12px;

  padding:
    10px 18px;

  border: none;

  background:
    #d4a853;

  color:
    #050301;

  font-weight: 700;

  cursor: pointer;

  transition: 0.3s ease;

}

.status-btn:hover {

  opacity: 0.8;

}
/* =========================
   TABLE
========================= */

.orders-table {

  width: 100%;

  border:
    1px solid
    rgba(212,168,83,0.12);

  background:
    rgba(18,10,5,0.92);

  overflow: hidden;

}

/* =========================
   HEAD
========================= */

.table-head {

  display: grid;

grid-template-columns:
2.5fr
1fr
1fr
1.8fr
0.8fr
1.5fr;
  padding:
    24px 30px;

  background:
    rgba(212,168,83,0.08);

  font-size: 12px;

  letter-spacing: 2px;

  text-transform: uppercase;

  color:
    rgba(240,223,200,0.7);

}

/* =========================
   ROW
========================= */

.table-row {

  display: grid;

  grid-template-columns:
2.5fr
1fr
1fr
1.8fr
0.8fr
1.5fr;
  padding:
    28px 30px;

  border-top:
    1px solid
    rgba(255,255,255,0.05);

  align-items: center;

  transition: 0.3s ease;

}

.table-row:hover {

  background:
    rgba(255,255,255,0.02);

}

/* =========================
   CUSTOMER
========================= */

.table-row h3 {

  margin-bottom: 6px;

  color: var(--cream);

  font-size: 18px;

}

.table-row p {

  color:
    rgba(240,223,200,0.45);

  font-size: 13px;

}

/* =========================
   STATUS
========================= */

.paid-status {

  display: inline-flex;

  align-items: center;

  justify-content: center;

  padding:
    8px 18px;

  background:
    rgba(59,178,115,0.14);

  color:
    #65d79c;

  font-size: 12px;

  letter-spacing: 1px;

  text-transform: uppercase;

}
/* =========================
   PAGE
========================= */

.admin-orders {

  min-height: 100vh;

  padding:
    140px 80px;

  background:
    #050301;

  color: white;

}

/* =========================
   HEADER
========================= */

.orders-header {

  margin-bottom: 60px;

}

.orders-header h1 {

  font-size: 62px;

  margin-bottom: 12px;

  color: var(--cream);

  font-family:
    'Playfair Display',
    serif;

}

.orders-header p {

  color:
    rgba(240,223,200,0.6);

  font-size: 15px;

  letter-spacing: 1px;

}

</style>