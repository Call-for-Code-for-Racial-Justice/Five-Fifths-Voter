import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from './views/LandingPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: LandingPage
    },
    {
      path: '/reg',
      name: 'reg-page',
      // route level code-splitting
      // this generates a separate chunk (reg-page.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "reg-page" */ './views/RegPage')
    },
    {
      path: '/absentee',
      name: 'absentee-page',
      // route level code-splitting
      // this generates a separate chunk (reg-page.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "reg-page" */ './views/AbsenteePage')
    },
    {
      path: '/pollinfo',
      name: 'pollinfo-page',
      // route level code-splitting
      // this generates a separate chunk (reg-page.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "reg-page" */ './views/PollInfoPage')
    }
  ]
});
