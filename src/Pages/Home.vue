<script>

export default {

  data() {

    return {

      scrolled: false,

      cursor: {
        x: 0,
        y: 0
      },

      modal: null,

      currentSlide: 0,

      toast: null,

      cart: [],

      menuItems: [

        {
          id: 1,
          name: 'Matcha Latte',
          tag: 'Signature',
          emoji: '🍵',
          bg: 'linear-gradient(135deg, #1a2e1a 0%, #0d1a0d 100%)',
          price: 'Rp 38K',
          desc: 'Terbuat dari bubuk matcha grade ceremonial Uji, Jepang.'
        },

        {
          id: 2,
          name: 'Cappuccino',
          tag: 'Classic',
          emoji: '☕',
          bg: 'linear-gradient(135deg, #2a1a0a 0%, #1a0e05 100%)',
          price: 'Rp 32K',
          desc: 'Espresso double shot dengan microfoam lembut.'
        },

        {
          id: 3,
          name: 'Cold Brew',
          tag: 'Signature',
          emoji: '🧊',
          bg: 'linear-gradient(135deg, #0a1520 0%, #050d15 100%)',
          price: 'Rp 42K',
          desc: 'Cold extraction 18 jam dengan rasa smooth.'
        },

        {
          id: 4,
          name: 'Espresso Tonic',
          tag: 'Special',
          emoji: '🥃',
          bg: 'linear-gradient(135deg, #1a1005 0%, #0d0800 100%)',
          price: 'Rp 35K',
          desc: 'Perpaduan espresso dan tonic water premium.'
        },

        {
          id: 5,
          name: 'Cortado',
          tag: 'Classic',
          emoji: '🫗',
          bg: 'linear-gradient(135deg, #1f1208 0%, #120b04 100%)',
          price: 'Rp 28K',
          desc: 'Espresso ristretto dengan susu steamed warm.'
        },

        {
          id: 6,
          name: 'Hojicha Latte',
          tag: 'New',
          emoji: '🍂',
          bg: 'linear-gradient(135deg, #2a1a08 0%, #1a1005 100%)',
          price: 'Rp 40K',
          desc: 'Teh hijau Jepang roasted dengan aroma smoky.'
        }

      ],

      processSteps: [

        {
          num:'01',
          icon:'🌱',
          title:'Seleksi Biji',
          desc:'Pemilihan biji kopi grade terbaik.'
        },

        {
          num:'02',
          icon:'🔥',
          title:'Roasting',
          desc:'Roasting presisi untuk rasa optimal.'
        },

        {
          num:'03',
          icon:'⚖️',
          title:'Grinding',
          desc:'Penggilingan segar setiap hari.'
        },

        {
          num:'04',
          icon:'☕',
          title:'Brewing',
          desc:'Diseduh oleh barista profesional.'
        }

      ],

      testimonials: [

        {
          id:1,
          avatar:'☕',
          name:'ARINDA R.',
          role:'Coffee Enthusiast',
          text:'Matcha latte di Synel Coffee luar biasa.'
        },

        {
          id:2,
          avatar:'🍵',
          name:'BAGAS W.',
          role:'Barista',
          text:'Espressonya sangat konsisten.'
        },

        {
          id:3,
          avatar:'🫖',
          name:'CHELSEA M.',
          role:'Food Blogger',
          text:'Cold brew terbaik yang pernah saya coba.'
        }

      ]

    }

  },

  computed: {

    maxSlide() {

      return Math.max(
        0,
        this.menuItems.length - 3
      )

    }

  },

  mounted() {

    window.addEventListener(
      'scroll',
      this.onScroll
    )

    window.addEventListener(
      'mousemove',
      this.onMouseMove
    )

  },

  beforeUnmount() {

    window.removeEventListener(
      'scroll',
      this.onScroll
    )

    window.removeEventListener(
      'mousemove',
      this.onMouseMove
    )

  },

  methods: {

    onScroll() {

      this.scrolled =
        window.scrollY > 60

    },

    onMouseMove(e) {

      this.cursor.x = e.clientX
      this.cursor.y = e.clientY

    },

    scrollTo(target) {

      document
        .querySelector(target)
        ?.scrollIntoView({
          behavior: 'smooth'
        })

    },

    prevSlide() {

      if (this.currentSlide > 0) {

        this.currentSlide--

      }

    },

    nextSlide() {

      if (
        this.currentSlide <
        this.maxSlide
      ) {

        this.currentSlide++

      }

    },

    showToast(msg) {

      this.toast = msg

      setTimeout(() => {

        this.toast = null

      }, 3000)

    }

  }

}

</script>
<template>
    
  <!-- HERO -->
  <section class="hero" id="home">
    <div class="hero-bg"></div>
    <div class="hero-circle"></div>
    <div class="hero-tag">— Artisan Coffee Experience</div>
    <h1 class="hero-title">
      Setiap Cangkir<br>
      <em>Punya Cerita</em>
    </h1>
    <p class="hero-sub">Dari biji pilihan terbaik dunia, diseduh dengan tangan, untuk pengalaman kopi yang tak terlupakan.</p>
    <div class="hero-cta">
      <button class="btn-primary" @click="scrollTo('#menu')"><span>Lihat Menu</span></button>
      <button class="btn-outline" @click="scrollTo('#about')">Cerita Kami</button>
    </div>
    <div class="scroll-hint">
      <span>Scroll</span>
      <div class="scroll-line"></div>
    </div>
  </section>

  <!-- ABOUT -->
  <section class="about-strip" id="about">
    <div class="about-text">
      <h2>Kopi adalah <em>Seni,</em> bukan sekadar minuman</h2>
      <p>Di Synel Coffee, kami percaya bahwa secangkir kopi yang sempurna lahir dari perpaduan antara biji terbaik, teknik yang tepat, dan hati yang penuh dedikasi. Setiap tegukan membawa cerita dari petani hingga cangkirmu.</p>
    </div>
    <div class="about-stats">
      <div class="stat-box">
        <div class="stat-num">12+</div>
        <div class="stat-label">Tahun Pengalaman</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">30+</div>
        <div class="stat-label">Varian Kopi</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">18</div>
        <div class="stat-label">Origin Biji Kopi</div>
      </div>
      <div class="stat-box">
        <div class="stat-num">50K</div>
        <div class="stat-label">Pelanggan Setia</div>
      </div>
    </div>
  </section>

  <!-- MENU -->
  <section class="menu-section" id="menu">
    <div class="section-divider">
      <div class="divider-line"></div>
      <div class="divider-label">Koleksi Pilihan</div>
      <div class="divider-line"></div>
    </div>
    <div class="menu-header">
      <h2>Menu <span>Andalan</span> Kami</h2>
      <p>~~ Diseduh dengan presisi, dinikmati dengan penuh rasa</p>
    </div>

    <div class="menu-slider-wrap">
      <div class="menu-slider" :style="{transform: `translateX(calc(-${currentSlide * (100/3)}% - ${currentSlide * 10}px))`}">
        <div class="menu-card" v-for="item in menuItems" :key="item.id">
          <div class="menu-card-img" :style="{background: item.bg}">{{item.emoji}}</div>
          <div class="menu-card-body">
            <span class="menu-badge">{{item.tag}}</span>
            <h3>{{item.name}}</h3>
            <p>{{item.description}}</p>
            <div class="menu-card-footer">
              <div class="menu-price">{{item.price}} <span>/ cup</span></div>
              <router-link to="/menu" class="btn-add">+ Tambah</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div style="display:flex; align-items:center; justify-content:space-between; margin-top:40px;">
      <div class="slider-arrows">
        <button class="slider-arrow" @click="prevSlide" :disabled="currentSlide === 0">&#8592;</button>
        <button class="slider-arrow" @click="nextSlide" :disabled="currentSlide >= maxSlide">&#8594;</button>
      </div>
      <div class="slider-controls">
        <div class="slider-dot" v-for="n in (maxSlide+1)" :key="n" :class="{active: currentSlide === n-1}" @click="currentSlide = n-1"></div>
      </div>
    </div>
  </section>

  <!-- PROCESS -->
  <section class="process-section">
    <div class="section-divider">
      <div class="divider-line"></div>
      <div class="divider-label">Proses Kami</div>
      <div class="divider-line"></div>
    </div>
    <h2 class="process-title">Dari <em>Biji ke Cangkir</em></h2>
    <div class="process-steps">
      <div class="process-step" v-for="step in processSteps" :key="step.num">
        <div class="step-num">{{step.num}}</div>
        <div class="step-icon">{{step.icon}}</div>
        <div class="step-title">{{step.title}}</div>
        <div class="step-desc">{{step.desc}}</div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="testimonial-section">
    <div class="testi-header">— Kata Mereka —</div>
    <div class="testi-grid">
      <div class="testi-card" v-for="t in testimonials" :key="t.id">
        <div class="testi-quote">"</div>
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">{{t.text}}</p>
        <div class="testi-author">
          <div class="testi-avatar">{{t.avatar}}</div>
          <div>
            <div class="testi-name">{{t.name}}</div>
            <div class="testi-role">{{t.role}}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ORDER CTA -->
  <section class="order-section" id="order">
    <div class="order-label">— Siap Memesan?</div>
    <h2 class="order-title">
      Mulai Harimu
      <em>Dengan Sempurna</em>
    </h2>
    <p class="order-sub">Pesan sekarang dan rasakan pengalaman kopi premium langsung di meja kamu. Pengiriman cepat, rasa tak mengecewakan.</p>
    <router-link to="/menu" class="btn-order">☕ &nbsp; Order Now</router-link>
  </section>
  <!-- MODAL -->
  <div class="modal-overlay" v-if="modal" @click.self="modal=null">
    <div class="modal-box">
      <button class="modal-close" @click="modal=null">✕</button>
    </div>
  </div>

  <!-- TOAST -->
  <div v-if="toast" style="position:fixed;bottom:30px;right:30px;background:var(--gold);color:var(--espresso);padding:14px 24px;font-family:'Space Mono',monospace;font-size:11px;letter-spacing:1px;z-index:500;animation:fadeUp 0.4s ease;">
    ✓ {{toast}}
  </div>
</template>

<style>
    .btn-login {
      color: var(--gold);
      border-color: rgba(212,168,83,0.4);
    }
    .btn-login:hover {
      background: rgba(212,168,83,0.1);
      border-color: var(--gold);
    }
    .btn-register {
      color: var(--espresso);
      background: var(--gold);
      border-color: var(--gold);
    }
    .btn-register:hover {
      background: var(--gold-light);
      border-color: var(--gold-light);
    }

    /* ─── HERO ─── */
    .hero {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 0 100px;
      position: relative;
      overflow: hidden;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 60% 80% at 80% 50%, rgba(124,74,30,0.2) 0%, transparent 60%),
        radial-gradient(ellipse 40% 60% at 20% 20%, rgba(212,168,83,0.05) 0%, transparent 50%),
        linear-gradient(135deg, var(--espresso) 0%, var(--roast) 50%, #100a04 100%);
    }
    .hero-circle {
      position: absolute;
      right: 8%;
      top: 50%;
      transform: translateY(-50%);
      width: 520px; height: 520px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(124,74,30,0.35) 0%, rgba(44,26,14,0.6) 50%, transparent 70%);
      border: 1px solid rgba(212,168,83,0.12);
      animation: pulse 6s ease-in-out infinite;
    }
    .hero-circle::before {
      content: '☕';
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      font-size: 160px;
      opacity: 0.18;
      filter: sepia(1) saturate(0.5);
    }
    @keyframes pulse {
      0%, 100% { transform: translateY(-50%) scale(1); opacity: 1; }
      50% { transform: translateY(-50%) scale(1.04); opacity: 0.85; }
    }
    .hero-tag {
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 24px;
      opacity: 0;
      animation: fadeUp 0.8s 0.3s ease forwards;
    }
    .hero-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(64px, 8vw, 110px);
      font-weight: 900;
      line-height: 0.95;
      letter-spacing: -2px;
      max-width: 700px;
      opacity: 0;
      animation: fadeUp 0.8s 0.5s ease forwards;
    }
    .hero-title em {
      font-style: italic;
      color: var(--gold);
      display: block;
    }
    .hero-sub {
      margin-top: 32px;
      font-size: 20px;
      font-weight: 300;
      color: rgba(240,223,200,0.65);
      max-width: 420px;
      line-height: 1.7;
      opacity: 0;
      animation: fadeUp 0.8s 0.7s ease forwards;
    }
    .hero-cta {
      display: flex;
      gap: 20px;
      margin-top: 48px;
      opacity: 0;
      animation: fadeUp 0.8s 0.9s ease forwards;
    }
    .btn-primary {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 16px 40px;
      background: var(--gold);
      color: var(--espresso);
      border: none;
      cursor: none;
      font-weight: 700;
      transition: all 0.3s;
      position: relative;
      overflow: hidden;
    }
    .btn-primary::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--gold-light);
      transform: translateX(-100%);
      transition: transform 0.4s ease;
    }
    .btn-primary:hover::after { transform: translateX(0); }
    .btn-primary span { position: relative; z-index: 1; }
    .btn-outline {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      letter-spacing: 2px;
      text-transform: uppercase;
      padding: 16px 40px;
      background: transparent;
      color: var(--cream);
      border: 1px solid rgba(240,223,200,0.25);
      cursor: none;
      transition: all 0.3s;
    }
    .btn-outline:hover {
      border-color: var(--gold);
      color: var(--gold);
    }
    .scroll-hint {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      opacity: 0.4;
      animation: fadeIn 1s 1.5s ease forwards;
    }
    .scroll-hint span {
      font-family: 'Space Mono', monospace;
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
    }
    .scroll-line {
      width: 1px;
      height: 50px;
      background: linear-gradient(180deg, var(--gold) 0%, transparent 100%);
      animation: scrollDown 2s ease-in-out infinite;
    }
    @keyframes scrollDown {
      0% { transform: scaleY(0); transform-origin: top; }
      50% { transform: scaleY(1); transform-origin: top; }
      50.01% { transform: scaleY(1); transform-origin: bottom; }
      100% { transform: scaleY(0); transform-origin: bottom; }
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 0.4; }
    }

    /* ─── DIVIDER ─── */
    .section-divider {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 0 100px;
      margin-bottom: 60px;
    }
    .divider-line { flex: 1; height: 1px; background: linear-gradient(90deg, transparent, rgba(212,168,83,0.3), transparent); }
    .divider-label {
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--gold);
    }

    /* ─── ABOUT STRIP ─── */
    .about-strip {
      padding: 100px 100px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
      background: var(--roast);
      border-top: 1px solid rgba(212,168,83,0.1);
      border-bottom: 1px solid rgba(212,168,83,0.1);
    }
    .about-text h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(36px, 4vw, 54px);
      font-weight: 700;
      line-height: 1.15;
      margin-bottom: 24px;
    }
    .about-text h2 em { font-style: italic; color: var(--gold); }
    .about-text p {
      color: rgba(240,223,200,0.65);
      line-height: 1.8;
      font-weight: 300;
      font-size: 18px;
    }
    .about-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
    .stat-box {
      border: 1px solid rgba(212,168,83,0.15);
      padding: 32px 24px;
      background: rgba(212,168,83,0.03);
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s, background 0.3s;
    }
    .stat-box:hover {
      border-color: rgba(212,168,83,0.4);
      background: rgba(212,168,83,0.07);
    }
    .stat-box::before {
      content: '';
      position: absolute;
      top: 0; left: 0;
      width: 3px; height: 100%;
      background: var(--gold);
      opacity: 0.6;
    }
    .stat-num {
      font-family: 'Playfair Display', serif;
      font-size: 52px;
      font-weight: 900;
      color: var(--gold);
      line-height: 1;
    }
    .stat-label {
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(240,223,200,0.5);
      margin-top: 8px;
    }

    /* ─── MENU SECTION ─── */
    .menu-section {
      padding: 100px 100px;
    }
    .menu-header {
      margin-bottom: 60px;
    }
    .menu-header h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(40px, 5vw, 68px);
      font-weight: 900;
      font-style: italic;
    }
    .menu-header h2 span { color: var(--gold); }
    .menu-header p {
      color: rgba(240,223,200,0.5);
      font-weight: 300;
      margin-top: 12px;
      font-size: 16px;
      font-family: 'Space Mono', monospace;
      letter-spacing: 1px;
    }

    /* Slider */
    .menu-slider-wrap {
      position: relative;
      overflow: hidden;
    }
    .menu-slider {
      display: flex;
      gap: 30px;
      transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1);
    }
    .menu-card {
      flex: 0 0 calc(33.333% - 20px);
      background: var(--roast);
      border: 1px solid rgba(212,168,83,0.1);
      overflow: hidden;
      position: relative;
      transition: border-color 0.4s, transform 0.4s;
      cursor: none;
    }
    .menu-card:hover {
      border-color: rgba(212,168,83,0.35);
      transform: translateY(-6px);
    }
    .menu-card-img {
      height: 240px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 90px;
      position: relative;
      overflow: hidden;
    }
    .menu-card-img::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent 40%, var(--roast) 100%);
    }
    .menu-card-body { padding: 28px 32px 36px; }
    .menu-badge {
      font-family: 'Space Mono', monospace;
      font-size: 9px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--gold);
      background: rgba(212,168,83,0.1);
      padding: 4px 12px;
      display: inline-block;
      margin-bottom: 14px;
      border: 1px solid rgba(212,168,83,0.2);
    }
    .menu-card h3 {
      font-family: 'Playfair Display', serif;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .menu-card p {
      font-size: 15px;
      line-height: 1.75;
      color: rgba(240,223,200,0.58);
      font-weight: 300;
      margin-bottom: 20px;
    }
    .menu-card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid rgba(212,168,83,0.1);
      padding-top: 18px;
      margin-top: 8px;
    }
    .menu-price {
      font-family: 'Playfair Display', serif;
      font-size: 26px;
      font-weight: 700;
      color: var(--gold);
    }
    .menu-price span {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      color: rgba(240,223,200,0.4);
      font-weight: 400;
    }
    .btn-add {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      letter-spacing: 1px;
      padding: 9px 20px;
      border: 1px solid rgba(212,168,83,0.4);
      background: transparent;
      color: var(--gold);
      cursor: none;
      transition: all 0.3s;
    }
    .btn-add:hover {
      background: var(--gold);
      color: var(--espresso);
    }

    /* Slider nav */
    .slider-controls {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-top: 40px;
    }
    .slider-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      border: 1px solid rgba(212,168,83,0.5);
      background: transparent;
      cursor: none;
      transition: all 0.3s;
    }
    .slider-dot.active {
      background: var(--gold);
      border-color: var(--gold);
    }
    .slider-arrows {
      display: flex;
      gap: 12px;
      margin-top: 32px;
    }
    .slider-arrow {
      width: 48px; height: 48px;
      border: 1px solid rgba(212,168,83,0.3);
      background: transparent;
      color: var(--gold);
      font-size: 18px;
      cursor: none;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
    }
    .slider-arrow:hover {
      background: var(--gold);
      color: var(--espresso);
      border-color: var(--gold);
    }
    .slider-arrow:disabled { opacity: 0.25; pointer-events: none; }

    /* ─── PROCESS ─── */
    .process-section {
      padding: 100px 100px;
      background: linear-gradient(180deg, var(--espresso) 0%, var(--roast) 50%, var(--espresso) 100%);
    }
    .process-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(36px, 4vw, 56px);
      font-weight: 900;
      margin-bottom: 60px;
      text-align: center;
    }
    .process-title em { font-style: italic; color: var(--gold); }
    .process-steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2px;
    }
    .process-step {
      background: rgba(212,168,83,0.03);
      border: 1px solid rgba(212,168,83,0.1);
      padding: 40px 30px;
      position: relative;
      transition: background 0.3s;
    }
    .process-step:hover { background: rgba(212,168,83,0.07); }
    .step-num {
      font-family: 'Playfair Display', serif;
      font-size: 72px;
      font-weight: 900;
      color: rgba(212,168,83,0.08);
      position: absolute;
      top: 16px; right: 20px;
      line-height: 1;
    }
    .step-icon { font-size: 36px; margin-bottom: 20px; }
    .step-title {
      font-family: 'Playfair Display', serif;
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;
    }
    .step-desc {
      font-size: 14px;
      color: rgba(240,223,200,0.5);
      line-height: 1.7;
      font-weight: 300;
    }

    /* ─── TESTIMONIAL ─── */
    .testimonial-section {
      padding: 100px 100px;
      background: var(--bark);
      border-top: 1px solid rgba(212,168,83,0.1);
      border-bottom: 1px solid rgba(212,168,83,0.1);
    }
    .testi-header {
      font-family: 'Playfair Display', serif;
      font-size: clamp(32px, 3.5vw, 50px);
      font-weight: 900;
      font-style: italic;
      text-align: center;
      color: var(--gold);
      margin-bottom: 60px;
    }
    .testi-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
    }
    .testi-card {
      border: 1px solid rgba(212,168,83,0.12);
      padding: 36px;
      background: rgba(13,9,5,0.4);
      position: relative;
      transition: border-color 0.3s;
    }
    .testi-card:hover { border-color: rgba(212,168,83,0.3); }
    .testi-quote {
      font-family: 'Playfair Display', serif;
      font-size: 60px;
      color: var(--gold);
      opacity: 0.3;
      line-height: 0.5;
      margin-bottom: 16px;
    }
    .testi-text {
      font-size: 17px;
      font-weight: 300;
      line-height: 1.8;
      color: rgba(240,223,200,0.75);
      margin-bottom: 24px;
    }
    .testi-author {
      display: flex;
      align-items: center;
      gap: 12px;
      border-top: 1px solid rgba(212,168,83,0.1);
      padding-top: 20px;
    }
    .testi-avatar {
      width: 40px; height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--caramel), var(--bark));
      border: 1px solid rgba(212,168,83,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    .testi-name {
      font-family: 'Space Mono', monospace;
      font-size: 11px;
      letter-spacing: 1px;
      color: var(--gold);
    }
    .testi-role {
      font-size: 12px;
      color: rgba(240,223,200,0.4);
      margin-top: 2px;
    }
    .testi-stars { color: var(--gold); font-size: 13px; }

    /* ─── ORDER CTA ─── */
    .order-section {
      padding: 120px 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      background: radial-gradient(ellipse 80% 100% at 50% 50%, rgba(124,74,30,0.2) 0%, var(--espresso) 60%);
      position: relative;
      overflow: hidden;
    }
    .order-section::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='rgba(212,168,83,0.08)'/%3E%3C/svg%3E");
    }
    .order-label {
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 20px;
      opacity: 0.8;
    }
    .order-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(48px, 6vw, 88px);
      font-weight: 900;
      line-height: 1;
      margin-bottom: 24px;
      position: relative;
    }
    .order-title em { font-style: italic; color: var(--gold); display: block; }
    .order-sub {
      color: rgba(240,223,200,0.5);
      font-size: 18px;
      font-weight: 300;
      max-width: 500px;
      line-height: 1.7;
      margin-bottom: 56px;
    }
    .btn-order {
      font-family: 'Space Mono', monospace;
      font-size: 13px;
      letter-spacing: 3px;
      text-transform: uppercase;
      padding: 22px 72px;
      background: var(--gold);
      color: var(--espresso);
      border: none;
      cursor: none;
      font-weight: 700;
      position: relative;
      overflow: hidden;
      transition: all 0.3s;
      z-index: 1;
    }
    .btn-order:hover {
      background: var(--gold-light);
      letter-spacing: 4px;
      box-shadow: 0 0 60px rgba(212,168,83,0.35);
    }
    /* ─── MODAL ─── */
       /* Responsive */
    @media (max-width: 1024px) {
      nav { padding: 0 30px; }
      .hero { padding: 0 40px; }
      .about-strip, .menu-section, .process-section,
      .testimonial-section, .order-section, footer { padding-left: 40px; padding-right: 40px; }
      .menu-card { flex: 0 0 calc(50% - 15px); }
      .process-steps { grid-template-columns: repeat(2, 1fr); }
      .testi-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 768px) {
      body { cursor: auto; }
      .cursor, .cursor-ring { display: none; }
      nav { padding: 0 20px; }
      .nav-links { gap: 12px; }
      .hero { padding: 80px 20px 60px; }
      .hero-circle { display: none; }
      .about-strip { grid-template-columns: 1fr; gap: 40px; padding: 60px 20px; }
      .menu-section, .process-section, .testimonial-section, .order-section { padding: 60px 20px; }
      footer { padding: 40px 20px 30px; }
      .menu-card { flex: 0 0 calc(85vw); }
      .process-steps { grid-template-columns: 1fr 1fr; }
      .testi-grid { grid-template-columns: 1fr; }
      .footer-top { grid-template-columns: 1fr; gap: 30px; }
      .section-divider { padding: 0 20px; }
      .footer-bottom { flex-direction: column; gap: 16px; }
    }
</style>
