<script setup>


import {
  storeToRefs
}
from 'pinia'

import {
  useAuthStore
}
from '../stores/auth'

const auth =
  useAuthStore()

const {
  user,
  isLogin
}
=
storeToRefs(auth)


</script>
<template>

  <nav class="navbar">

    <!-- LOGO -->
    <router-link
      to="/"
      class="nav-logo"
    >
      <em>Synel</em><span>Coffee</span>
    </router-link>

    <!-- NAVIGATION -->
    <div class="nav-links">

      <!-- MENU -->
      <router-link to="/menu">
        Menu
      </router-link>

      <!-- ABOUT -->
      <router-link to="/my-orders">
        Pesanan
      </router-link>

      <!-- ORDER -->
      <router-link to="/order">
        Order
      </router-link>

        <template v-if="!isLogin">

          <router-link
            to="/login"
            class="btn-nav btn-login"
          >
            Login
          </router-link>

          <router-link
            to="/register"
            class="btn-nav btn-register"
          >
            Register
          </router-link>

        </template>

        <!-- JIKA SUDAH LOGIN -->
        <template v-else>

          <router-link
            to="/profile"
            class="user-profile"
          >
            {{ user.name }}
          </router-link>

        </template>
    </div>

  </nav>

</template>

<style scoped>

/* =========================
   NAVBAR
========================= */

.navbar {

  position: fixed;

  top: 0;
  left: 0;
  right: 0;

  height: 82px;

  display: flex;

  align-items: center;
  justify-content: space-between;

  padding: 0 64px;

  z-index: 1000;

  backdrop-filter: blur(14px);

  background:
    linear-gradient(
      180deg,
      rgba(13,9,5,0.92) 0%,
      rgba(13,9,5,0.45) 60%,
      rgba(13,9,5,0) 100%
    );

  border-bottom:
    1px solid rgba(212,168,83,0.08);

}

/* =========================
   LOGO
========================= */

.nav-logo {

  display: flex;

  align-items: center;

  text-decoration: none;

  font-family: 'Playfair Display', serif;

  font-size: 30px;

  font-weight: 900;

  font-style: italic;

  letter-spacing: 2px;

  color: var(--gold);

  text-shadow:
    0 0 30px rgba(212,168,83,0.35);

}

.nav-logo span {

  color: var(--cream);

  font-style: normal;

}

/* =========================
   NAV LINKS WRAPPER
========================= */

.nav-links {

  display: flex;

  align-items: center;

  gap: 38px;

}

/* =========================
   NORMAL MENU LINKS
========================= */

.nav-links > a:not(.btn-nav) {

  position: relative;

  text-decoration: none;

  font-family: 'Space Mono', monospace;

  font-size: 11px;

  letter-spacing: 2px;

  text-transform: uppercase;

  color: var(--cream);

  opacity: 0.72;

  transition: 0.3s ease;

}

/* HOVER LINE */

.nav-links > a:not(.btn-nav)::after {

  content: '';

  position: absolute;

  left: 0;
  bottom: -8px;

  width: 0%;

  height: 1px;

  background: var(--gold);

  transition: 0.3s ease;

}

/* HOVER */

.nav-links > a:not(.btn-nav):hover {

  opacity: 1;

  color: var(--gold);

}

.nav-links > a:not(.btn-nav):hover::after {

  width: 100%;

}

/* ACTIVE ROUTE */

.nav-links > a:not(.btn-nav).router-link-active {

  color: var(--gold);

  opacity: 1;

}

.nav-links > a:not(.btn-nav).router-link-active::after {

  width: 100%;

}

/* =========================
   BUTTON BASE
========================= */

.btn-nav {

  text-decoration: none;

  position: relative;

  overflow: hidden;

  font-family: 'Space Mono', monospace;

  font-size: 11px;

  letter-spacing: 2px;

  text-transform: uppercase;

  padding: 12px 28px;

  transition: 0.35s ease;

}

/* =========================
   LOGIN BUTTON
========================= */

.btn-login {

  color: var(--gold);

  border:
    1px solid rgba(212,168,83,0.32);

  background:
    rgba(255,255,255,0.01);

}

.btn-login:hover {

  border-color: var(--gold);

  background:
    rgba(212,168,83,0.08);

  box-shadow:
    0 0 25px rgba(212,168,83,0.12);

}

/* =========================
   REGISTER BUTTON
========================= */

.btn-register {

  background: var(--gold);

  color: var(--espresso);

  border:
    1px solid var(--gold);

  font-weight: 700;

}

.btn-register:hover {

  background: var(--gold-light);

  border-color: var(--gold-light);

  transform: translateY(-2px);

  box-shadow:
    0 10px 30px rgba(212,168,83,0.24);

}
.user-profile {

  position: relative;

  display: flex;

  align-items: center;

  gap: 10px;

  text-decoration: none;

  padding: 13px 26px;

  border-radius: 14px;

  background:
    linear-gradient(
      135deg,
      rgba(212,168,83,0.18),
      rgba(124,74,30,0.14)
    );

  border:
    1px solid rgba(212,168,83,0.35);

  color: #fff7e8;

  font-family: 'Space Mono', monospace;

  font-size: 12px;

  font-weight: 700;

  letter-spacing: 2px;

  text-transform: uppercase;

  box-shadow:
    0 0 30px rgba(212,168,83,0.12);

  backdrop-filter: blur(12px);

  transition: 0.35s ease;

}

/* ICON */

.user-profile::before {

  content: '☕';

  font-size: 14px;

}

/* HOVER */

.user-profile:hover {

  transform: translateY(-2px);

  border-color: var(--gold);

  box-shadow:
    0 10px 35px rgba(212,168,83,0.22);

  background:
    linear-gradient(
      135deg,
      rgba(212,168,83,0.24),
      rgba(124,74,30,0.18)
    );

}

/* =========================
   MOBILE
========================= */

@media (max-width: 900px) {

  .navbar {

    padding: 0 24px;

  }

  .nav-links {

    gap: 18px;

  }

  .btn-nav {

    padding: 10px 18px;

  }

}

@media (max-width: 768px) {

  .navbar {

    height: 72px;

  }

  .nav-links > a:not(.btn-nav) {

    display: none;

  }

}

</style>
