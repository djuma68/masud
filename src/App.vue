// src/App.vue
<template>
  <div class="app">
    <header>
      <nav>
        <div class="logo">ElectroShop</div>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/product">Products</router-link>
          
          <!-- Guest Navigation -->
          <template v-if="!currentUser">
            <router-link to="/login">Login</router-link>
            <router-link to="/signup">Register</router-link>
          </template>
          
          <!-- Authenticated User Navigation -->
          <template v-else>
            <router-link to="/account">My Account</router-link>
            <router-link to="/orders">My Orders</router-link>
            <a href="#" @click.prevent="handleLogout" class="logout-link">Logout</a>
          </template>
          
          <router-link to="/cart" class="cart-link">
            Cart <span v-if="cartItems.length" class="cart-count">{{ cartItems.length }}</span>
          </router-link>
        </div>
        
        <!-- Mobile Menu Button -->
        <div class="mobile-menu-button" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        <!-- Mobile Menu -->
        <div class="mobile-menu" :class="{ 'active': mobileMenuOpen }">
          <router-link to="/" @click="closeMobileMenu">Home</router-link>
          <router-link to="/product" @click="closeMobileMenu">Products</router-link>
          
          <!-- Guest Navigation - Mobile -->
          <template v-if="!currentUser">
            <router-link to="/login" @click="closeMobileMenu">Login</router-link>
            <router-link to="/signup" @click="closeMobileMenu">Register</router-link>
          </template>
          
          <!-- Authenticated User Navigation - Mobile -->
          <template v-else>
            <router-link to="/account" @click="closeMobileMenu">My Account</router-link>
            <router-link to="/orders" @click="closeMobileMenu">My Orders</router-link>
            <a href="#" @click.prevent="handleLogoutMobile" class="logout-link">Logout</a>
          </template>
          
          <router-link to="/cart" class="cart-link" @click="closeMobileMenu">
            Cart <span v-if="cartItems.length" class="cart-count">{{ cartItems.length }}</span>
          </router-link>
        </div>
      </nav>
    </header>
    
    <main>
      <router-view 
        :cart-items="cartItems" 
        :current-user="currentUser"
        @add-to-cart="addToCart" 
        @remove-from-cart="removeFromCart"
        @update-quantity="updateQuantity"
        @login="handleLogin"
        @register="handleRegister"
        @logout="handleLogout"
      />
    </main>
    
    <footer>
      <p>&copy; 2025 ElectroShop. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
      currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
      mobileMenuOpen: false
    };
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.cartItems.push({
          ...product,
          quantity: 1
        });
      }
      
      this.saveCart();
      this.$toast.success(`Added ${product.name} to cart!`, {
        position: 'top-right',
        duration: 2000
      });
    },
    removeFromCart(productId) {
      this.cartItems = this.cartItems.filter(item => item.id !== productId);
      this.saveCart();
    },
    updateQuantity(productId, quantity) {
      const item = this.cartItems.find(item => item.id === productId);
      if (item) {
        item.quantity = quantity;
        
        if (item.quantity <= 0) {
          this.removeFromCart(productId);
        } else {
          this.saveCart();
        }
      }
    },
    saveCart() {
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },
    handleLogin(credentials) {
      console.log('Login attempt:', credentials);
      // Here you would typically make an API call to your backend
      // For example: authService.login(credentials)
      
      // For demo purposes, simulate a successful login
      const user = {
        email: credentials.email,
        name: credentials.email.split('@')[0],
        id: Math.random().toString(36).substring(2, 15)
      };
      
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      this.$toast.success(`Welcome back, ${user.name}!`, {
        position: 'top-right',
        duration: 2000
      });
      
      // Navigate to home after login
      this.$router.push('/');
    },
    handleRegister(userData) {
      console.log('Register attempt:', userData);
      // Here you would typically make an API call to your backend
      // For example: authService.register(userData)
      
      this.$toast.success(`Account created successfully!`, {
        position: 'top-right',
        duration: 2000
      });
      
      // Navigate to login page after registration
      this.$router.push('/login');
    },
    handleLogout() {
      this.currentUser = null;
      localStorage.removeItem('currentUser');
      
      this.$toast.info('You have been logged out', {
        position: 'top-right',
        duration: 2000
      });
      
      // Navigate to home after logout
      this.$router.push('/');
    },
    handleLogoutMobile() {
      this.handleLogout();
      this.closeMobileMenu();
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      
      // Prevent scrolling when menu is open
      if (this.mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false;
      document.body.style.overflow = '';
    }
  },
  watch: {
    // Close mobile menu when route changes
    '$route'() {
      this.closeMobileMenu();
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.6;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a73e8;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover, .nav-links a.router-link-active {
  color: #1a73e8;
}

.logout-link {
  cursor: pointer;
}

.cart-link {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -12px;
  background-color: #e53935;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
}

/* Mobile Menu Button */
.mobile-menu-button {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  cursor: pointer;
}

.mobile-menu-button span {
  height: 3px;
  width: 100%;
  background-color: #333;
  border-radius: 3px;
  transition: all 0.3s ease;
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: white;
  padding: 2rem;
  z-index: 999;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  flex-direction: column;
  gap: 1.5rem;
}

.mobile-menu.active {
  transform: translateX(0);
}

.mobile-menu a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 1.2rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.mobile-menu a:hover, .mobile-menu a.router-link-active {
  color: #1a73e8;
}

/* Mobile Menu - Show on Small Screens */
@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .mobile-menu-button {
    display: flex;
  }

  .mobile-menu {
    display: flex;
  }
}

main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
}

.btn {
  background-color: #1a73e8;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #155ac1;
}

.btn-danger {
  background-color: #e53935;
}

.btn-danger:hover {
  background-color: #c62828;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #1a73e8;
  color: #1a73e8;
}

.btn-outline:hover {
  background-color: #f0f7ff;
}
</style>