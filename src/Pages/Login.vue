<template>
  <section class="login-page">

    <!-- BACKGROUND -->
    <div class="login-bg"></div>

    <!-- GLOW -->
    <div class="login-glow"></div>

    <!-- LOGIN CARD -->
    <div class="login-card">

      <div class="login-tag">
        — Selamat Datang Kembali
      </div>

      <h1 class="login-title">
        Login
      </h1>

      <p class="login-sub">
        Masuk untuk menikmati pengalaman
        premium bersama Synel Coffee.
      </p>
      <transition name="toast">
          <div
              v-if="toast.show"
              class="premium-toast"
              :class="toast.type"
            >
              <div class="toast-inner">

                <div class="toast-icon">

                  {{ toast.type === 'success' ? '✓' : '⚠' }}

                </div>

                <div class="toast-content">

                  <div class="toast-title">

                    {{
                      toast.type === 'success'
                        ? 'Success'
                        : 'Authentication Failed'
                    }}

                  </div>

                  <div class="toast-message">

                    {{ toast.message }}

                  </div>

                </div>

              </div>

            </div>

        </transition>


      <!-- FORM -->
      <form
        class="login-form"
        @submit.prevent="handleLogin"
      >

        <!-- EMAIL -->
        <div class="form-group">

          <label>
            Email
          </label>

          <input
            type="email"
            v-model="email"
            placeholder="Synel@email.com"
          />

        </div>

        <!-- PASSWORD -->
        <div class="form-group">

          <label>
            Password
          </label>

        <div class="password-wrapper">

        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          placeholder="••••••••"
        />

        <button
          type="button"
          class="toggle-password"
          @click="showPassword = !showPassword"
        >
          {{ showPassword ? '👀' : '👁️' }}
        </button>
      </div>
        </div>
        <router-link
          to="/forgot-password"
          class="forgot-link"
        >

          Forgot Password?

        </router-link>
        
        <!-- BUTTON -->
        <button
          type="submit"
          class="btn-login-submit"
        >
          Masuk
</button>
      <button
      type="button"
        class="google-btn"
        @click="loginGoogle"
      >

        <span class="google-icon">
          G
        </span>

        Login with Google

      </button>
      </form>
      <!-- SWITCH -->
      <div class="login-footer">

        Belum punya akun?

        <router-link to="/register">
          Register
        </router-link>
      </div>
    </div>
  </section>
<!-- LOADING -->

<div
  v-if="loading"
  class="loading-overlay"
>

  <div class="premium-loader">

    <div class="ring ring-1"></div>

    <div class="ring ring-2"></div>

    <div class="ring ring-3"></div>

    <div class="coffee-core">
      ☕
    </div>

  </div>

  <div class="loading-text">

    Tunggu Sebentar...

  </div>

</div>

</template>

<script>
  import axios from '../axios'
  import { useAuthStore }
  from '../stores/auth'

export default {

  data() {
   return {

      email: '',

      password: '',

      showPassword: false,
      loading: false,
      toast: {

          show: false,

          type: 'success',

          message: ''

        }

      }

  },

  methods: {
    showToast(type, message) {

        this.toast.show = true

        this.toast.type = type

        this.toast.message = message

        setTimeout(() => {

          this.toast.show = false

        }, 3500)

      },
    async handleLogin() {
      const auth =
       useAuthStore()
        this.loading = true
        

        // VALIDATION
        if (
          !this.email ||
          !this.password
        ) {

          this.showToast(
            'error',
            'Semua field wajib diisi'
          )

          this.loading = false

          return

        }

        try {

          // AMBIL CSRF COOKIE
         await axios.get('/sanctum/csrf-cookie')

          const token = decodeURIComponent(
            document.cookie
              .split('; ')
              .find(c => c.startsWith('XSRF-TOKEN='))
              ?.split('=')[1] || ''
          )

          console.log('TOKEN =', token)

          await axios.post(
            '/login',
            {
              email: this.email,
              password: this.password
            },
            {
              headers: {
                'X-XSRF-TOKEN': token
              }
            }
          )

          await auth.fetchUser()

          // SUCCESS
          this.showToast(
            'success',
            'Selamat Datang di Synel Coffee ☕'
          )

          // RELOAD APP
          setTimeout(() => {

            this.$router.push('/')

          }, 1800)
          

        } catch (error) {

          console.error(error)

          this.showToast(

            'error',

            'Email atau password salah'

          )

        }finally {

          this.loading = false

        }
      },
        loginGoogle() {

      window.location.href =
        'https://synelcoffebackend-production.up.railway.app/auth/google/redirect'
       }
  }

}
</script>

<style scoped>

/* =========================
   PAGE
========================= */
.google-btn {

  width: 100%;
  margin-top: 10px;
  height: 62px;

  border: none;

  border-radius: 18px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 14px;

  background:
    rgba(255,255,255,0.04);

  border:
    1px solid
    rgba(255,255,255,0.08);

  color: var(--cream);

  font-size: 13px;

  font-weight: 600;

  letter-spacing: 1px;

  transition: 0.35s ease;

  backdrop-filter: blur(18px);

  cursor: pointer;

}

/* HOVER */

.google-btn:hover {

  transform:
    translateY(-3px);

  border-color:
    rgba(212,168,83,0.28);

  background:
    rgba(255,255,255,0.06);

  box-shadow:
    0 16px 40px
    rgba(212,168,83,0.12);

}

/* ICON */

.google-icon {

  width: 34px;
  height: 34px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  background: white;

  color: #DB4437;

  font-weight: 800;

  font-size: 16px;

}
.login-page {

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

.login-bg {

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

.login-glow {

  position: absolute;

  width: 500px;
  height: 500px;

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

.login-card {

  position: relative;

  z-index: 2;

  width: 100%;

  max-width: 440px;

  padding: 56px 48px;

  background:
    rgba(26,16,8,0.82);

  border:
    1px solid rgba(212,168,83,0.18);

  backdrop-filter: blur(18px);
  overflow: hidden;

}

/* =========================
   TAG
========================= */

.login-tag {

  font-family: 'Space Mono', monospace;

  font-size: 9px;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: var(--gold);

  margin-bottom: 18px;

}

/* =========================
   TITLE
========================= */

.login-title {

  font-family: 'Playfair Display', serif;

  font-size: 56px;

  font-weight: 700;

  font-style: italic;

  margin-bottom: 16px;

}

/* =========================
   SUBTEXT
========================= */

.login-sub {

  color:
    rgba(240,223,200,0.58);

  font-size: 17px;

  line-height: 1.8;

  font-weight: 300;

  margin-bottom: 40px;

}

/* =========================
   FORM
========================= */

.login-form {

  display: flex;

  flex-direction: column;

}

/* =========================
   FORM GROUP
========================= */

.form-group {

  margin-bottom: 22px;

}

/* =========================
   LABEL
========================= */

.form-group label {

  display: block;

  font-family: 'Space Mono', monospace;

  font-size: 10px;

  letter-spacing: 2px;

  text-transform: uppercase;

  color:
    rgba(240,223,200,0.5);

  margin-bottom: 10px;

}

/* =========================
   INPUT
========================= */

.form-group input {

  width: 100%;

  height: 56px;

  padding: 0 18px;

  background:
    rgba(255,255,255,0.04);

  border:
    1px solid rgba(212,168,83,0.2);

  color: var(--cream);

  font-family: 'Cormorant Garamond', serif;

  font-size: 18px;

  outline: none;

  transition: 0.3s;

}

.form-group input:focus {

  border-color: var(--gold);

}

.form-group input::placeholder {

  color:
    rgba(240,223,200,0.25);

}

/* =========================
   BUTTON
========================= */

.btn-login-submit {

  width: 100%;

  height: 58px;

  margin-top: 8px;

  background: var(--gold);

  color: var(--espresso);

  border: none;

  font-family: 'Space Mono', monospace;

  font-size: 11px;

  letter-spacing: 2px;

  text-transform: uppercase;

  font-weight: 700;

  transition: 0.3s;

}

.btn-login-submit:hover {

  background: var(--gold-light);

  box-shadow:
    0 10px 30px rgba(212,168,83,0.18);

}
/* =========================
   PASSWORD WRAPPER
========================= */

.password-wrapper {

  position: relative;

  display: flex;

  align-items: center;

}

/* INPUT */

.password-wrapper input {

  width: 100%;

}

/* TOGGLE BUTTON */

.toggle-password {

  position: absolute;

  right: 16px;

  background: transparent;

  border: none;

  cursor: pointer;

  font-size: 18px;

  color: var(--gold);

  opacity: 0.7;

  transition: 0.3s;

}

.toggle-password:hover {

  opacity: 1;

}

/* =========================
   FOOTER
========================= */

.login-footer {

  margin-top: 24px;

  text-align: center;

  font-size: 15px;

  color:
    rgba(240,223,200,0.4);

}

.login-footer a {

  color: var(--gold);

  text-decoration: none;

}
/* =========================
   PREMIUM LOADING
========================= */

.loading-overlay {

  position: fixed;

  inset: 0;

  background:
    rgba(7,5,3,0.82);

  backdrop-filter: blur(12px);

  z-index: 101;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

}

/* =========================
   LOADER WRAPPER
========================= */

.premium-loader {

  position: relative;

  width: 140px;

  height: 140px;

  display: flex;

  align-items: center;

  justify-content: center;

}

/* =========================
   RINGS
========================= */

.ring {

  position: absolute;

  border-radius: 50%;

  border-style: solid;

  animation:
    rotateLoader linear infinite;

}

/* OUTER */

.ring-1 {

  width: 140px;

  height: 140px;

  border-width: 2px;

  border-color:
    rgba(212,168,83,0.15);

  border-top-color:
    var(--gold);

  animation-duration: 2.4s;

  box-shadow:
    0 0 40px rgba(212,168,83,0.22);

}

/* MIDDLE */

.ring-2 {

  width: 104px;

  height: 104px;

  border-width: 2px;

  border-color:
    rgba(124,74,30,0.15);

  border-right-color:
    var(--caramel);

  animation-duration: 1.8s;

  animation-direction: reverse;

}

/* INNER */

.ring-3 {

  width: 72px;

  height: 72px;

  border-width: 2px;

  border-color:
    rgba(240,223,200,0.08);

  border-bottom-color:
    var(--cream);

  animation-duration: 1.2s;

}

/* =========================
   CENTER ICON
========================= */

.coffee-core {

  width: 54px;

  height: 54px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 22px;

  background:
    radial-gradient(
      circle,
      rgba(212,168,83,0.18) 0%,
      rgba(124,74,30,0.12) 100%
    );

  border:
    1px solid rgba(212,168,83,0.22);

  box-shadow:
    0 0 25px rgba(212,168,83,0.18);

  animation:
    pulseCoffee 2s ease-in-out infinite;

}

/* =========================
   TEXT
========================= */

.loading-text {

  margin-top: 28px;

  font-family: 'Space Mono', monospace;

  font-size: 11px;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: var(--gold);

  opacity: 0.82;

}

/* =========================
   PREMIUM TOAST
========================= */

.premium-toast {

  position: absolute;

  top: 24px;

  right: 24px;

  width: 300px;

  padding: 18px;

  display: flex;

  align-items: center;

  gap: 14px;

  border-radius: 18px;

  backdrop-filter: blur(20px);

  background:
    linear-gradient(
      135deg,
      rgba(26,16,8,0.95),
      rgba(13,9,5,0.92)
    );

  border:
    1px solid rgba(212,168,83,0.18);

  box-shadow:
    0 10px 30px rgba(0,0,0,0.35);

  z-index: 50;

}

/* SUCCESS */

.premium-toast.success {

  border-color:
    rgba(212,168,83,0.25);

}

/* ERROR */

.premium-toast.error {

  border-color:
    rgba(255,90,90,0.25);
}
/* =========================
   TOAST ANIMATION
========================= */

.toast-enter-active,
.toast-leave-active {

  transition:
    all 0.5s cubic-bezier(0.22,1,0.36,1);

}

/* MASUK */

.toast-enter-from {

  opacity: 0;

  transform:
    translateX(120%);

}

/* KELUAR */

.toast-leave-to {

  opacity: 0;

  transform:
    translateX(120%);

}
.toast-inner {

  display: flex;

  align-items: center;

  gap: 14px;

  width: 100%;

}

.premium-toast.error .toast-inner {

  animation:
    toastShake 0.45s ease;

}
@keyframes toastShake {

  0% {

    transform: translateX(0);

  }

  20% {

    transform: translateX(-8px);

  }

  40% {

    transform: translateX(8px);

  }

  60% {

    transform: translateX(-6px);

  }

  80% {

    transform: translateX(6px);

  }

  100% {

    transform: translateX(0);

  }

}

@keyframes rotateLoader {

  from {

    transform: rotate(0deg);

  }

  to {

    transform: rotate(360deg);

  }

}

@keyframes pulseCoffee {

  0%, 100% {

    transform: scale(1);

    box-shadow:
      0 0 20px rgba(212,168,83,0.16);

  }

  50% {

    transform: scale(1.08);

    box-shadow:
      0 0 40px rgba(212,168,83,0.32);

  }

}

/* =========================
   MOBILE
========================= */

@media (max-width: 768px) {

  .login-card {

    padding: 42px 28px;

  }

  .login-title {

    font-size: 44px;

  }

}

</style>