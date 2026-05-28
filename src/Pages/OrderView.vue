<template>
<div
  v-if="paymentLoading"
  class="payment-loading"
>

  <div class="payment-loading-card">

    <div class="payment-spinner"></div>

    <h2>

      Preparing Payment

    </h2>
      <br>
      Synel Coffee ☕

  </div>

</div>
  <section class="order-page">

    <!-- HEADER -->
    <div class="order-header">

      <p class="order-tag">
        — Checkout Order
      </p>

      <h1>
        Your Order
      </h1>

      <p class="order-subtitle">
        Periksa kembali pesananmu
        sebelum melanjutkan pembayaran.
      </p>

    </div>

    <!-- EMPTY -->
    <div
      v-if="!cart.items.length"
      class="empty-order"
    >

      <div class="empty-icon">
        ☕
      </div>

      <h2>
        Belum ada pesanan
      </h2>

      <p>
        Tambahkan kopi favoritmu dulu.
      </p>

        <div class="empty-actions">
            
        </div>

    </div>

    <!-- ORDER LIST -->
    <div
      v-else
      class="order-list"
    >

      <!-- ITEM -->
      <div
        class="order-item"
        v-for="item in cart.items"
        :key="item.id"
      >

        <!-- LEFT -->
        <div class="order-left">

          <img
            v-if="item.image"
            :src="`http://localhost:8000/storage/${item.image}`"
            class="order-image"
          >

          <div
            v-else
            class="order-placeholder"
          >
            ☕
          </div>

          <div>

            <h3>
              {{ item.name }}
            </h3>

            <p>
              Rp {{ item.price }}
            </p>

          </div>

        </div>

        <!-- RIGHT -->
        <div class="order-right">

          <!-- QUANTITY -->
          <div class="qty-box">

            <button
              @click="decreaseQty(item.id)"
            >
              -
            </button>

            <span>
              {{ item.quantity }}
            </span>

            <button
              @click="increaseQty(item.id)"
            >
              +
            </button>

          </div>

          <!-- SUBTOTAL -->
          <div class="subtotal">

            Rp {{ formatPrice(
              parsePrice(item.price)
              * item.quantity
            ) }}

          </div>

          <!-- REMOVE -->
          <button
            class="remove-btn"
            @click="removeItem(item.id)"
          >
            ✕
          </button>

        </div>

      </div>

      <!-- TOTAL -->
      <div class="order-summary">

        <div class="summary-row">

          <span>
            Total Item
          </span>

          <strong>
            {{ cart.totalItems }}
          </strong>

        </div>

        <div class="summary-row total">

          <span>
            Total
          </span>

          <strong>
            Rp {{ formatPrice(cart.totalPrice) }}
          </strong>

        </div>

        <!-- PAYMENT -->
        <div class="payment-box">

          <p class="payment-title">
            Payment Method
          </p>

          <label class="payment-option">

            <input
              type="radio"
              value="qris"
              v-model="paymentMethod"
            >

            QRIS

          </label>

          <label class="payment-option">

          </label>

          <label class="payment-option">

            <input
              type="radio"
              value="ewallet"
              v-model="paymentMethod"
            >

            E-Wallet

          </label>
          <label class="payment-option">

          <input
            v-model="paymentMethod"
            type="radio"
            value="bank"
          >

          <span>

            Bank Transfer

          </span>

        </label>
        </div>

        <!-- ACTION BUTTONS -->
        <div class="checkout-actions">

        <button
            class="back-menu-btn"
            @click="$router.push('/menu')"
        >

            + Tambah Menu Lagi

        </button>

       <button
          class="checkout-btn"
          @click="checkoutOrder"
        >

          CHECKOUT ORDER

        </button>

        </div>

      </div>

    </div>

  </section>

</template>

<script>
import { useCartStore }
from '../stores/cart'
import axios from '../axios'
import { useAuthStore }

from '../stores/auth'

export default {

  data() {

    return {

      cart: useCartStore(),

      paymentMethod: 'qris',
      paymentLoading: false,
      authStore:
       useAuthStore()

    }

  },
  methods: {
   async checkoutOrder() {

  try {
    this.paymentLoading = true
    const response = await axios.post(

      'http://localhost:8000/api/checkout',

      {

        total: this.cart.totalPrice,

        name: 'Synel Customer',

        email: 'customer@gmail.com',
        payment_method: this.paymentMethod

      }

    )

    const token =
      response.data.token

    // MIDTRANS POPUP
   window.snap.pay(token, {
      onSuccess: async (result) => {

        try {

          // ======================
          // SAVE ORDER
          // ======================

          await axios.post(

            'http://localhost:8000/api/save-order',

            {

             customer_name:

                this.authStore.user.name,

              customer_email:

                this.authStore.user.email,

              payment_method:
                this.paymentMethod,

              midtrans_order_id:
                result.order_id,

              transaction_id:
                result.transaction_id,

              total_price:
                this.cart.totalPrice,

              items:
                this.cart.items

            }

          )
          

          // ======================
          // CLEAR CART
          // ======================

          this.cart.clearCart()

          // ======================
          // REDIRECT
          // ======================
            // REDIRECT
          this.$router.push(

            '/my-orders'

          )


        }

        catch(error) {

          console.log(error)

        }

      },

  onPending: (result) => {

    console.log(result)

  },

  onError: (result) => {

    console.log(result)

  },

  onClose: () => {

    console.log(
      'Popup ditutup'
    )

  }

}, this.paymentLoading = false
)

  }

  catch (error) {

    console.log(error)

  }

},
    parsePrice(price) {

      return parseInt(
        price.toString().replace(/\./g, '')
      )

    },

    formatPrice(price) {

      return new Intl.NumberFormat(
        'id-ID'
      ).format(price)

    },

    increaseQty(id) {

      const item =
        this.cart.items.find(
          item => item.id === id
        )

      if (item) {

        item.quantity++

      }

    },

    decreaseQty(id) {

      const item =
        this.cart.items.find(
          item => item.id === id
        )

      if (item && item.quantity > 1) {

        item.quantity--

      }

    },

    removeItem(id) {

      this.cart.items =
        this.cart.items.filter(
          item => item.id !== id
        )

    }

  }

}
</script>

<style scoped>
/* =========================
   PAYMENT LOADING OVERLAY
========================= */

.payment-loading {

  position: fixed;

  inset: 0;

  z-index: 99999;

  display: flex;

  align-items: center;

  justify-content: center;

  background:
    rgba(5,3,1,0.82);

  backdrop-filter: blur(12px);

}

/* =========================
   CARD
========================= */

.payment-loading-card {

  width: 100%;
  max-width: 420px;

  padding:
    54px 42px;

  text-align: center;

  background:
    rgba(18,10,5,0.96);

  border:
    1px solid
    rgba(212,168,83,0.18);

  box-shadow:
    0 30px 80px
    rgba(0,0,0,0.45);

  animation:
    fadeUp 0.5s ease;

}

/* =========================
   SPINNER
========================= */

.payment-spinner {

  width: 88px;
  height: 88px;

  margin:
    0 auto 32px;

  border-radius: 50%;

  border:
    3px solid
    rgba(212,168,83,0.12);

  border-top-color:
    var(--gold);

  animation:
    spin 1s linear infinite;

  position: relative;

}

.payment-spinner::before {

  content: '';

  position: absolute;

  inset: 10px;

  border-radius: 50%;

  border:
    2px solid
    rgba(212,168,83,0.08);

  border-bottom-color:
    var(--gold-light);

  animation:
    spinReverse 1.6s linear infinite;

}

/* =========================
   TEXT
========================= */

.payment-loading-card h2 {

  font-size: 42px;

  margin-bottom: 18px;

  color: var(--cream);

  font-family:
    'Playfair Display',
    serif;

}

.payment-loading-card p {

  line-height: 1.9;

  color:
    rgba(240,223,200,0.62);

  font-size: 15px;

}

/* =========================
   ANIMATION
========================= */

@keyframes spin {

  to {

    transform:
      rotate(360deg);

  }

}

@keyframes spinReverse {

  to {

    transform:
      rotate(-360deg);

  }

}

@keyframes fadeUp {

  from {

    opacity: 0;

    transform:
      translateY(30px);

  }

  to {

    opacity: 1;

    transform:
      translateY(0);

  }

}
/* PAGE */

.order-page {

  width: 100%;

  max-width: 1200px;

  margin: auto;

  padding:
    160px 24px 100px;

}

/* HEADER */

.order-header {

  margin-bottom: 60px;

}

.order-tag {

  color: var(--gold);

  font-size: 11px;

  letter-spacing: 4px;

  text-transform: uppercase;

  font-family:
    'Space Mono',
    monospace;

  margin-bottom: 20px;

}

.order-header h1 {

  font-size: 72px;

  line-height: 1;

  margin-bottom: 20px;

  color: var(--cream);

  font-family:
    'Playfair Display',
    serif;

}

.order-subtitle {

  max-width: 640px;

  line-height: 1.8;

  color:
    rgba(240,223,200,0.6);

}

/* EMPTY */

.empty-order {

  text-align: center;

  padding: 120px 20px;

}

.empty-icon {

  font-size: 90px;

  margin-bottom: 30px;

}

.back-btn {

  margin-top: 30px;

  height: 54px;

  padding:
    0 28px;

  border: none;

  background: var(--gold);

  color: var(--espresso);

  font-weight: 700;

}
.empty-actions {

  margin-top: 30px;

  display: flex;

  justify-content: center;

  gap: 16px;

  flex-wrap: wrap;

}

.home-btn {

  height: 54px;

  padding:
    0 28px;

  border:
    1px solid
    rgba(212,168,83,0.2);

  background:
    rgba(255,255,255,0.04);

  color: var(--cream);

  font-weight: 600;

  transition: 0.3s ease;

}

.home-btn:hover {

  background:
    rgba(255,255,255,0.08);

}

/* LIST */

.order-list {

  display: flex;

  flex-direction: column;

  gap: 24px;

}

/* ITEM */

.order-item {

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 30px;

  padding: 24px;

  background:
    rgba(255,255,255,0.03);

  border:
    1px solid
    rgba(212,168,83,0.1);

}

.order-left {

  display: flex;

  align-items: center;

  gap: 20px;
  opacity: 0.7;

}

.order-image,
.order-placeholder {

  width: 90px;
  height: 90px;

  object-fit: cover;

  display: flex;

  align-items: center;

  justify-content: center;

  background:
    rgba(255,255,255,0.05);

}

.order-left h3 {

  font-size: 24px;

  margin-bottom: 8px;
    
}

.order-left p {

  color:
    rgba(240,223,200,0.6);

}

/* RIGHT */

.order-right {

  display: flex;

  align-items: center;

  gap: 20px;

}

.qty-box {

  display: flex;

  align-items: center;

  gap: 14px;

}

.qty-box button {

  width: 34px;
  height: 34px;

  border: none;

  background:
    rgba(255,255,255,0.08);

  color: white;

}

.subtotal {

  min-width: 120px;

  text-align: right;

  font-weight: 700;

  color: var(--gold);

}

.remove-btn {

  width: 36px;
  height: 36px;

  border: none;

  background:
    rgba(255,80,80,0.15);

  color: #ff6b6b;

}

/* SUMMARY */

.order-summary {

  margin-top: 40px;

  padding: 32px;

  background:
    rgba(255,255,255,0.03);

  border:
    1px solid
    rgba(212,168,83,0.1);

}

.summary-row {

  display: flex;

  justify-content: space-between;

  margin-bottom: 18px;

}

.summary-row.total {

  padding-top: 20px;

  border-top:
    1px solid
    rgba(255,255,255,0.08);

  font-size: 22px;

}

/* PAYMENT */

.payment-box {

  margin-top: 40px;

}

.payment-title {

  margin-bottom: 20px;

  font-size: 14px;

  letter-spacing: 2px;

  text-transform: uppercase;

  color: var(--gold);

}

.payment-option {

  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 16px;

}

/* BUTTON */

.checkout-btn {

  width: 100%;

  margin-top: 40px;

  height: 60px;

  border: none;

  background: var(--gold);

  color: var(--espresso);

  font-size: 14px;

  font-weight: 700;

  letter-spacing: 2px;

  text-transform: uppercase;

}
.checkout-actions {

  display: flex;

  flex-direction: column;

  gap: 16px;

  margin-top: 40px;

}

.back-menu-btn {

  width: 100%;

  height: 54px;

  border:
    1px solid
    rgba(212,168,83,0.2);

  background:
    rgba(255,255,255,0.04);

  color: var(--cream);

  font-size: 13px;

  font-weight: 600;

  transition: 0.3s ease;

}

.back-menu-btn:hover {

  background:
    rgba(255,255,255,0.08);

}

/* MOBILE */

@media (max-width: 768px) {

  .order-item {

    flex-direction: column;

    align-items: flex-start;

  }

  .order-right {

    width: 100%;

    justify-content: space-between;

  }

  .order-header h1 {

    font-size: 52px;

  }

}

</style>