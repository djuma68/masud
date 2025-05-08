import { createRouter, createWebHistory } from 'vue-router'
import Product from '../views/Product.vue'
import Cart from '../components/Cart.vue'
import Checkoutpage from '../components/CheckoutPage.vue'
import Home from '../views/Home.vue'
import AdminDashboard from '@/views/AdminDashboard.vue'
import Login from '@/views/Login.vue'
import Signup from '@/views/Signup.vue'
import MyOrders from '@/components/MyOrders.vue'
import ProductDetails from '@/views/ProductDetails.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/product', name: 'Product', component: Product },
  { path: '/cart', name: 'Cart', component: Cart },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'Singup', component: Signup },
  { path: '/orders', name: 'Myorder', component: MyOrders },
  { path: '/productdetail', name: 'productdetails', component: ProductDetails },
  { path: '/admin', name: 'Admin', component: AdminDashboard },
  { path: '/checkout', name: 'Checkout', component: Checkoutpage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
