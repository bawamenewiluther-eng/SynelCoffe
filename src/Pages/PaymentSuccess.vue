<template>

  <section class="success-page">

    <!-- GLOW -->
    <div class="success-glow"></div>

    <!-- CARD -->
    <div class="success-card">

      <!-- CHECK ICON -->
      <div class="success-icon">

        ✓

      </div>

      <!-- TITLE -->
      <h1>

        Payment Successful

      </h1>

      <!-- DESC -->
      <p>

        Pesanan kopimu berhasil dibuat ☕
        <br>
        Terima kasih sudah order di
        <span>Synel Coffee</span>

      </p>

      <!-- BUTTON -->
      <button
        class="back-btn"
        @click="goHome"
      >

        Kembali ke Menu

      </button>

    </div>

  </section>

</template>

<script>

export default {

  mounted() {

    const paid =
      this.$route.query.paid

    // kalau bukan hasil payment
    if (paid !== 'true') {

      this.$router.push('/')

    }

  },

  methods: {

    goHome() {

      this.$router.push('/')

    }

  }

}

</script>

<style scoped>

/* =========================
   PAGE
========================= */

.success-page {

  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  position: relative;

  overflow: hidden;

  background:
    radial-gradient(
      circle at top,
      rgba(212,168,83,0.12),
      transparent 40%
    ),
    #050301;

}

/* =========================
   GLOW
========================= */

.success-glow {

  position: absolute;

  width: 520px;
  height: 520px;

  border-radius: 50%;

  background:
    radial-gradient(
      circle,
      rgba(212,168,83,0.14),
      transparent 70%
    );

  filter: blur(40px);

  animation:
    pulseGlow 4s ease infinite;

}

/* =========================
   CARD
========================= */

.success-card {

  position: relative;

  z-index: 2;

  width: 100%;
  max-width: 520px;

  padding:
    70px 50px;

  text-align: center;

  background:
    rgba(18,10,5,0.92);

  border:
    1px solid
    rgba(212,168,83,0.18);

  backdrop-filter: blur(18px);

  box-shadow:
    0 30px 80px
    rgba(0,0,0,0.45);

  animation:
    fadeUp 0.9s ease;

}

/* =========================
   ICON
========================= */

.success-icon {

  width: 120px;
  height: 120px;

  margin:
    0 auto 36px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 54px;

  font-weight: 700;

  color: white;

  background:
    linear-gradient(
      135deg,
      #3bb273,
      #2d8f5d
    );

  box-shadow:
    0 20px 50px
    rgba(59,178,115,0.25);

}

/* =========================
   TEXT
========================= */

h1 {

  font-size: 56px;

  margin-bottom: 20px;

  color: var(--cream);

  font-family:
    'Playfair Display',
    serif;

}

p {

  line-height: 2;

  font-size: 16px;

  color:
    rgba(240,223,200,0.68);

  margin-bottom: 42px;

}

p span {

  color: var(--gold);

  font-weight: 700;

}

/* =========================
   BUTTON
========================= */

.back-btn {

  width: 100%;

  height: 62px;

  border: none;

  background: var(--gold);

  color: var(--espresso);

  font-family:
    'Space Mono',
    monospace;

  font-size: 12px;

  letter-spacing: 3px;

  text-transform: uppercase;

  font-weight: 700;

  transition: 0.35s ease;

}

.back-btn:hover {

  transform:
    translateY(-2px);

  background:
    var(--gold-light);

  box-shadow:
    0 20px 50px
    rgba(212,168,83,0.24);

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

@keyframes pulseGlow {

  0%,
  100% {

    transform: scale(1);

    opacity: 0.6;

  }

  50% {

    transform: scale(1.12);

    opacity: 1;

  }

}

/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {

  .success-card {

    margin: 24px;

    padding:
      60px 34px;

  }

  h1 {

    font-size: 42px;

  }

}

</style>