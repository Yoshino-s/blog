import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/Title.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        meta: {
          right: 'theme'
        }
      }, {
        path: 'links',
        component: () => import('pages/Links.vue'),
        meta: {
          left: 'back',
          right: 'theme'
        }
      }, {
        path: 'liaboutnks',
        component: () => import('pages/About.vue'),
        meta: {
          left: 'back',
          right: 'theme'
        }
      },
    ],
    
  }, {
    path: '/user/',
    component: () => import('layouts/Title.vue'),
    children: [
      {
        path: 'login',
        component: () => import('pages/user/Login.vue'),
        meta: {
          title: '登录',
          left: 'home',
          right: 'back'
        }
      }, {
        path: 'register',
        component: () => import('pages/user/Peach.vue'),
        meta: {
          title: '注册',
          left: 'home',
          right: 'back'
        }
      }, {
        path: 'profile',
        component: () => import('pages/user/Profile.vue'),
        meta: {
          title: 'Profile',
          left: 'home',
          right: 'back'
        }
      }
    ]
  }, {
    path: '/content/',
    component: () => import('layouts/Title.vue'),
    children: [
      {
        path: 'create',
        component: () => import('pages/content/Create.vue'),
        meta: {
          title: '创建',
          left: 'home',
          right: 'theme'
        }
      }
    ]
  }, {
    path: '/tag/',
    component: () => import('layouts/Title.vue'),
    children: [
      {
        path: ':name',
        component: () => import('pages/search/TagSearch.vue'),
      }
    ]
  }, {
    path: '/paragraph/',
    component: () => import('layouts/Title.vue'),
    children: [
      {
        path: ':id',
        component: () => import('pages/paragraph/Show.vue'),
        meta: {
          left: 'home',
          right: 'theme'
        }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue'),
  });
}

export default routes;
