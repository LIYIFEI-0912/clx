import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/Pages/Login'
import SideBar from '@/components/SideBar'
import ElementUi from '@/components/Element-ui'
import Header from '@/components/Header'
import Home from '@/components/Home'
import UserManages from '@/userManages/UserManages'
import CustomerManages from '@/customerManages/CustomerManages'
import BoxManages from '@/boxManages/BoxManages'
import Box1Manages from '@/boxManages/Box1Manages'
import AdManages from '@/adManages/AdManages'
import ViewManages from '@/viewManages/ViewManages'
import OrderManages from '@/orderManages/OrderManages'


Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      redirect: '/Login'
    },
    {
      path: "/elementui",
      name: "elementui",
      component: ElementUi
    },
    {
      path: "/sidebar",
      name: "sidebar",
      component: SideBar
    },
    {
      path: "/header",
      name: "header",
      component: Header
    },
    {
      path: "/",
      name: "home",
      component: Home,
      children: [{
          path: 'userManages',
          name: "userManages",
          component: UserManages
        },
        {
          path: 'customerManages',
          name: "customerManages",
          component: CustomerManages
        },
        {
          path: 'boxManages',
          name: "boxManages",
          component: BoxManages
        },
        {
          path: 'box1Manages',
          name: "box1Manages",
          component: Box1Manages
        },
        {
          path: 'adManages',
          name: "adManages",
          component: AdManages
        },
        {
          path: 'viewManages',
          name: "viewManages",
          component: ViewManages
        },
        {
          path: 'orderManages',
          name: "orderManages",
          component: OrderManages
        }
      ]
    },

    {
      //重定向
      path: "*",
      redirect: "/login"
    }
  ]
})
