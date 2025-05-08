<template>
  <nav :class="['main-navbar', { 'scrolled': isScrolled }]">
    <div class="container">
      <div class="navbar-content">
        <!-- Logo -->
        <div class="brand">
          <span>TechElite</span>
        </div>

        <!-- Mobile menu button -->
        <div class="mobile-menu-toggle">
          <button
            @click="toggleMobileMenu"
            :aria-expanded="mobileOpen.toString()"
            aria-label="Toggle mobile menu"
          >
            <span v-if="mobileOpen" class="close-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </span>
            <span v-else class="menu-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
          </button>
        </div>

        <!-- Desktop navigation -->
        <div class="desktop-nav">
          <div class="nav-menu">
            <ul class="nav-links">
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/product">Products</router-link></li>
              
              <!-- Categories dropdown -->
              <li class="dropdown">
                <button
                  class="dropdown-toggle"
                  @click="toggleCategories"
                  :aria-expanded="categoriesOpen.toString()"
                >
                  Categories
                  <svg :class="{ 'rotate': categoriesOpen }" class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                  </svg>
                </button>
                <div v-show="categoriesOpen" class="dropdown-menu">
                  <router-link to="/category/phones">Phones</router-link>
                  <router-link to="/category/laptops">Laptops</router-link>
                  <router-link to="/category/accessories">Accessories</router-link>
                  <router-link to="/category/audio">Audio</router-link>
                  <router-link to="/category/wearables">Wearables</router-link>
                </div>
              </li>
              
              <li><router-link to="/support">Support</router-link></li>
              <li><router-link to="/contact">Contact</router-link></li>
            </ul>
          </div>
          
          <div class="nav-actions">
            <!-- Search -->
            <form @submit.prevent="handleSearch" class="search-form">
              <div class="search-container">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Search products..."
                  aria-label="Search"
                />
                <button type="submit" aria-label="Search">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
            
            <!-- User icon -->
            <div class="nav-icon">
              <router-link to="/account" aria-label="User account">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </router-link>
            </div>
            
            <!-- Cart icon with badge -->
            <div class="nav-icon">
              <router-link to="/cart" aria-label="Shopping cart">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="mobileOpen" class="mobile-menu">
      <ul class="mobile-nav-links">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/products">Products</router-link></li>
        
        <!-- Mobile categories dropdown -->
        <li class="mobile-dropdown">
          <button
            @click="toggleCategories"
            class="mobile-dropdown-toggle"
            :aria-expanded="categoriesOpen.toString()"
          >
            Categories
            <svg :class="{ 'rotate': categoriesOpen }" class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <div v-show="categoriesOpen" class="mobile-dropdown-menu">
            <router-link to="/category/phones">Phones</router-link>
            <router-link to="/category/laptops">Laptops</router-link>
            <router-link to="/category/accessories">Accessories</router-link>
            <router-link to="/category/audio">Audio</router-link>
            <router-link to="/category/wearables">Wearables</router-link>
          </div>
        </li>
        
        <li><router-link to="/support">Support</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
      </ul>
      
      <!-- Mobile search -->
      <form @submit.prevent="handleSearch" class="mobile-search">
        <div class="mobile-search-container">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            aria-label="Search"
          />
          <button type="submit" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>
      
      <!-- Mobile user/cart icons -->
      <div class="mobile-actions">
        <router-link to="/account" class="mobile-action-item">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Account</span>
        </router-link>
        
        <router-link to="/cart" class="mobile-action-item">
          <div class="mobile-cart-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartCount > 0" class="mobile-cart-badge">{{ cartCount }}</span>
          </div>
          <span>Cart</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'EnhancedNavbar',
  data() {
    return {
      mobileOpen: false,
      categoriesOpen: false,
      searchQuery: '',
      cartCount: 0,
      isScrolled: false
    };
  },
  mounted() {
    // Add scroll event listener
    window.addEventListener('scroll', this.handleScroll);
    
    // Load cart data
    this.loadCartData();

    // Close dropdown when clicking outside
    document.addEventListener('click', this.handleOutsideClick);
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener('scroll', this.handleScroll);
    document.removeEventListener('click', this.handleOutsideClick);
  },
  methods: {
    toggleMobileMenu() {
      this.mobileOpen = !this.mobileOpen;
      if (!this.mobileOpen) this.categoriesOpen = false;
    },
    toggleCategories(event) {
      // Prevent click from propagating to document
      if (event) event.stopPropagation();
      this.categoriesOpen = !this.categoriesOpen;
    },
    handleSearch() {
      console.log('Searching for:', this.searchQuery);
      // In a real app, you would:
      // this.$router.push({ name: 'search', query: { q: this.searchQuery } });
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 20;
    },
    loadCartData() {
      // In a real app, this would come from Vuex/API/localStorage
      try {
        const mockCartData = JSON.parse(localStorage.getItem('cart')) || { items: [] };
        this.cartCount = mockCartData.items.length;
      } catch (error) {
        console.error('Error loading cart data:', error);
        this.cartCount = 0;
      }
    },
    handleOutsideClick(event) {
      // Close categories dropdown when clicking outside
      const dropdownEl = event.target.closest('.dropdown');
      if (!dropdownEl && this.categoriesOpen) {
        this.categoriesOpen = false;
      }
    }
  }
};
</script>

<style scoped>
/* Base Variables */
:root {
  --primary-bg: #222;
  --secondary-bg: #333;
  --hover-bg: #444;
  --text-color: #ddd;
  --text-hover: #fff;
  --accent-color: #3498db;
  --border-color: #444;
  --badge-color: #e74c3c;
  --shadow-color: rgba(0, 0, 0, 0.2);
  --transition: all 0.3s ease;
}

/* Base navbar styles */
.main-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--primary-bg);
  color: var(--text-color);
  z-index: 1000;
  transition: var(--transition);
}

/* Scrolled state */
.main-navbar.scrolled {
  background-color: rgba(17, 17, 17, 0.97);
  box-shadow: 0 2px 10px var(--shadow-color);
}

/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Navbar content layout */
.navbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
}

/* Brand/Logo */
.brand {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-hover);
}

/* Mobile menu toggle button */
.mobile-menu-toggle {
  display: none;
}

.mobile-menu-toggle button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-color);
  padding: 5px;
}

.mobile-menu-toggle svg {
  width: 24px;
  height: 24px;
}

/* Desktop Navigation */
.desktop-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  margin-left: 40px;
}

/* Navigation Links */
.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-right: 30px;
  position: relative;
}

.nav-links a,
.dropdown-toggle {
  color: var(--text-color);
  text-decoration: none;
  font-size: 16px;
  transition: var(--transition);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}

.nav-links a:hover,
.dropdown-toggle:hover {
  color: var(--text-hover);
}

/* Dropdown menu */
.dropdown {
  position: relative;
}

.dropdown-toggle {
  display: flex;
  align-items: center;
}

.dropdown-icon {
  width: 16px;
  height: 16px;
  margin-left: 5px;
  transition: var(--transition);
}

.dropdown-icon.rotate {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--secondary-bg);
  border-radius: 4px;
  box-shadow: 0 5px 15px var(--shadow-color);
  min-width: 180px;
  padding: 5px 0;
  margin-top: 5px;
  z-index: 100;
}

.dropdown-menu a {
  display: block;
  padding: 10px 15px;
  color: var(--text-color);
  transition: var(--transition);
}

.dropdown-menu a:hover {
  background-color: var(--hover-bg);
  color: var(--text-hover);
}

/* Right side actions (search, icons) */
.nav-actions {
  display: flex;
  align-items: center;
}

/* Search area */
.search-form {
  margin-right: 20px;
}

.search-container {
  display: flex;
  align-items: center;
  position: relative;
}

.search-container input {
  background-color: var(--secondary-bg);
  border: none;
  border-radius: 4px;
  padding: 8px 12px;
  color: var(--text-color);
  width: 200px;
  outline: none;
  transition: var(--transition);
}

.search-container input:focus {
  box-shadow: 0 0 0 2px var(--accent-color);
}

.search-container input::placeholder {
  color: #999;
}

.search-container button {
  background: none;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 10px;
  color: #999;
}

.search-container button svg {
  width: 18px;
  height: 18px;
}

/* Icons */
.nav-icon {
  margin-left: 20px;
  position: relative;
}

.nav-icon a {
  color: var(--text-color);
  text-decoration: none;
  transition: var(--transition);
}

.nav-icon a:hover {
  color: var(--text-hover);
}

.nav-icon svg {
  width: 22px;
  height: 22px;
}

/* Cart badge */
.cart-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: var(--badge-color);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

/* Mobile menu */
.mobile-menu {
  display: none;
  background-color: var(--primary-bg);
  padding: 10px 20px 20px;
  animation: slideDown 0.3s ease;
}

.mobile-nav-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-nav-links li {
  margin-bottom: 10px;
}

.mobile-nav-links a {
  display: block;
  color: var(--text-color);
  text-decoration: none;
  padding: 10px 0;
  font-size: 16px;
}

.mobile-dropdown {
  position: relative;
}

.mobile-dropdown-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  color: var(--text-color);
  padding: 10px 0;
  cursor: pointer;
  font-size: 16px;
  text-align: left;
}

.mobile-dropdown-menu {
  padding-left: 15px;
  margin-top: 5px;
}

.mobile-dropdown-menu a {
  padding: 8px 0;
  font-size: 15px;
  color: #aaa;
}

/* Mobile search */
.mobile-search {
  margin: 15px 0;
}

.mobile-search-container {
  position: relative;
}

.mobile-search-container input {
  width: 100%;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: var(--secondary-bg);
  color: var(--text-color);
  outline: none;
}

.mobile-search-container button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
}

.mobile-search-container button svg {
  width: 18px;
  height: 18px;
}

/* Mobile action buttons */
.mobile-actions {
  display: flex;
  justify-content: space-around;
  padding-top: 15px;
  border-top: 1px solid var(--border-color);
  margin-top: 15px;
}

.mobile-action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--text-color);
  text-decoration: none;
}

.mobile-action-item svg {
  width: 22px;
  height: 22px;
  margin-bottom: 5px;
}

.mobile-action-item span {
  font-size: 12px;
}

.mobile-cart-icon {
  position: relative;
}

.mobile-cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: var(--badge-color);
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
}

/* Animation for mobile menu */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Media queries for responsive design */
@media (max-width: 991px) {
  .desktop-nav {
    margin-left: 20px;
  }
  
  .nav-links li {
    margin-right: 15px;
  }
  
  .search-container input {
    width: 150px;
  }
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: block;
  }
  
  .desktop-nav {
    display: none;
  }
  
  .mobile-menu {
    display: block;
  }
}
</style>