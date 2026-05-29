
<template>

  <section class="profile-page">

    <!-- BACKGROUND -->
    <div class="profile-bg"></div>

    <!-- GLOW -->
    <div class="profile-glow"></div>

    <!-- CARD -->
    <div class="profile-card">

      <!-- TOP -->
      <div class="profile-top">

        <div class="profile-avatar">
          ☕
        </div>

        <div>

          <div class="profile-tag">
            — Synel Member
          </div>

          <h1 class="profile-name">
            {{ user.name }}
          </h1>

          <p class="profile-email">
            {{ user.email }}
          </p>

        </div>

      </div>

      <!-- INFO -->
      <div class="profile-info">

        <div class="info-box">

          <div class="info-label">
            Member Since
          </div>

          <div class="info-value">
            Premium Customer
          </div>

        </div>

        <div class="info-box">

          <div class="info-label">
            Status
          </div>

          <div class="info-value active">
            Active
          </div>

        </div>

      </div>

      <!-- ACTION -->
      <button
        class="btn-logout"
        @click="handleLogout"
      >

        Logout

      </button>

    </div>

  </section>

</template>

<script>

import axios from '../axios'

export default {

  data() {

    return {

      user: {}

    }

  },

  async mounted() {

    try {

      const response = await axios.get(
      'https://synelcoffebackend-production.up.railway.app/api/user'
      )

      this.user = response.data

    } catch (error) {

      window.location.href = '/login'

    }

  },

  methods: {

    async handleLogout() {

      try {

        await axios.post(
          'https://synelcoffebackend-production.up.railway.app/logout'
        )

        window.location.href = '/login'

      } catch (error) {

        console.error(error)

      }

    }

  }

}

</script>

<style scoped>

/* =========================
   PAGE
========================= */

.profile-page {

  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  position: relative;

  overflow: hidden;

  padding: 120px 24px;

}

/* =========================
   BACKGROUND
========================= */

.profile-bg {

  position: absolute;

  inset: 0;

  background:

    radial-gradient(
      ellipse 60% 80% at 80% 50%,
      rgba(124,74,30,0.16) 0%,
      transparent 60%
    ),

    radial-gradient(
      ellipse 40% 60% at 20% 20%,
      rgba(212,168,83,0.05) 0%,
      transparent 50%
    ),

    linear-gradient(
      135deg,
      var(--espresso) 0%,
      var(--roast) 50%,
      #100a04 100%
    );

}

/* =========================
   GLOW
========================= */

.profile-glow {

  position: absolute;

  width: 540px;
  height: 540px;

  border-radius: 50%;

  background:

    radial-gradient(
      circle,
      rgba(212,168,83,0.12) 0%,
      transparent 70%
    );

  filter: blur(40px);

}

/* =========================
   CARD
========================= */

.profile-card {

  position: relative;

  z-index: 2;

  width: 100%;

  max-width: 520px;

  padding: 56px 48px;

  background:
    rgba(26,16,8,0.82);

  border:
    1px solid rgba(212,168,83,0.18);

  backdrop-filter: blur(18px);

  overflow: hidden;

}

/* =========================
   TOP
========================= */

.profile-top {

  display: flex;

  align-items: center;

  gap: 24px;

  margin-bottom: 42px;

}

/* =========================
   AVATAR
========================= */

.profile-avatar {

  width: 90px;

  height: 90px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 36px;

  background:
    linear-gradient(
      135deg,
      rgba(212,168,83,0.24),
      rgba(124,74,30,0.18)
    );

  border:
    1px solid rgba(212,168,83,0.3);

  box-shadow:
    0 0 40px rgba(212,168,83,0.12);

}

/* =========================
   TAG
========================= */

.profile-tag {

  font-family: 'Space Mono', monospace;

  font-size: 10px;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: var(--gold);

  margin-bottom: 10px;

}

/* =========================
   NAME
========================= */

.profile-name {

  font-family: 'Playfair Display', serif;

  font-size: 42px;

  font-style: italic;

  margin-bottom: 10px;

}

/* =========================
   EMAIL
========================= */

.profile-email {

  color:
    rgba(240,223,200,0.58);

  font-size: 16px;

}

/* =========================
   INFO
========================= */

.profile-info {

  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 18px;

  margin-bottom: 40px;

}

.info-box {

  padding: 24px;

  background:
    rgba(255,255,255,0.03);

  border:
    1px solid rgba(212,168,83,0.12);

}

.info-label {

  font-family: 'Space Mono', monospace;

  font-size: 10px;

  letter-spacing: 2px;

  text-transform: uppercase;

  color:
    rgba(240,223,200,0.4);

  margin-bottom: 12px;

}

.info-value {

  font-size: 18px;

  font-weight: 700;

  color: var(--cream);

}

.info-value.active {

  color: var(--gold);

}

/* =========================
   LOGOUT BUTTON
========================= */

.btn-logout {

  width: 100%;

  height: 58px;

  border: none;

  background:
    linear-gradient(
      135deg,
      #ff6b6b,
      #c44536
    );

  color: white;

  font-family: 'Space Mono', monospace;

  font-size: 11px;

  letter-spacing: 3px;

  text-transform: uppercase;

  font-weight: 700;

  transition: 0.35s ease;

}

.btn-logout:hover {

  transform: translateY(-2px);

  box-shadow:
    0 12px 30px rgba(255,107,107,0.22);

}

/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {

  .profile-card {

    padding: 42px 28px;

  }

  .profile-top {

    flex-direction: column;

    text-align: center;

  }

  .profile-name {

    font-size: 34px;

  }

  .profile-info {

    grid-template-columns: 1fr;

  }

}

</style>


