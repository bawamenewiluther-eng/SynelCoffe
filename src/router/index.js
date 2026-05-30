router.beforeEach(async (to) => {

  const auth = useAuthStore()

  console.log('====================')
  console.log('ROUTE:', to.path)
  console.log('BEFORE FETCH')
  console.log('IS LOGIN:', auth.isLogin)
  console.log('USER:', auth.user)
  console.log('LOADING:', auth.loading)

  if (auth.loading) {

    await auth.fetchUser()

    console.log('AFTER FETCH')
    console.log('IS LOGIN:', auth.isLogin)
    console.log('USER:', auth.user)
    console.log('LOADING:', auth.loading)

  }

  if (
    to.meta.requiresGuest &&
    auth.isLogin
  ) {

    console.log('REDIRECT GUEST -> /')

    return '/'

  }

  if (
    to.meta.requiresAuth &&
    !auth.isLogin
  ) {

    console.log('REDIRECT AUTH -> /login')

    return '/login'

  }

  if (
    to.meta.requiresAdmin &&
    !auth.user?.is_admin
  ) {

    console.log('REDIRECT ADMIN -> /')

    return '/'

  }

  console.log('ALLOW ROUTE')

  return true

})
export default router