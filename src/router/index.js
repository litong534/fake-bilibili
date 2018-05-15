import Vue from 'vue'
import Router from 'vue-router'
const Paint = r => {
  import('components/paint/paint').then(paint => {
    r(paint)
  })
}
// import Paint from 'components/paint/paint'
const PaintDetail = r => {
  import('components/paintdetail/paintdetail').then(paintdetail => {
    r(paintdetail)
  })
}
const DrawerDetail = r => {
  import('components/drawerdetail/drawerdetail').then(drawerdetail => {
    r(drawerdetail)
  })
}
const Rank = r => {
  import('components/rank/rank').then(rank => {
    r(rank)
  })
}
const Activity = r => {
  import('components/activity/activity').then(activity => {
    r(activity)
  })
}
const Search = r => {
  import('components/search/search').then(search => {
    r(search)
  })
}

Vue.use(Router)

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
          component: PaintDetail,
          meta: {dontKeepAlive: true}
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
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: 'detail/:id/:uid',
          component: PaintDetail
        }
      ]
    },
    {
      path: '/activity',
      component: Activity
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
