import {
  createRouter,
  createWebHistory
}
from 'vue-router'
const Home =
  () => import('../Pages/Home.vue')

const Login =
  () => import('../Pages/Login.vue')

const Menu =
  () => import('../Pages/Menu.vue')

const Register =
  () => import('../Pages/Register.vue')

const Profil =
  () => import('../Pages/Profil.vue')

const Admin =
  () => import('../Pages/Admin.vue')

const NotFound =
  () => import('../Pages/NotFound.vue')
import { useAuthStore }
from '../stores/auth'

const ForgotPassword =
  () => import('../Pages/ForgotPassword.vue')
const ResetPassword =
  () => import('../Pages/ResetPassword.vue')

const routes = [

  {
    path: '/',
    component: Home
  },

{
  path: '/login',

  component: Login,

  meta: {

    requiresGuest: true

  }

},

  {
    path: '/menu',

    component: Menu,

    meta: {

      requiresAuth: true

    }

  },

{
  path: '/register',

  component: Register,

  meta: {

    requiresGuest: true

  }

},

{
  path: '/admin',

  component: Admin,

  meta: {

    requiresAuth: true,

    requiresAdmin: true

  }

},

  {
    path: '/profile',

    component: Profil,

    meta: {

      requiresAuth: true

    }

  },


      {
        path: '/:pathMatch(.*)*',
        component: NotFound
      },
        {
        path: '/forgot-password',

        component: ForgotPassword,

        meta: {

          requiresGuest: true

        }

      },
      {
        path: '/reset-password',

        component: ResetPassword,

        meta: {

          requiresGuest: true

        }

      },
      {
        path: '/order',
        component: () => import('../Pages/OrderView.vue'),
          meta: {

          requiresAuth: true

        }
      },
      {
        path: '/auth-success',
        component: () =>
          import('../Pages/AuthSuccess.vue')
      },
      {
        path: '/payment-success',
        component: () =>
          import('../Pages/PaymentSuccess.vue')
      },
      {
        path: '/admin/orders',

        component: () =>

          import(
            '../Pages/AdminOrdersView.vue'
          ),
          meta: {
          requiresAuth: true,
          requiresAdmin: true

    }
          
      },
      {

  path: '/my-orders',

  component: () =>

    import(
      '../Pages/MyOrdersView.vue'
    ),

  meta: {

    requiresAuth: true

  }

}


      
      ]

const router = createRouter({

  history: createWebHistory(),

  routes,
  scrollBehavior() {

  return {

    top: 0

  }

}

})

router.beforeEach(async (to) => {

  const auth =
    useAuthStore()

  // FETCH SEKALI
  if (
    auth.loading
  ) {

    await auth.fetchUser()

  }
  // GUEST ONLY
if (

  to.meta.requiresGuest
  && auth.isLogin

) {

  return '/'

}

  // PROTECTED
  if (
    to.meta.requiresAuth
    && !auth.isLogin
  ) {

    return '/login'

  }

  // ADMIN ONLY
  if (

    to.meta.requiresAdmin
    && !auth.user?.is_admin

  ) {

    return '/'

  }

  return true

})

export default router