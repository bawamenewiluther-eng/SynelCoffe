<template>

  <section class="reset-page">

    <div class="reset-card">

      <div class="reset-badge">

        — Synel Coffee Security

      </div>

      <h1>

        Reset Password

      </h1>

      <p>

        Create a new secure password
        for your Synel Coffee account.

      </p>

      <form @submit.prevent="handleResetPassword">

        <!-- EMAIL -->

        <div class="reset-group">

          <label>

            Email

          </label>

          <input
            v-model="email"
            type="email"
            readonly
          >

        </div>

        <!-- PASSWORD -->

        <div class="reset-group">

          <label>

            New Password

          </label>

          <input
            v-model="password"
            type="password"
            placeholder="••••••••"
          >

        </div>

        <!-- CONFIRM -->

        <div class="reset-group">

          <label>

            Confirm Password

          </label>

          <input
            v-model="password_confirmation"
            type="password"
            placeholder="••••••••"
          >

        </div>

        <!-- BUTTON -->

        <button
          type="submit"
          class="reset-button"
          :disabled="loading"
        >

          <span v-if="!loading">

            Reset Password

          </span>

          <span v-else>

            Processing...

          </span>

        </button>

      </form>

      <!-- TOAST -->

      <transition name="toast">

        <div
          v-if="toast.show"
          class="reset-toast"
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

      token: '',

      email: '',

      password: '',

      password_confirmation: '',

      loading: false,

      toast: {

        show: false,

        type: 'success',

        message: ''

      }

    }

  },

mounted() {

  this.token =
    this.$route.query.token

  this.email =
    this.$route.query.email

  // INVALID ACCESS
  if (
    !this.token
    || !this.email
  ) {

    this.$router.push('/')

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

    async handleResetPassword() {

      this.loading = true

      try {

        await axios.post(

          'http://localhost:8000/api/reset-password',

          {

            token:
              this.token,

            email:
              this.email,

            password:
              this.password,

            password_confirmation:
              this.password_confirmation

          }

        )

        this.showToast(

          'success',

          'Password reset successful ☕'

        )

        setTimeout(() => {

          this.$router.push('/login')

        }, 1800)

      }

      catch (error) {

        console.error(error)

        this.showToast(

          'error',

          'Reset password failed'

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

.reset-page {

  min-height: 100vh;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 140px 24px;

}

.reset-card {

  width: 100%;

  max-width: 520px;

  padding: 60px;

  border:
    1px solid
    rgba(212,168,83,0.18);

  background:
    rgba(20,10,5,0.75);

}

.reset-badge {

  margin-bottom: 18px;

  font-size: 11px;

  letter-spacing: 4px;

  text-transform: uppercase;

  color: var(--gold);

}

.reset-card h1 {

  font-size: 62px;

  margin-bottom: 20px;

  color: var(--cream);

}

.reset-card p {

  margin-bottom: 40px;

  line-height: 1.9;

  color:
    rgba(240,223,200,0.62);

}

.reset-group {

  margin-bottom: 24px;

}

.reset-group label {

  display: block;

  margin-bottom: 12px;

  font-size: 11px;

  letter-spacing: 3px;

  text-transform: uppercase;

  color: var(--gold);

}

.reset-group input {

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

.reset-button {

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

.reset-toast {

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