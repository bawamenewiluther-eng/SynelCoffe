# NotFound.vue

Simpan file ini di:

```txt
src/Pages/NotFound.vue
```

```vue
<template>

  <section class="notfound-page">

    <!-- BACKGROUND GLOW -->
    <div class="nf-glow glow-1"></div>
    <div class="nf-glow glow-2"></div>

    <!-- CONTENT -->
    <div class="nf-content">

      <div class="nf-code">
        404
      </div>

      <div class="nf-badge">
        — Synel Coffee System
      </div>

      <h1>
        Lost In The
        <em>Coffee Dimension</em>
      </h1>

      <p>
        The page you are searching for seems to have
        vanished into another brew universe.
        Let’s guide you back to the warmth of Synel Coffee.
      </p>

      <router-link
        to="/"
        class="nf-button"
      >

        ☕ Return Home

      </router-link>

    </div>

  </section>

</template>

<style scoped>

.notfound-page {

  position: relative;

  min-height: 100vh;

  overflow: hidden;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 120px 24px;

}

/* =========================
   GLOW EFFECT
========================= */

.nf-glow {

  position: absolute;

  border-radius: 50%;

  filter: blur(90px);

  opacity: 0.18;

}

.glow-1 {

  width: 420px;
  height: 420px;

  top: -120px;
  left: -120px;

  background:
    rgba(212,168,83,0.9);

}

.glow-2 {

  width: 500px;
  height: 500px;

  bottom: -180px;
  right: -180px;

  background:
    rgba(110,60,20,0.9);

}

/* =========================
   CONTENT
========================= */

.nf-content {

  position: relative;

  z-index: 2;

  width: 100%;

  max-width: 900px;

  text-align: center;

}

.nf-code {

  font-size: clamp(120px, 20vw, 260px);

  line-height: 0.8;

  font-weight: 900;

  color:
    rgba(212,168,83,0.08);

  letter-spacing: 12px;

  margin-bottom: 30px;

}

.nf-badge {

  display: inline-block;

  margin-bottom: 26px;

  font-size: 11px;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: var(--gold);

  font-family: 'Space Mono', monospace;

}

.nf-content h1 {

  font-size: clamp(44px, 7vw, 92px);

  line-height: 1;

  margin-bottom: 28px;

  color: var(--cream);

  font-family: 'Playfair Display', serif;

}

.nf-content h1 em {

  display: block;

  color: var(--gold);

  font-style: italic;

}

.nf-content p {

  max-width: 700px;

  margin:
    0 auto 50px;

  line-height: 2;

  color:
    rgba(240,223,200,0.62);

  font-size: 15px;

}

/* =========================
   BUTTON
========================= */

.nf-button {

  display: inline-flex;

  align-items: center;
  justify-content: center;

  height: 62px;

  padding: 0 38px;

  background: var(--gold);

  color: var(--espresso);

  text-decoration: none;

  font-size: 12px;

  font-weight: 800;

  letter-spacing: 3px;

  text-transform: uppercase;

  transition: 0.35s ease;

}

.nf-button:hover {

  transform:
    translateY(-3px);

  background:
    var(--gold-light);

  box-shadow:
    0 20px 45px
    rgba(212,168,83,0.22);

}

/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {

  .nf-content p {

    font-size: 14px;

    line-height: 1.8;

  }

}

</style>