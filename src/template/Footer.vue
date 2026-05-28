<template>
    
  <!-- FOOTER -->
  <footer>
    <div class="footer-top">
      <div>
        <div class="footer-logo">Synel Coffee</div>
        <p class="footer-desc">Merayakan kopi sebagai seni sejak 2012. Setiap cangkir adalah undangan untuk memperlambat langkah dan menikmati momen.</p>
      </div>
      <div class="footer-col">
        <h4>Menu</h4>
        <ul>
          <li><a href="#">Espresso Series</a></li>
          <li><a href="#">Matcha Series</a></li>
          <li><a href="#">Cold Brew</a></li>
          <li><a href="#">Seasonal Special</a></li>
          <li><a href="#">Pastry & Food</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Info</h4>
        <ul>
          <li><a href="#">Tentang Kami</a></li>
          <li><a href="#">Karir</a></li>
          <li><a href="#">Franchise</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Kontak</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024  SYNEL COFFEE. ALL RIGHTS RESERVED.</p>
      <div class="footer-socials">
        <a class="social-icon" href="#">IG</a>
        <a class="social-icon" href="#">TK</a>
        <a class="social-icon" href="#">TW</a>
        <a class="social-icon" href="#">YT</a>
      </div>
    </div>
  </footer>


</template>

<style>
        /* ─── FOOTER ─── */
    footer {
      background: #070503;
      padding: 60px 100px 40px;
      border-top: 1px solid rgba(212,168,83,0.1);
    }
    .footer-top {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 60px;
      margin-bottom: 48px;
    }
    .footer-logo {
      font-family: 'Playfair Display', serif;
      font-size: 32px;
      font-weight: 900;
      font-style: italic;
      color: var(--gold);
      margin-bottom: 16px;
    }
    .footer-desc {
      color: rgba(240,223,200,0.4);
      font-weight: 300;
      font-size: 15px;
      line-height: 1.7;
      max-width: 280px;
    }
    .footer-col h4 {
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 20px;
    }
    .footer-col ul { list-style: none; }
    .footer-col ul li { margin-bottom: 10px; }
    .footer-col ul li a {
      color: rgba(240,223,200,0.45);
      text-decoration: none;
      font-size: 15px;
      font-weight: 300;
      transition: color 0.3s;
    }
    .footer-col ul li a:hover { color: var(--gold); }
    .footer-bottom {
      border-top: 1px solid rgba(212,168,83,0.08);
      padding-top: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-bottom p {
      font-family: 'Space Mono', monospace;
      font-size: 10px;
      letter-spacing: 1px;
      color: rgba(240,223,200,0.2);
    }
    .footer-socials {
      display: flex;
      gap: 16px;
    }
    .social-icon {
      width: 34px; height: 34px;
      border: 1px solid rgba(212,168,83,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(240,223,200,0.4);
      font-size: 14px;
      transition: all 0.3s;
      text-decoration: none;
    }
    .social-icon:hover {
      border-color: var(--gold);
      color: var(--gold);
      background: rgba(212,168,83,0.07);
    }

</style>