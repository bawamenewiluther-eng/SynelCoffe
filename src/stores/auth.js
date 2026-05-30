import { defineStore } from 'pinia'
import axios from '../api'

export const useAuthStore = defineStore('auth', {

  state: () => ({
    user: null,
    isLogin: false,
    initialized: false,
    loading: true
  }),

  actions: {

async fetchUser() {

  console.log('FETCH USER START')

  try {

    const response =
      await axios.get('api/user')

    console.log(
      'USER DATA:',
      response.data
    )

    this.user =
      response.data

    this.isLogin = true

  }

  catch (error) {

    console.log(
      'USER ERROR:',
      error.response?.status
    )

    console.log(
      error.response?.data
    )

    this.user = null

    this.isLogin = false

  }

  finally {

    console.log('FETCH USER END')

    console.log('IS LOGIN:', this.isLogin)

    console.log('USER:', this.user)

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