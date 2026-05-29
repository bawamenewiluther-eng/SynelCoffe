<template>

  <section class="forgot-page">

    <div class="forgot-card">

      <div class="forgot-badge">

        — Synel Coffee Recovery

      </div>

      <h1>

        Forgot Password

      </h1>

      <p>

        Enter your email and we’ll send
        you a secure password reset link.

      </p>

      <form @submit.prevent="handleForgotPassword">

        <!-- EMAIL -->

        <div class="forgot-group">

          <label>

            Email

          </label>

          <input
            v-model="email"
            type="email"
            placeholder="you@example.com"
          >

        </div>

        <!-- BUTTON -->

        <button
          type="submit"
          class="forgot-button"
          :disabled="loading"
        >

          <span v-if="!loading">

            Send Reset Link

          </span>

          <span v-else>

            Sending...

          </span>

        </button>

      </form>

      <!-- TOAST -->

      <transition name="toast">

        <div
          v-if="toast.show"
          class="forgot-toast"
          :class="toast.type"
        >

          {{ toast.message }}

        </div>

      </transition>

    </div>

  </section>

</template>

<script>

import axios from '../axios'

export default {

  data() {

    return {

      email: '',

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

    async handleForgotPassword() {

      this.loading = true

      try {

        await axios.post(

         'https://synelcoffebackend-production.up.railway.app/api/forgot-password',

          {

            email: this.email

          }

        )

        this.showToast(

          'success',

          'Reset link sent successfully ☕'

        )

      }

      catch (error) {

        console.error(error)

        this.showToast(

          'error',

          'Failed to send reset link'

        )

      }

      finally {

        this.loading = false

      }

    }

  }

}

</script>

<style scoped>

.forgot-page {

  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 140px 24px;

}

.forgot-card {

  width: 100%;

  max-width: 520px;

  padding: 60px;

  border:
    1px solid
    rgba(212,168,83,0.18);

  background:
    rgba(20,10,5,0.75);

  backdrop-filter: blur(14px);

}

.forgot-badge {

  margin-bottom: 18px;

  font-size: 11px;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: var(--gold);

}

.forgot-card h1 {

  font-size: 64px;

  margin-bottom: 20px;

  color: var(--cream);

}

.forgot-card p {

  line-height: 1.9;

  margin-bottom: 40px;

  color:
    rgba(240,223,200,0.62);

}

.forgot-group {

  margin-bottom: 26px;

}

.forgot-group label {

  display: block;

  margin-bottom: 12px;

  font-size: 11px;

  letter-spacing: 3px;

  text-transform: uppercase;

  color: var(--gold);

}

.forgot-group input {

  width: 100%;

  height: 62px;

  padding: 0 20px;

  border:
    1px solid
    rgba(212,168,83,0.18);

  background:
    rgba(255,255,255,0.02);

  color: var(--cream);

}

.forgot-button {

  width: 100%;

  height: 62px;

  border: none;

  background: var(--gold);

  color: var(--espresso);

  font-weight: 700;

  letter-spacing: 3px;

  text-transform: uppercase;

  cursor: pointer;

}

.forgot-toast {

  margin-top: 24px;

  padding: 18px;

  text-align: center;

}

.success {

  background:
    rgba(60,140,90,0.18);

}

.error {

  background:
    rgba(180,60,60,0.18);

}

</style>