<template>

  <!-- HERO -->
  <section class="page-hero">

    <div class="page-hero-tag">
      — Daftar Menu Lengkap
    </div>

    <h1>
      Our
      <em>Coffee</em>
      <br>
      Collection
    </h1>

    <p>
      Jelajahi koleksi kopi pilihan kami —
      dari espresso klasik hingga seasonal signature.
    </p>

  </section>

  <!-- FILTER -->
  <section class="filter-wrap">

    <div class="filter-bar">

      <button
        v-for="cat in categories"
        :key="cat.id"
        class="filter-btn"
        :class="{
          active: activeCategory === cat.id
        }"
        @click="changeCategory(cat.id)"
      >

        {{ cat.label }}

        <span
          v-if="cat.id !== 'all'"
          class="filter-count"
        >
          ({{ countByCategory(cat.id) }})
        </span>

      </button>

    </div>

  </section>

  <!-- SEARCH -->
  <section class="search-wrap">

    <div class="search-box">

      <span class="search-icon">
        🔍
      </span>

      <input
        v-model="search"
        type="text"
        placeholder="Cari kopi favoritmu…"
      >

    </div>

    <div class="result-count">

      Menampilkan

      <span>
        {{ items.length }}
      </span>

      menu

    </div>

  </section>

  <!-- MENU -->
  <template
    v-for="group in visibleGroups"
    :key="group.id"
  >

    <!-- LABEL -->
    <div
      class="section-label"
      v-if="
        activeCategory === 'all'
        && group.items.length
      "
    >

      <div class="label-line"></div>

      <div class="label-text">
        {{ group.label }}
      </div>

      <div class="label-line"></div>

    </div>

    <!-- GRID -->
    <section class="menu-grid">

      <!-- CARD -->
      <div
        class="m-card"
        v-for="(item, idx) in group.items"
        :key="item.id"
        :style="{
          animationDelay:
            idx * 0.06 + 's'
        }"
      >

        <!-- BADGE -->
        <span
          v-if="item.is_popular"
          class="popular-badge"
        >
          ★ Populer
        </span>

        <span
          v-else-if="item.is_new"
          class="new-badge"
        >
          New
        </span>

        <!-- IMAGE -->
       <div class="m-card-img">
          <div class="m-card-img">

            <img
              v-if="item.image"
              :src="`https://synelcoffebackend-production.up.railway.app/storage/${item.image}`"
              class="menu-image"
            >

            <div
              v-else
              class="menu-placeholder"
            >

              ☕

            </div>

          </div>
        </div>

        <!-- BODY -->
        <div class="m-card-body">

          <div class="m-card-meta">

            <span class="m-cat">
              {{ item.category }}
            </span>

            <span class="m-origin">
              {{ item.origin }}
            </span>

          </div>

          <h3>
            {{ item.name }}
          </h3>

          <p>
            {{ item.description }}
          </p>

          <!-- FOOTER -->
          <div class="m-card-footer">

            <div>

              <div class="m-price">
                {{ item.price }}
                <sub>/ cup</sub>
              </div>

              <div class="m-temp">

                <span
                  :class="
                    item.temperature === 'hot'
                      ? 'dot-hot'
                      : item.temperature === 'cold'
                      ? 'dot-cold'
                      : 'dot-both'
                  "
                ></span>

                {{
                  item.temperature === 'hot'
                    ? 'Hot Only'
                    : item.temperature === 'cold'
                    ? 'Cold Only'
                    : 'Hot & Cold'
                }}

              </div>

            </div>

            <!-- ACTION -->
            <div class="m-card-actions">

              <button
                class="btn-detail"
                @click="openDetail(item)"
              >
                Detail
              </button>

              <button
                class="btn-add"
                @click="addToCart(item)"
              >
                + Order
              </button>

            </div>

          </div>

        </div>

      </div>

      <!-- EMPTY -->
      <div
        class="empty-state"
        v-if="
          items.length === 0
          && group.id === 'espresso'
        "
      >

        <div class="big">
          ☕
        </div>

        <h3>
          Tidak ada kopi ditemukan
        </h3>

        <p>
          Coba kata kunci lain
        </p>

      </div>

    </section>

  </template>

<!-- CART -->
<div
  class="cart-floater"
  v-if="cart.items.length"
>

  <!-- ITEMS -->
  <div
    class="cart-preview"
    @click="goToOrder"
  >

    <div
      class="cart-item"
      v-for="item in cart.items"
      :key="item.id"
    >

      <span class="cart-item-name">
        {{ item.name }}
      </span>

      <span class="cart-item-qty">
        x{{ item.quantity }}
      </span>

    </div>

    <div class="cart-preview-total">

      {{ cart.totalItems }}
      Items

      •

      Rp {{ cart.totalPrice }}

    </div>

  </div>

  <!-- ACTION -->
  <div class="cart-actions">

    <button
      class="cart-go"
      @click="goToOrder"
    >
      →
    </button>

    <button
      class="cart-close"
      @click="clearCart"
    >
      ✕
    </button>

  </div>

</div>

  <!-- DETAIL MODAL -->
  <div
    class="modal-overlay"
    v-if="detailItem"
    @click.self="
      detailItem = null
    "
  >

    <div class="modal-box">

      <button
        class="modal-close"
        @click="
          detailItem = null
        "
      >
        ✕
      </button>

      <!-- IMAGE -->
      <div
        class="modal-img"
        :style="{
          background:
            detailItem.bg
        }"
      >
      {{ detailItem.emoji || '☕' }}
      </div>

      <!-- BODY -->
      <div class="modal-body">

        <span class="modal-cat">
          {{ detailItem.category }}
        </span>

        <div class="modal-title">
          {{ detailItem.name }}
        </div>

        <div class="modal-origin">
          {{ detailItem.origin }}
        </div>

        <p class="modal-desc">
        {{ detailItem.full_description }}
        </p>

        <!-- TAG -->
        <div class="modal-tags">

          <span
            class="m-tag"
           v-for="tag in (detailItem.tags || [])"
            :key="tag"
          >
            {{ tag }}
          </span>

        </div>

        <!-- FOOTER -->
        <div class="modal-footer">

          <div class="modal-price">

            {{ detailItem.price }}

            <sub>
              / cup
            </sub>

          </div>

          <button
            class="btn-order-modal"
            @click="
              quickOrder(detailItem)
            "
          >

            ☕ Tambah ke Pesanan

          </button>

        </div>

      </div>

    </div>

  </div>

</template>

<script>
import axios from '../api';
import {
  useCartStore
}
from '../stores/cart'
export default {
  async mounted() {

   this.fetchMenus()

},
  data() {

    return {

      search: '',

      activeCategory: 'all',

      detailItem: null,
      cart: useCartStore(),
      categories: [

        {
          id: 'all',
          label: 'Semua Menu'
        },

        {
          id: 'Espresso',
          label: 'Espresso'
        },

        {
          id: 'Matcha',
          label: 'Matcha'
        },

        {
          id: 'Cold Brew',
          label: 'Cold Brew'
        },

        {
          id: 'Latte',
          label: 'Latte'
        },

        {
          id: 'Single Origin',
          label: 'Single Origin'
        },

        {
          id: 'Non-Coffee',
          label: 'Non-Coffee'
        },

        {
          id: 'Seasonal',
          label: 'Seasonal'
        }

      ],

        items: [],
      }
    },

  computed: {
      visibleGroups() {

        return [

          {

            id: 'menus',

            label: 'Coffee Collection',

            items: this.items

          }

        ]

      }

  },
  watch: {

  search() {

    this.fetchMenus()

  },

  activeCategory() {

    this.fetchMenus()

  }

},

  methods: {
  clearCart() {

  this.cart.clearCart()

},
       async fetchMenus() {

          try {

            const response = await axios.get(

              'https://synelcoffebackend-production.up.railway.app/api/menus',

              {

                params: {

                  search: this.search,

                  category: this.activeCategory

                }

              }

            )

            this.items = response.data

          }

          catch (error) {

            console.log(error)

          }

        },
    // =================================
    // CATEGORY
    // =================================

    changeCategory(id) {

      this.activeCategory = id

      this.search = ''

    },

    countByCategory(category) {

      return this.items.filter(item =>

        item.category === category

      ).length

    },

    // =================================
    // DETAIL MODAL
    // =================================

    openDetail(item) {

      this.detailItem = item

    },

    closeDetail() {

      this.detailItem = null

    },

    // =================================
    // CART
    // =================================
    addToCart(item) {

      this.cart.addToCart(item)

    },

    quickOrder(item) {

      this.addToCart(item)

      this.closeDetail()

    },

    goToOrder() {

      this.$router.push('/order')

    }

  }

}

</script>

<style scoped>

/* =========================
   ROOT
========================= */

.page-hero,
.filter-wrap,
.search-wrap,
.menu-grid,
.section-label,
.cart-floater,
.modal-overlay {

  position: relative;
  z-index: 2;

}

/* =========================
   HERO
========================= */

.page-hero {

  padding:
    180px 24px 90px;

  text-align: center;

}

.page-hero-tag {

  display: inline-block;

  font-family: 'Space Mono', monospace;

  font-size: 10px;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: var(--gold);

  margin-bottom: 26px;

  opacity: 0.9;

}

.page-hero h1 {

  font-family:
    'Playfair Display',
    serif;

  font-size: clamp(
    58px,
    10vw,
    120px
  );

  line-height: 0.95;

  font-weight: 900;

  margin-bottom: 28px;

  color: var(--cream);

}

.page-hero h1 em {

  color: var(--gold);

  font-style: italic;

}

.page-hero p {

  max-width: 760px;

  margin: auto;

  color:
    rgba(240,223,200,0.66);

  line-height: 1.9;

  font-size: 16px;

}

/* =========================
   FILTER
========================= */

.filter-wrap {

  padding:
    0 24px 50px;

}

.filter-bar {

  width: fit-content;

  margin: auto;

  display: flex;

  flex-wrap: wrap;

  justify-content: center;

  gap: 14px;

}

.filter-btn {

  position: relative;

  border: none;

  padding:
    14px 24px;

  background:
    rgba(255,255,255,0.04);

  border:
    1px solid
    rgba(212,168,83,0.12);

  color:
    rgba(240,223,200,0.74);

  font-family:
    'Space Mono',
    monospace;

  font-size: 11px;

  letter-spacing: 2px;

  text-transform: uppercase;

  transition: 0.35s ease;

  backdrop-filter: blur(14px);

}

.filter-btn:hover {

  transform:
    translateY(-2px);

  border-color:
    rgba(212,168,83,0.32);

  color: var(--cream);

}

.filter-btn.active {

  background:
    linear-gradient(
      135deg,
      rgba(212,168,83,0.22),
      rgba(124,74,30,0.18)
    );

  border-color:
    rgba(212,168,83,0.38);

  color: var(--gold);

  box-shadow:
    0 0 30px
    rgba(212,168,83,0.12);

}

.filter-count {

  opacity: 0.6;

}

/* =========================
   SEARCH
========================= */

.search-wrap {

  padding:
    0 24px 90px;

}

.search-box {

  max-width: 760px;

  height: 72px;

  margin: auto;

  display: flex;

  align-items: center;

  padding:
    0 28px;

  gap: 18px;

  background:
    rgba(255,255,255,0.04);

  border:
    1px solid
    rgba(212,168,83,0.12);

  backdrop-filter: blur(18px);

}

.search-icon {

  font-size: 18px;

  opacity: 0.7;

}

.search-box input {

  flex: 1;

  background: transparent;

  border: none;

  outline: none;

  color: var(--cream);

  font-size: 15px;

}

.search-box input::placeholder {

  color:
    rgba(240,223,200,0.4);

}

.result-count {

  margin-top: 22px;

  text-align: center;

  font-family:
    'Space Mono',
    monospace;

  font-size: 11px;

  letter-spacing: 2px;

  text-transform: uppercase;

  color:
    rgba(240,223,200,0.5);

}

.result-count span {

  color: var(--gold);

}

/* =========================
   LABEL
========================= */

.section-label {

  width: 100%;

  display: flex;

  align-items: center;

  gap: 20px;

  padding:
    0 24px;

  margin:
    0 auto 42px;

  max-width: 1400px;

}

.label-line {

  flex: 1;

  height: 1px;

  background:
    linear-gradient(
      90deg,
      transparent,
      rgba(212,168,83,0.16),
      transparent
    );

}

.label-text {

  font-family:
    'Space Mono',
    monospace;

  font-size: 11px;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: var(--gold);

}

/* =========================
   GRID
========================= */

.menu-grid {

  width: 100%;

  max-width: 1400px;

  margin:
    0 auto 90px;

  padding:
    0 24px;

  display: grid;

  grid-template-columns:
    repeat(
      auto-fit,
      minmax(320px,1fr)
    );

  gap: 34px;

}

/* =========================
   CARD
========================= */

.m-card {

  position: relative;

  overflow: hidden;

  background:
    rgba(255,255,255,0.03);

  border:
    1px solid
    rgba(212,168,83,0.12);

  backdrop-filter: blur(18px);

  transition: 0.4s ease;

  animation:
    fadeUp 0.7s ease both;
    display: flex;

  flex-direction: column;

  height: 100%;

}

.m-card:hover {

  transform:
    translateY(-8px);

  border-color:
    rgba(212,168,83,0.24);

  box-shadow:
    0 30px 70px
    rgba(0,0,0,0.3);

}

/* =========================
   BADGE
========================= */

.popular-badge,
.new-badge {

  position: absolute;

  top: 18px;
  left: 18px;

  z-index: 3;

  padding:
    8px 14px;

  font-size: 10px;

  font-family:
    'Space Mono',
    monospace;

  letter-spacing: 2px;

  text-transform: uppercase;

}

.popular-badge {

  background: var(--gold);

  color: var(--espresso);

}

.new-badge {

  background:
    rgba(255,255,255,0.1);

  color: white;

}

/* =========================
   IMAGE
========================= */

.m-card-img {

  height: 260px;

  overflow: hidden;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  background:
    linear-gradient(
      135deg,
      #120904,
      #1a0d06
    );

}

.menu-image {

  width: 100%;
  height: 100%;

  object-fit: cover;

}

.menu-placeholder {

  font-size: 70px;

  opacity: 0.8;

}

/* =========================
   BODY
========================= */

.m-card-body {

  padding: 34px;
  flex: 1;

  display: flex;

  flex-direction: column;
}

.m-card-meta {

  display: flex;

  justify-content: space-between;

  margin-bottom: 18px;

}

.m-cat,
.m-origin {

  font-family:
    'Space Mono',
    monospace;

  font-size: 10px;

  letter-spacing: 2px;

  text-transform: uppercase;

}

.m-cat {

  color: var(--gold);

}

.m-origin {

  color:
    rgba(240,223,200,0.4);

}

.m-card h3 {

  font-size: 30px;

  font-family:
    'Playfair Display',
    serif;

  margin-bottom: 18px;

  color: var(--cream);

}

.m-card p {

  line-height: 1.9;

  color:
    rgba(240,223,200,0.64);

  margin-bottom: 34px;

}

/* =========================
   FOOTER
========================= */

.m-card-footer {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 18px;
  margin-top: auto;

}

.m-price {

  font-size: 28px;

  font-weight: 800;

  color: var(--gold);

}

.m-price sub {

  font-size: 12px;

  color:
    rgba(240,223,200,0.4);

}

.m-temp {

  margin-top: 8px;

  display: flex;

  align-items: center;

  gap: 10px;

  font-size: 11px;

  font-family:
    'Space Mono',
    monospace;

  letter-spacing: 1px;

  color:
    rgba(240,223,200,0.5);

}

.dot-hot,
.dot-cold,
.dot-both {

  width: 8px;
  height: 8px;

  border-radius: 50%;

}

.dot-hot {

  background: #ff6b6b;

}

.dot-cold {

  background: #4dabf7;

}

.dot-both {

  background: var(--gold);

}

/* =========================
   ACTIONS
========================= */

.m-card-actions {

  display: flex;

  gap: 12px;

}

.btn-detail,
.btn-add {

  border: none;

  height: 46px;

  padding:
    0 20px;

  font-family:
    'Space Mono',
    monospace;

  font-size: 11px;

  letter-spacing: 2px;

  text-transform: uppercase;

  transition: 0.35s ease;

}

.btn-detail {

  background:
    rgba(255,255,255,0.06);

  color: white;

}

.btn-detail:hover {

  background:
    rgba(255,255,255,0.1);

}

.btn-add {

  background: var(--gold);

  color: var(--espresso);

  font-weight: 700;

}

.btn-add:hover {

  transform:
    translateY(-2px);

  background:
    var(--gold-light);

  box-shadow:
    0 12px 30px
    rgba(212,168,83,0.22);

}

/* =========================
   EMPTY
========================= */

.empty-state {

  grid-column: 1/-1;

  text-align: center;

  padding:
    120px 20px;

}

.empty-state .big {

  font-size: 90px;

  margin-bottom: 26px;

  opacity: 0.5;

}

.empty-state h3 {

  font-size: 32px;

  margin-bottom: 16px;

}

.empty-state p {

  color:
    rgba(240,223,200,0.5);

}

/* =========================
   CART
========================= */
.cart-preview {

  display: flex;

  flex-direction: column;

  gap: 10px;

  max-height: 140px;

  overflow-y: auto;

  padding-right: 4px;

}

.cart-item {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 20px;

}

.cart-item-name {

  color: var(--cream);

  font-size: 14px;

  font-weight: 600;

}

.cart-item-qty {

  color: var(--gold);

  font-size: 13px;

  font-family:
    'Space Mono',
    monospace;

}

.cart-preview-total {

  margin-top: 10px;

  padding-top: 12px;

  border-top:
    1px solid
    rgba(255,255,255,0.08);

  color:
    rgba(240,223,200,0.7);

  font-size: 12px;

  letter-spacing: 1px;

  text-transform: uppercase;

}

.cart-floater {

  position: fixed;

  bottom: 28px;
  right: 28px;

  z-index: 101;

  display: flex;

  align-items: center;

  gap: 16px;

  padding:
    18px 26px;

  background:
    linear-gradient(
      135deg,
      rgba(212,168,83,0.24),
      rgba(124,74,30,0.18)
    );

  border:
    1px solid
    rgba(212,168,83,0.3);

  backdrop-filter: blur(18px);

  color: white;

  font-family:
    'Space Mono',
    monospace;

  font-size: 11px;

  letter-spacing: 2px;

  text-transform: uppercase;

  transition: 0.35s ease;

}

.cart-floater:hover {

  transform:
    translateY(-3px);

  box-shadow:
    0 12px 30px
    rgba(212,168,83,0.22);

}
.cart-actions {

  display: flex;

  gap: 10px;

}

.cart-go,
.cart-close {

  width: 42px;
  height: 42px;

  border: none;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;

  transition: 0.3s ease;

}

.cart-go {

  background: var(--gold);

  color: var(--espresso);

  font-size: 20px;

  font-weight: 700;

}

.cart-go:hover {

  transform: scale(1.08);

}

.cart-close {

  background:
    rgba(255,255,255,0.08);

  color: white;

}

.cart-close:hover {

  background:
    rgba(255,80,80,0.2);

}

/* =========================
   MODAL
========================= */

.modal-overlay {

  position: fixed;

  inset: 0;

  z-index: 101;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 24px;

  background:
    rgba(56, 30, 30, 0.72);

  backdrop-filter: blur(14px);

}

.modal-box {

  width: 100%;

  max-width: 920px;

  overflow: hidden;

  position: relative;

  background:
    rgba(26,16,8,0.96);

  border:
    1px solid
    rgba(212,168,83,0.18);

  display: grid;

  grid-template-columns:
    1fr 1fr;

}

.modal-close {

  position: absolute;

  top: 18px;
  right: 18px;

  z-index: 10;

  width: 42px;
  height: 42px;

  border: none;

  background:
    rgba(255,255,255,0.08);

  color: white;

  font-size: 16px;

}

.modal-img {

  min-height: 520px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 120px;

}

.modal-body {

  padding: 56px;

}

.modal-cat {

  font-family:
    'Space Mono',
    monospace;

  font-size: 10px;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: var(--gold);

}

.modal-title {

  font-size: 54px;

  line-height: 1;

  margin:
    18px 0;

  font-family:
    'Playfair Display',
    serif;

}

.modal-origin {

  color:
    rgba(240,223,200,0.44);

  margin-bottom: 24px;

}

.modal-desc {

  line-height: 2;

  color:
    rgba(240,223,200,0.66);

  margin-bottom: 34px;

}

.modal-tags {

  display: flex;

  flex-wrap: wrap;

  gap: 12px;

  margin-bottom: 40px;

}

.m-tag {

  padding:
    10px 16px;

  background:
    rgba(255,255,255,0.05);

  border:
    1px solid
    rgba(212,168,83,0.12);

  font-size: 10px;

  letter-spacing: 2px;

  text-transform: uppercase;

}

.modal-footer {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 18px;

}

.modal-price {

  font-size: 40px;

  font-weight: 800;

  color: var(--gold);

}

.btn-order-modal {

  border: none;

  height: 56px;

  padding:
    0 28px;

  background: var(--gold);

  color: var(--espresso);

  font-family:
    'Space Mono',
    monospace;

  font-size: 11px;

  letter-spacing: 2px;

  text-transform: uppercase;

  font-weight: 700;

  transition: 0.35s ease;

}

.btn-order-modal:hover {

  transform:
    translateY(-2px);

  background:
    var(--gold-light);

}

/* =========================
   ANIMATION
========================= */

@keyframes fadeUp {

  from {

    opacity: 0;

    transform:
      translateY(40px);

  }

  to {

    opacity: 1;

    transform:
      translateY(0);

  }

}
.cart-floater {

  position: fixed;

  bottom: 28px;
  right: 28px;

  z-index: 100;

  min-width: 320px;

  padding: 20px 24px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 24px;

  background:
    linear-gradient(
      135deg,
      rgba(20,10,5,0.95),
      rgba(35,18,8,0.96)
    );

  border:
    1px solid
    rgba(212,168,83,0.24);

  backdrop-filter: blur(20px);

  box-shadow:
    0 20px 60px
    rgba(0,0,0,0.4);

  transition: 0.35s ease;

}

.cart-floater:hover {

  transform:
    translateY(-4px);

  border-color:
    rgba(212,168,83,0.4);

}

.cart-preview {

  display: flex;

  flex-direction: column;

  gap: 6px;

}

.cart-preview-title {

  font-size: 15px;

  font-weight: 700;

  color: var(--cream);

}

.cart-preview-title span {

  color: var(--gold);

}

.cart-preview-total {

  font-size: 12px;

  letter-spacing: 2px;

  text-transform: uppercase;

  color:
    rgba(240,223,200,0.6);

  font-family:
    'Space Mono',
    monospace;

}

.cart-arrow {

  width: 42px;
  height: 42px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  background: var(--gold);

  color: var(--espresso);

  font-size: 20px;

  font-weight: 700;

}

/* =========================
   MOBILE
========================= */

@media (max-width: 900px) {

  .modal-box {

    grid-template-columns: 1fr;

  }

  .modal-img {

    min-height: 260px;

  }

}

@media (max-width: 768px) {

  .page-hero {

    padding:
      150px 24px 70px;

  }

  .m-card-footer,
  .modal-footer {

    flex-direction: column;

    align-items: stretch;

  }

  .m-card-actions {

    width: 100%;

  }

  .btn-detail,
  .btn-add {

    flex: 1;

  }

  .modal-body {

    padding: 36px;

  }

  .modal-title {

    font-size: 42px;

  }

  .cart-floater {

    left: 20px;
    right: 20px;

    justify-content: center;

  }

}

</style>