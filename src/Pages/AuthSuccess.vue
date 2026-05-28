<template>

  <section class="auth-success-page">

    <!-- GLOW -->
    <div class="success-glow"></div>

    <!-- CARD -->
    <div class="success-card">

      <!-- ICON -->
      <div class="success-icon">
        ☕
      </div>

      <!-- TITLE -->
      <h1>
        Login Successful
      </h1>

      <!-- DESC -->
      <p>
        Welcome back to
        <span>Synel Coffee</span>
      </p>

      <!-- LOADING -->
      <div class="loading-wrap">

        <div class="loading-dot"></div>

        <span>
          Redirecting...
        </span>

      </div>

    </div>

  </section>

</template>

<script>

export default {

  mounted() {

    const token =
      this.$route.query.token

    // simpan token
    // redirect delay
    setTimeout(() => {

      this.$router.push('/')

    }, 2200)

  }

}

</script>

<style scoped>

/* =========================
   PAGE
========================= */

.auth-success-page {

  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;

  position: relative;

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

  width: 500px;
  height: 500px;

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
  max-width: 480px;

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

  width: 110px;
  height: 110px;

  margin:
    0 auto 34px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 52px;

  background:
    linear-gradient(
      135deg,
      rgba(212,168,83,0.24),
      rgba(124,74,30,0.18)
    );

  border:
    1px solid
    rgba(212,168,83,0.24);

  animation:
    floatCup 3s ease infinite;

}

/* =========================
   TEXT
========================= */

h1 {

  font-size: 54px;

  margin-bottom: 18px;

  color: var(--cream);

  font-family:
    'Playfair Display',
    serif;

}

p {

  color:
    rgba(240,223,200,0.68);

  font-size: 16px;

  line-height: 1.8;

  margin-bottom: 44px;

}

p span {

  color: var(--gold);

  font-weight: 700;

}

/* =========================
   LOADING
========================= */

.loading-wrap {

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 14px;

  font-family:
    'Space Mono',
    monospace;

  font-size: 11px;

  letter-spacing: 3px;

  text-transform: uppercase;

  color:
    rgba(240,223,200,0.55);

}

.loading-dot {

  width: 14px;
  height: 14px;

  border-radius: 50%;

  border:
    2px solid
    rgba(212,168,83,0.25);

  border-top-color:
    var(--gold);

  animation:
    spin 0.8s linear infinite;

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

@keyframes floatCup {

  0%,
  100% {

    transform:
      translateY(0px);

  }

  50% {

    transform:
      translateY(-10px);

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

    font-size: 40px;

  }

}

</style>