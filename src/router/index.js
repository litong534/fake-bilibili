import Vue from 'vue';
import Router from 'vue-router';
const Paint = (r) => {
  import('components/paint/paint').then(paint => {
    r(paint);
  });
}
const PaintDetail = (r) => {
  import('components/paintdetail/paintdetail').then(paintdetail => {
    r(paintdetail);
  });
}
const DrawerDetail = (r) => {
  import('components/drawerdetail/drawerdetail').then(drawerdetail => {
    r(drawerdetail);
  });
}
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/paint'
    },
    {
      path: '/paint',
      component: Paint,
      children: [
        {
          path: 'detail/:id/:uid',
          component: PaintDetail
        },
        {
          path: 'drawer/:uid',
          component: DrawerDetail,
          children: [
            {
              path: 'detail/:id',
              component: PaintDetail
            }           
          ]
        }
      ]
    }
  ]
});
