import { defineStore }
from 'pinia'

import axios from '../axios'

export const useAuthStore =
defineStore('auth', {

  state: () => ({

    user: null,

    isLogin: false,

    initialized: false,

    loading: true

  }),

  actions: {

    async fetchUser() {

      try {

        const response =
          await axios.get('/api/user')

        this.user =
          response.data

        this.isLogin = true

      }

      catch (error) {

        this.user = null

        this.isLogin = false

      }

      finally {
        this.loading = false
        this.initialized = true

      }

    },

    logout() {

      this.user = null

      this.isLogin = false

    }

  }

})