import Vue from 'vue';
import Router from 'vue-router';
import superagent from 'superagent';
import store from './store';

Vue.use(Router);
/*eslint-disable */
const PREFIX = location.href.startsWith('http://localhost:') ? '/services' : '';

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: () => import(/* webpackChunkName: "landing-page" */ './views/LandingPage')
    },
    {
      path: '/journey',
      name: 'journey-page',
      // route level code-splitting
      // this generates a separate chunk (reg-page.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "reg-page" */ './views/JourneyPage')
    },
    // {
    //   path: '/connect',
    //   name: 'connect-page',
    //   // route level code-splitting
    //   // this generates a separate chunk (reg-page.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "reg-page" */ './views/ConnectPage')
    // },
    {
      path: '/votersupport',
      name: 'support-page',
      // route level code-splitting
      // this generates a separate chunk (reg-page.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "reg-page" */ './views/SupportPage')
    },
    {
      path: '/whyvote',
      name: 'why-page',
      // route level code-splitting
      // this generates a separate chunk (reg-page.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "reg-page" */ './views/WhyVotePage')
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter() {
        location.href = `${PREFIX}/auth/login`;
      }
    },
    {
      path: '/logout',
      name: 'logout',
      beforeEnter() {
        location.href = `${PREFIX}/auth/logout`;
      }
    },
    {
      path: '/activities',
      name: 'activities',
      meta: {
        requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "activities-page" */ './views/ActivitiesPage')
    },
    {
      path: '/team/:teamId',
      name: 'team',
      props: true,
      meta: {
        requiresAuth: true
      },
      component: () => import(/* webpackChunkName: "team-page" */ './views/TeamPage')
    },
    {
      // will match everything
      path: '*',
      component: () => import(/* webpackChunkName: "reg-page" */ './views/NotFoundPage')
    }
  ]
});
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //     // this route requires auth, check if logged in
    //     // if not, redirect to login page.
    let userResponse = await superagent.get(`${PREFIX}/auth/user`).catch(() => {
      /*eslint-disable */
      console.error('xhr error');
      return { body: { authenticated: false, xhr: 'error' } };
    });

    let userInfo = userResponse.body;

    /*eslint-disable */
    console.log('userInfo', userInfo);
    // user is authenticated
    if (userInfo.email) {
      store.commit('setUser', userInfo);
      next();
    }
    // user is not authenticated
    else {
      store.commit('clearUser');
      next({ name: 'login' });
    }
  }
  next();
});
export default router;
