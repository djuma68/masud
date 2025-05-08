<template>
    <div class="container">
      <h1 class="page-title">Checkout</h1>
      
      <!-- Checkout Progress -->
      <div class="progress-bar">
        <div :class="`progress-item ${checkoutStep === 'shipping' ? 'active' : ''}`">
          <div :class="`progress-icon ${checkoutStep === 'shipping' ? 'active' : ''}`">
            <MapPin :size="16" />
          </div>
          <span class="progress-label">Shipping</span>
        </div>
        <ChevronRight class="progress-arrow" />
        <div :class="`progress-item ${checkoutStep === 'payment' ? 'active' : ''}`">
          <div :class="`progress-icon ${checkoutStep === 'payment' ? 'active' : ''}`">
            <CreditCard :size="16" />
          </div>
          <span class="progress-label">Payment</span>
        </div>
        <ChevronRight class="progress-arrow" />
        <div :class="`progress-item ${checkoutStep === 'confirmation' ? 'active' : ''}`">
          <div :class="`progress-icon ${checkoutStep === 'confirmation' ? 'active' : ''}`">
            <ShoppingCart :size="16" />
          </div>
          <span class="progress-label">Confirmation</span>
        </div>
      </div>
  
      <div class="checkout-layout">
        <!-- Checkout Form -->
        <div class="checkout-form">
          <!-- Shipping Step -->
          <div v-if="checkoutStep === 'shipping'" class="form-card">
            <h2 class="section-title">Shipping Information</h2>
            <form @submit.prevent="handleShippingSubmit">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">First Name</label>
                  <input
                    type="text"
                    v-model="shippingInfo.firstName"
                    class="form-input"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Last Name</label>
                  <input
                    type="text"
                    v-model="shippingInfo.lastName"
                    class="form-input"
                    required
                  />
                </div>
              </div>
  
              <div class="form-group">
                <label class="form-label">Address</label>
                <input
                  type="text"
                  v-model="shippingInfo.address"
                  class="form-input"
                  required
                />
              </div>
  
              <div class="form-row three-col">
                <div class="form-group">
                  <label class="form-label">City</label>
                  <input
                    type="text"
                    v-model="shippingInfo.city"
                    class="form-input"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">State</label>
                  <input
                    type="text"
                    v-model="shippingInfo.state"
                    class="form-input"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">ZIP Code</label>
                  <input
                    type="text"
                    v-model="shippingInfo.zipCode"
                    class="form-input"
                    required
                  />
                </div>
              </div>
  
              <div class="form-group">
                <label class="form-label">Country</label>
                <select
                  v-model="shippingInfo.country"
                  class="form-input"
                  required
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>
  
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input
                    type="email"
                    v-model="shippingInfo.email"
                    class="form-input"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">Phone</label>
                  <input
                    type="tel"
                    v-model="shippingInfo.phone"
                    class="form-input"
                    required
                  />
                </div>
              </div>
  
              <div class="shipping-method">
                <h3 class="subsection-title">Shipping Method</h3>
                <div class="radio-options">
                  <div class="radio-option">
                    <input
                      type="radio"
                      id="standard"
                      value="standard"
                      v-model="shippingMethod"
                      class="radio-input"
                    />
                    <label for="standard" class="radio-label">
                      <span>Standard Shipping (3-5 business days)</span>
                      <span class="price">$4.99</span>
                    </label>
                  </div>
                  <div class="radio-option">
                    <input
                      type="radio"
                      id="express"
                      value="express"
                      v-model="shippingMethod"
                      class="radio-input"
                    />
                    <label for="express" class="radio-label">
                      <span>Express Shipping (1-2 business days)</span>
                      <span class="price">$9.99</span>
                    </label>
                  </div>
                </div>
              </div>
  
              <div class="form-actions">
                <button
                  type="submit"
                  class="btn btn-primary"
                >
                  Continue to Payment <ChevronRight :size="16" class="btn-icon" />
                </button>
              </div>
            </form>
          </div>
  
          <!-- Payment Step -->
          <div v-if="checkoutStep === 'payment'" class="form-card">
            <h2 class="section-title">Payment Information</h2>
            <form @submit.prevent="handlePaymentSubmit">
              <div class="form-group">
                <label class="form-label">Card Number</label>
                <div class="input-with-icon">
                  <CreditCard :size="20" class="input-icon" />
                  <input
                    type="text"
                    v-model="paymentInfo.cardNumber"
                    placeholder="1234 5678 9012 3456"
                    class="form-input with-icon"
                    required
                  />
                </div>
              </div>
  
              <div class="form-group">
                <label class="form-label">Name on Card</label>
                <input
                  type="text"
                  v-model="paymentInfo.nameOnCard"
                  class="form-input"
                  required
                />
              </div>
  
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label">Expiry Date</label>
                  <input
                    type="text"
                    v-model="paymentInfo.expiryDate"
                    placeholder="MM/YY"
                    class="form-input"
                    required
                  />
                </div>
                <div class="form-group">
                  <label class="form-label">CVV</label>
                  <input
                    type="text"
                    v-model="paymentInfo.cvv"
                    placeholder="123"
                    class="form-input"
                    required
                  />
                </div>
              </div>
  
              <div class="form-actions space-between">
                <button
                  type="button"
                  @click="checkoutStep = 'shipping'"
                  class="btn btn-secondary"
                >
                  Back
                </button>
                <button
                  type="submit"
                  class="btn btn-primary"
                >
                  Review Order <ChevronRight :size="16" class="btn-icon" />
                </button>
              </div>
            </form>
          </div>
  
          <!-- Confirmation Step -->
          <div v-if="checkoutStep === 'confirmation'" class="form-card">
            <h2 class="section-title">Order Confirmation</h2>
            
            <div class="confirmation-section">
              <h3 class="subsection-title">Shipping Information</h3>
              <div class="info-box">
                <p>{{ shippingInfo.firstName }} {{ shippingInfo.lastName }}</p>
                <p>{{ shippingInfo.address }}</p>
                <p>{{ shippingInfo.city }}, {{ shippingInfo.state }} {{ shippingInfo.zipCode }}</p>
                <p>{{ shippingInfo.country }}</p>
                <p>{{ shippingInfo.email }}</p>
                <p>{{ shippingInfo.phone }}</p>
              </div>
            </div>
            
            <div class="confirmation-section">
              <h3 class="subsection-title">Shipping Method</h3>
              <div class="info-box with-icon">
                <Truck :size="20" class="info-icon" />
                <div>
                  <p class="info-title">{{ shippingMethod === 'standard' ? 'Standard Shipping' : 'Express Shipping' }}</p>
                  <p class="info-subtitle">
                    {{ shippingMethod === 'standard' ? 'Delivery in 3-5 business days' : 'Delivery in 1-2 business days' }}
                  </p>
                </div>
              </div>
            </div>
            
            <div class="confirmation-section">
              <h3 class="subsection-title">Payment Information</h3>
              <div class="info-box with-icon">
                <CreditCard :size="20" class="info-icon" />
                <div>
                  <p class="info-title">
                    •••• •••• •••• {{ paymentInfo.cardNumber.slice(-4) }}
                  </p>
                  <p class="info-subtitle">
                    {{ paymentInfo.nameOnCard }} | Expires: {{ paymentInfo.expiryDate }}
                  </p>
                </div>
              </div>
            </div>
            
            <div class="form-actions space-between">
              <button
                type="button"
                @click="checkoutStep = 'payment'"
                class="btn btn-secondary"
              >
                Back
              </button>
              <button
                type="button"
                @click="handleConfirmOrder"
                class="btn btn-success"
              >
                Place Order <DollarSign :size="16" class="btn-icon" />
              </button>
            </div>
          </div>
        </div>
      
        <!-- Order Summary -->
        <div class="order-summary">
          <div class="summary-card">
            <h2 class="section-title">Order Summary</h2>
            
            <div class="summary-items">
              <div v-for="item in cartItems" :key="item.id" class="summary-item">
                <img 
                  :src="item.image" 
                  :alt="item.name" 
                  class="item-image"
                />
                <div class="item-details">
                  <p class="item-name">{{ item.name }}</p>
                  <p class="item-quantity">Qty: {{ item.quantity }}</p>
                </div>
                <p class="item-price">${{ item.price.toFixed(2) }}</p>
              </div>
            </div>
            
            <div class="summary-costs">
              <div class="cost-row">
                <span>Subtotal</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="cost-row">
                <span>Shipping</span>
                <span>${{ shipping.toFixed(2) }}</span>
              </div>
              <div class="cost-row">
                <span>Tax</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>
            </div>
            
            <div class="total-row">
              <span>Total</span>
              <span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  import { ChevronRight, CreditCard, DollarSign, MapPin, ShoppingCart, Truck } from 'lucide-vue-next';
  
  export default {
    name: 'CheckoutPage',
    components: {
      ChevronRight,
      CreditCard,
      DollarSign,
      MapPin,
      ShoppingCart,
      Truck
    },
    props: {
      // Receive cart items from parent component or router
      cartItemsFromCart: {
        type: Array,
        default: () => []
      }
    },
    setup(props) {
      // Use cartItems from props if available, otherwise use default sample items
      const cartItems = computed(() => {
        if (props.cartItemsFromCart && props.cartItemsFromCart.length > 0) {
          return props.cartItemsFromCart;
        } else {
          // Fallback sample data if no items are passed
          return [
            { id: 1, name: 'Smartphone X', price: 799.99, quantity: 1, image: '/api/placeholder/60/60' },
            { id: 5, name: 'Wireless Speaker', price: 179.99, quantity: 1, image: '/api/placeholder/60/60' }
          ];
        }
      });
  
      const checkoutStep = ref('shipping');
      
      const shippingInfo = ref({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        email: '',
        phone: ''
      });
      
      const paymentInfo = ref({
        cardNumber: '',
        nameOnCard: '',
        expiryDate: '',
        cvv: ''
      });
      
      const shippingMethod = ref('standard');
  
      // Calculate totals
      const subtotal = computed(() => {
        return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0);
      });
      
      const shipping = computed(() => {
        // Apply free shipping logic from cart page
        return subtotal.value > 100 ? 0 : (shippingMethod.value === 'standard' ? 4.99 : 9.99);
      });
      
      const tax = computed(() => {
        return subtotal.value * 0.08; // 8% tax rate
      });
      
      const total = computed(() => {
        return subtotal.value + shipping.value + tax.value;
      });
  
      // Form submission handlers
      const handleShippingSubmit = () => {
        // Validate shipping info here if needed
        checkoutStep.value = 'payment';
      };
  
      const handlePaymentSubmit = () => {
        // Validate payment info here if needed
        checkoutStep.value = 'confirmation';
      };
  
      const handleConfirmOrder = () => {
        // Process the order
        alert('Order placed successfully!');
        // In a real app, you would redirect to an order confirmation page
      };
  
      return {
        cartItems,
        checkoutStep,
        shippingInfo,
        paymentInfo,
        shippingMethod,
        subtotal,
        shipping,
        tax,
        total,
        handleShippingSubmit,
        handlePaymentSubmit,
        handleConfirmOrder
      };
    }
  };
  </script>
  
  <style>
  /* General Layout */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 32px 16px;
  }
  
  .page-title {
    font-size: 1.875rem;
    font-weight: bold;
    margin-bottom: 32px;
    text-align: center;
  }
  
  /* Checkout Progress */
  .progress-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 32px;
  }
  
  .progress-item {
    display: flex;
    align-items: center;
  }
  
  .progress-item.active {
    color: #2563eb;
    font-weight: 600;
  }
  
  .progress-icon {
    height: 32px;
    width: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    background-color: #9ca3af;
  }
  
  .progress-icon.active {
    background-color: #2563eb;
  }
  
  .progress-label {
    margin-left: 8px;
  }
  
  .progress-arrow {
    margin: 0 16px;
    color: #9ca3af;
  }
  
  /* Layout */
  .checkout-layout {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }
  
  @media (min-width: 768px) {
    .checkout-layout {
      flex-direction: row;
    }
    
    .checkout-form {
      width: 66.666667%;
    }
    
    .order-summary {
      width: 33.333333%;
    }
  }
  
  /* Cards */
  .form-card, .summary-card {
    background-color: white;
    padding: 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .summary-card {
    position: sticky;
    top: 24px;
  }
  
  /* Section Titles */
  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 16px;
  }
  
  .subsection-title {
    font-size: 1.125rem;
    font-weight: 500;
    margin-bottom: 8px;
  }
  
  /* Form Elements */
  .form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }
  
  @media (min-width: 768px) {
    .form-row {
      grid-template-columns: 1fr 1fr;
    }
    
    .form-row.three-col {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  
  .form-group {
    margin-bottom: 16px;
  }
  
  .form-label {
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
  }
  
  .input-with-icon {
    display: flex;
    align-items: center;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    padding: 0 12px;
  }
  
  .input-icon {
    color: #9ca3af;
    margin-right: 8px;
  }
  
  .input-with-icon .form-input.with-icon {
    border: none;
    outline: none;
    width: 100%;
  }
  
  /* Shipping Method */
  .shipping-method {
    margin-bottom: 16px;
  }
  
  .radio-options {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .radio-option {
    display: flex;
    align-items: center;
  }
  
  .radio-input {
    margin-right: 8px;
  }
  
  .radio-label {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  
  .price {
    font-weight: 500;
  }
  
  /* Buttons */
  .form-actions {
    display: flex;
    justify-content: flex-end;
  }
  
  .form-actions.space-between {
    justify-content: space-between;
  }
  
  .btn {
    padding: 8px 24px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .btn-primary {
    background-color: #2563eb;
    color: white;
  }
  
  .btn-primary:hover {
    background-color: #1d4ed8;
  }
  
  .btn-secondary {
    border: 1px solid #d1d5db;
    background-color: transparent;
  }
  
  .btn-secondary:hover {
    background-color: #f9fafb;
  }
  
  .btn-success {
    background-color: #16a34a;
    color: white;
  }
  
  .btn-success:hover {
    background-color: #15803d;
  }
  
  .btn-icon {
    margin-left: 4px;
  }
  
  /* Confirmation Styles */
  .confirmation-section {
    margin-bottom: 24px;
  }
  
  .info-box {
    background-color: #f9fafb;
    padding: 16px;
    border-radius: 4px;
  }
  
  .info-box.with-icon {
    display: flex;
    align-items: center;
  }
  
  .info-icon {
    margin-right: 8px;
    color: #4b5563;
  }
  
  .info-title {
    font-weight: 500;
  }
  
  .info-subtitle {
    font-size: 0.875rem;
    color: #4b5563;
  }
  
  /* Order Summary */
  .summary-items {
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  
  .summary-item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  
  .item-image {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 4px;
    margin-right: 16px;
  }
  
  .item-details {
    flex: 1;
  }
  
  .item-name {
    font-weight: 500;
  }
  
  .item-quantity {
    font-size: 0.875rem;
    color: #4b5563;
  }
  
  .item-price {
    font-weight: 500;
  }
  
  .summary-costs {
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 0.875rem;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  
  .cost-row {
    display: flex;
    justify-content: space-between;
  }
  
  .total-row {
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 1.125rem;
  }
  </style>