<script setup>

import { onMounted }
from 'vue'

import { storeToRefs }
from 'pinia'

import {
  useAuthStore
}
from './stores/auth'

import Navbar from './template/Navbar.vue'
import Cursor from './template/Cursor.vue'
import Footer from './template/Footer.vue'
import AIChatWidget from './Pages/AIChatWidget.vue'
import Menu from './Pages/Menu.vue'
import Menu from './Pages/Menu.vue'

const auth =
  useAuthStore()

const {
  loading,
  initialized
}
=
storeToRefs(auth)

onMounted(() => {

  auth.fetchUser()

})

</script>

<template>
  <template v-if="!initialized || loading">

    <div class="global-loader">

      <div class="loader-ring"></div>

      <div class="loader-text">

        Tunggu Sebentar....

      </div>

    </div>

  </template>

  <template v-else>

<Navbar />

<main class="app-content">

  <Suspense>

    <template #default>

      <router-view />

    </template>

    <template #fallback>

      <div class="page-placeholder">

        <div class="page-loading-ring"></div>

      </div>

    </template>

  </Suspense>

</main>

<Footer />
<div class="floating-container">
  <Menu /> <AIChatWidget /> 
 </div>

  </template>
  <Cursor />
</template>

<style>
/* =========================
   APP CONTENT
========================= */

.app-content {

  min-height: 100vh;

}

/* =========================
   PLACEHOLDER
========================= */

.page-placeholder {

  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

}

/* =========================
   LOADING RING
========================= */

.page-loading-ring {

  width: 60px;
  height: 60px;

  border-radius: 50%;

  border:
    2px solid
    rgba(212,168,83,0.1);

  border-top:
    2px solid var(--gold);

  animation:
    spin 1s linear infinite;

}

.global-loader {

  position: fixed;

  inset: 0;

  z-index: 101;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  gap: 28px;

  background:
    radial-gradient(
      circle at center,
      #1a0f08 0%,
      #0b0502 100%
    );

}

/* RING */

.loader-ring {

  width: 90px;
  height: 90px;

  border-radius: 50%;

  border:
    2px solid
    rgba(212,168,83,0.1);

  border-top:
    2px solid var(--gold);

  animation:
    spin 1s linear infinite;

  box-shadow:
    0 0 40px
    rgba(212,168,83,0.18);

}

/* TEXT */

.loader-text {

  font-size: 11px;

  letter-spacing: 5px;

  text-transform: uppercase;

  color: var(--gold);

  font-family: 'Space Mono', monospace;

  opacity: 0.85;

}

/* ANIMATION */

@keyframes spin {

  to {

    transform:
      rotate(360deg);

  }

}

.page-loading {

  min-height: 60vh;

  display: flex;

  align-items: center;

  justify-content: center;

}

.page-loading-ring {

  width: 60px;
  height: 60px;

  border-radius: 50%;

  border:
    2px solid
    rgba(212,168,83,0.1);

  border-top:
    2px solid var(--gold);

  animation:
    spin 1s linear infinite;

}
.floating-container {
  position: fixed;
  right: 30px;
  bottom: 30px;
  display: flex;
  flex-direction: column-reverse; /* Menyusun dari bawah ke atas */
  align-items: flex-end;
  gap: 15px; /* Jarak antar elemen agar tidak nempel */
  z-index: 9999;
  pointer-events: none; /* Agar area kosong container tidak menghalangi klik */
}

/* Pastikan elemen di dalamnya bisa diklik kembali */
.floating-container > * {
  pointer-events: auto;
  position: relative !important; /* Batalkan position fixed bawaan komponen */
  right: 0 !important;
  bottom: 0 !important;
}
</style>