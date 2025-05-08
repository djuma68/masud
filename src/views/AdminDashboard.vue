<template>
    <div class="admin-dashboard">
      <div class="sidebar">
        <div class="logo-container">
          <h2>Admin Portal</h2>
        </div>
        <nav class="nav-menu">
          <router-link 
            to="/admin/overview" 
            class="nav-item"
            :class="{ active: currentView === 'overview' }"
            @click.native="currentView = 'overview'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="nav-icon">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Overview</span>
          </router-link>
          <router-link 
            to="/admin/orders" 
            class="nav-item"
            :class="{ active: currentView === 'orders' }" 
            @click.native="currentView = 'orders'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="nav-icon">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Orders</span>
          </router-link>
          <router-link 
            to="/admin/products" 
            class="nav-item"
            :class="{ active: currentView === 'products' }" 
            @click.native="currentView = 'products'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="nav-icon">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>Products</span>
          </router-link>
          <router-link 
            to="/admin/customers" 
            class="nav-item"
            :class="{ active: currentView === 'customers' }" 
            @click.native="currentView = 'customers'"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="nav-icon">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>Customers</span>
          </router-link>
          <router-link 
            to="/account" 
            class="nav-item account-link"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="nav-icon">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Account</span>
          </router-link>
        </nav>
      </div>
      
      <div class="main-content">
        <div class="header">
          <div class="page-title">
            <h1>{{ pageTitle }}</h1>
          </div>
          <div class="user-menu">
            <div class="notifications">
              <span class="notification-icon">🔔</span>
              <span class="notification-badge" v-if="notifications.length">{{ notifications.length }}</span>
            </div>
            <div class="admin-profile">
              <img src="https://i.pinimg.com/736x/00/2b/bb/002bbbd5d49ed16792bb8d794a74a8cd.jpg" alt="Admin profile" class="admin-avatar">
              <span class="admin-name">Admin User</span>
            </div>
          </div>
        </div>
        
        <!-- Overview Dashboard -->
        <div v-if="currentView === 'overview'" class="dashboard-view">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-value">{{ totalOrders }}</div>
              <div class="stat-label">Total Orders</div>
              <div class="stat-change" :class="ordersTrend > 0 ? 'positive' : 'negative'">
                {{ ordersTrend > 0 ? '+' : '' }}{{ ordersTrend }}% from last week
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-value">${{ revenue.toFixed(2) }}</div>
              <div class="stat-label">Revenue</div>
              <div class="stat-change" :class="revenueTrend > 0 ? 'positive' : 'negative'">
                {{ revenueTrend > 0 ? '+' : '' }}{{ revenueTrend }}% from last week
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-value">{{ pendingOrders }}</div>
              <div class="stat-label">Pending Orders</div>
            </div>
            
            <div class="stat-card">
              <div class="stat-value">{{ lowStockProducts }}</div>
              <div class="stat-label">Low Stock Products</div>
            </div>
          </div>
          
          <div class="recent-activity">
            <h3>Recent Activity</h3>
            <div class="activity-list">
              <div v-for="(activity, index) in recentActivities" :key="index" class="activity-item">
                <div class="activity-icon" :class="activity.type">
                  {{ activityIcons[activity.type] }}
                </div>
                <div class="activity-details">
                  <div class="activity-message">{{ activity.message }}</div>
                  <div class="activity-time">{{ activity.time }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Orders Management -->
        <div v-if="currentView === 'orders'" class="orders-view">
          <div class="view-controls">
            <div class="search-box">
              <input 
                type="text" 
                v-model="orderSearchQuery" 
                placeholder="Search orders..."
                @input="filterOrders"
              >
            </div>
            <div class="filter-options">
              <select v-model="orderStatusFilter" @change="filterOrders">
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          <div class="orders-table-container">
            <table class="orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Date</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in filteredOrders" :key="order.id" @click="showOrderDetails(order)" class="order-row">
                  <td>#{{ order.id }}</td>
                  <td>{{ order.customer.name }}</td>
                  <td>{{ formatDate(order.date) }}</td>
                  <td>{{ order.items.length }}</td>
                  <td>${{ order.total.toFixed(2) }}</td>
                  <td>
                    <span class="order-status" :class="order.status.toLowerCase()">
                      {{ order.status }}
                    </span>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button class="btn-icon" @click.stop="showOrderDetails(order)" title="View Details">
                        👁️
                      </button>
                      <button class="btn-icon" @click.stop="updateOrderStatus(order, getNextStatus(order.status))" title="Update Status">
                        ↻
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Order Details Modal -->
          <div v-if="selectedOrder" class="modal-overlay" @click.self="closeOrderDetails">
            <div class="modal-content order-details-modal">
              <button class="modal-close" @click="closeOrderDetails">&times;</button>
              <h2>Order #{{ selectedOrder.id }}</h2>
              
              <div class="order-info-grid">
                <div class="order-info-section">
                  <h3>Customer Information</h3>
                  <p><strong>Name:</strong> {{ selectedOrder.customer.name }}</p>
                  <p><strong>Email:</strong> {{ selectedOrder.customer.email }}</p>
                  <p><strong>Phone:</strong> {{ selectedOrder.customer.phone }}</p>
                </div>
                
                <div class="order-info-section">
                  <h3>Shipping Address</h3>
                  <p>{{ selectedOrder.shippingAddress.street }}</p>
                  <p>{{ selectedOrder.shippingAddress.city }}, {{ selectedOrder.shippingAddress.state }} {{ selectedOrder.shippingAddress.zip }}</p>
                  <p>{{ selectedOrder.shippingAddress.country }}</p>
                </div>
                
                <div class="order-info-section">
                  <h3>Order Details</h3>
                  <p><strong>Date:</strong> {{ formatDate(selectedOrder.date) }}</p>
                  <p><strong>Payment Method:</strong> {{ selectedOrder.paymentMethod }}</p>
                  <p><strong>Status:</strong> 
                    <select v-model="selectedOrder.status" @change="updateOrderStatus(selectedOrder, selectedOrder.status)">
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </p>
                </div>
              </div>
              
              <div class="order-items">
                <h3>Order Items</h3>
                <table class="order-items-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in selectedOrder.items" :key="item.product.id">
                      <td class="product-cell">
                        <div class="product-info">
                          <img :src="item.product.image" :alt="item.product.name" class="product-thumb">
                          <span>{{ item.product.name }}</span>
                        </div>
                      </td>
                      <td>${{ item.product.price.toFixed(2) }}</td>
                      <td>{{ item.quantity }}</td>
                      <td>${{ (item.product.price * item.quantity).toFixed(2) }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="3" class="text-right"><strong>Subtotal</strong></td>
                      <td>${{ calculateSubtotal(selectedOrder.items).toFixed(2) }}</td>
                    </tr>
                    <tr>
                      <td colspan="3" class="text-right"><strong>Shipping</strong></td>
                      <td>${{ selectedOrder.shipping.toFixed(2) }}</td>
                    </tr>
                    <tr>
                      <td colspan="3" class="text-right"><strong>Tax</strong></td>
                      <td>${{ selectedOrder.tax.toFixed(2) }}</td>
                    </tr>
                    <tr class="total-row">
                      <td colspan="3" class="text-right"><strong>Total</strong></td>
                      <td>${{ selectedOrder.total.toFixed(2) }}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              <div class="order-actions">
                <button class="btn" @click="printOrder(selectedOrder)">Print Order</button>
                <button class="btn" @click="createShippingLabel(selectedOrder)">Create Shipping Label</button>
                <button class="btn btn-danger" @click="confirmCancelOrder(selectedOrder)">Cancel Order</button>
              </div>
            </div>
          </div>
          
          <!-- Cancel Order Confirmation Modal -->
          <div v-if="showCancelModal" class="modal-overlay">
            <div class="modal-content confirmation-modal">
              <h3>Cancel Order?</h3>
              <p>Are you sure you want to cancel order #{{ selectedOrder.id }}? This action cannot be undone.</p>
              <div class="confirmation-actions">
                <button class="btn btn-outline" @click="showCancelModal = false">No, Keep Order</button>
                <button class="btn btn-danger" @click="cancelOrder()">Yes, Cancel Order</button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Products Management Preview -->
        <div v-if="currentView === 'products'" class="products-view">
          <div class="placeholder-message">
            <h3>Products Management</h3>
            <p>This section would allow you to manage your product catalog, update inventory, and modify product details.</p>
          </div>
        </div>
        
        <!-- Customers Management Preview -->
        <div v-if="currentView === 'customers'" class="customers-view">
          <div class="placeholder-message">
            <h3>Customer Management</h3>
            <p>This section would allow you to view customer information, purchase history, and manage customer accounts.</p>
          </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div class="mobile-actions">
          <router-link to="/admin/overview" class="mobile-action-item" @click.native="currentView = 'overview'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Overview</span>
          </router-link>
          <router-link to="/admin/orders" class="mobile-action-item" @click.native="currentView = 'orders'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Orders</span>
          </router-link>
          <router-link to="/admin/products" class="mobile-action-item" @click.native="currentView = 'products'">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>Products</span>
          </router-link>
          <router-link to="/account" class="mobile-action-item">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Account</span>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentView: 'orders', // Default view
        notifications: [
          { id: 1, message: 'New order received', time: '10 minutes ago' },
          { id: 2, message: 'Order #1028 needs attention', time: '1 hour ago' }
        ],
        // Sample orders data (in a real app, this would come from an API)
        orders: [
          {
            id: '1032',
            customer: {
              name: 'John Smith',
              email: 'john.smith@example.com',
              phone: '(555) 123-4567'
            },
            date: new Date(2025, 4, 1), // May 1, 2025
            items: [
              {
                product: {
                  id: 1,
                  name: 'Wireless Headphones',
                  price: 129.99,
                  image: 'https://i.pinimg.com/736x/c9/d3/d9/c9d3d9497ff6778e67c4538fd1067837.jpg'
                },
                quantity: 1
              },
              {
                product: {
                  id: 3,
                  name: 'Smartphone Case',
                  price: 24.99,
                  image: 'https://i.pinimg.com/736x/d1/f0/cb/d1f0cbb5f686222c8be2f3b8f1585e40.jpg'
                },
                quantity: 2
              }
            ],
            total: 179.97,
            subtotal: 179.97,
            tax: 14.40,
            shipping: 5.99,
            status: 'Pending',
            paymentMethod: 'Credit Card',
            shippingAddress: {
              street: '123 Main St',
              city: 'Anytown',
              state: 'CA',
              zip: '90210',
              country: 'USA'
            }
          },
          {
            id: '1031',
            customer: {
              name: 'Sarah Johnson',
              email: 'sarah.j@example.com',
              phone: '(555) 987-6543'
            },
            date: new Date(2025, 4, 1), // May 1, 2025
            items: [
              {
                product: {
                  id: 2,
                  name: 'Bluetooth Speaker',
                  price: 79.99,
                  image: 'https://i.pinimg.com/736x/c1/1f/6b/c11f6b8df3673521075d3a731fe7b5f2.jpg'
                },
                quantity: 1
              }
            ],
            total: 85.99,
            subtotal: 79.99,
            tax: 6.40,
            shipping: 5.99,
            status: 'Processing',
            paymentMethod: 'PayPal',
            shippingAddress: {
              street: '456 Oak Ave',
              city: 'Somewhere',
              state: 'NY',
              zip: '10001',
              country: 'USA'
            }
          },
          {
            id: '1030',
            customer: {
              name: 'Robert Chen',
              email: 'robert.c@example.com',
              phone: '(555) 456-7890'
            },
            date: new Date(2025, 3, 28), // April 28, 2025
            items: [
              {
                product: {
                  id: 4,
                  name: 'Tablet Stand',
                  price: 34.99,
                  image: 'https://i.pinimg.com/736x/f8/ad/6a/f8ad6a824b7d2f50e5d732371d8e39c5.jpg'
                },
                quantity: 1
              },
              {
                product: {
                  id: 5,
                  name: 'USB-C Cable',
                  price: 12.99,
                  image: 'https://i.pinimg.com/736x/68/a8/3d/68a83d7454999c9d116b6d6bc86f0919.jpg'
                },
                quantity: 3
              }
            ],
            total: 86.96,
            subtotal: 73.96,
            tax: 7.01,
            shipping: 5.99,
            status: 'Shipped',
            paymentMethod: 'Credit Card',
            shippingAddress: {
              street: '789 Pine St',
              city: 'Elsewhere',
              state: 'WA',
              zip: '98101',
              country: 'USA'
            }
          },
          {
            id: '1029',
            customer: {
              name: 'Emma Davis',
              email: 'emma.d@example.com',
              phone: '(555) 234-5678'
            },
            date: new Date(2025, 3, 25), // April 25, 2025
            items: [
              {
                product: {
                  id: 6,
                  name: 'Wireless Charger',
                  price: 39.99,
                  image: 'https://i.pinimg.com/736x/7b/7e/43/7b7e43fc22323e9b6b3c7b2c43d096ef.jpg'
                },
                quantity: 2
              }
            ],
            total: 89.98,
            subtotal: 79.98,
            tax: 6.40,
            shipping: 9.99,
            status: 'Delivered',
            paymentMethod: 'PayPal',
            shippingAddress: {
              street: '101 Maple Dr',
              city: 'Nowhereville',
              state: 'TX',
              zip: '75001',
              country: 'USA'
            }
          },
          {
            id: '1028',
            customer: {
              name: 'Michael Brown',
              email: 'michael.b@example.com',
              phone: '(555) 876-5432'
            },
            date: new Date(2025, 3, 22), // April 22, 2025
            items: [
              {
                product: {
                  id: 7,
                  name: 'Smart Watch',
                  price: 199.99,
                  image: 'https://i.pinimg.com/736x/0d/0b/80/0d0b8088b45b9e0c97a80bfbb537e382.jpg'
                },
                quantity: 1
              },
              {
                product: {
                  id: 8,
                  name: 'Screen Protector',
                  price: 14.99,
                  image: 'https://i.pinimg.com/736x/62/45/3d/62453d757a47800e91da9befd07d133a.jpg'
                },
                quantity: 2
              }
            ],
            total: 229.97,
            subtotal: 229.97,
            tax: 18.40,
            shipping: 0, // Free shipping
            status: 'Cancelled',
            paymentMethod: 'Credit Card',
            shippingAddress: {
              street: '321 Cedar St',
              city: 'Somewhere',
              state: 'IL',
              zip: '60007',
              country: 'USA'
            }
          }
        ],
        filteredOrders: [],
        orderSearchQuery: '',
        orderStatusFilter: 'all',
        selectedOrder: null,
        showCancelModal: false,
        
        // Activity data for dashboard
        recentActivities: [
          { type: 'order', message: 'New order #1032 received from John Smith', time: '10 minutes ago' },
          { type: 'shipping', message: 'Order #1030 has been shipped', time: '2 hours ago' },
          { type: 'inventory', message: 'Wireless Headphones stock is running low', time: '3 hours ago' },
          { type: 'order', message: 'Order #1031 payment confirmed', time: '5 hours ago' },
          { type: 'customer', message: 'New customer account created: Sarah Johnson', time: '1 day ago' }
        ],
        activityIcons: {
          order: '🛒',
          shipping: '📦',
          inventory: '📋',
          customer: '👤'
        },
        
        // Overview stats
        totalOrders: 0,
        pendingOrders: 0,
        revenue: 0,
        lowStockProducts: 3,
        ordersTrend: 12,
        revenueTrend: 8
      };
    },
    computed: {
      pageTitle() {
        switch (this.currentView) {
          case 'overview': return 'Dashboard Overview';
          case 'orders': return 'Order Management';
          case 'products': return 'Product Management';
          case 'customers': return 'Customer Management';
          default: return 'Dashboard';
        }
      }
    },
    mounted() {
      this.filterOrders();
      this.calculateDashboardStats();
    },
    methods: {
      filterOrders() {
        let result = this.orders;
        
        // Filter by search query
        if (this.orderSearchQuery.trim()) {
          const query = this.orderSearchQuery.toLowerCase();
          result = result.filter(order => 
            order.id.includes(query) || 
            order.customer.name.toLowerCase().includes(query) || 
            order.customer.email.toLowerCase().includes(query)
          );
        }
        
        // Filter by status
        if (this.orderStatusFilter !== 'all') {
          result = result.filter(order => 
            order.status.toLowerCase() === this.orderStatusFilter
          );
        }
        
        this.filteredOrders = result;
      },
      formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'short', 
          day: 'numeric' 
        });
      },
      showOrderDetails(order) {
        this.selectedOrder = { ...order };
        document.body.classList.add('modal-open');
      },
      closeOrderDetails() {
        this.selectedOrder = null;
        document.body.classList.remove('modal-open');
      },
      calculateSubtotal(items) {
        return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      },
      getNextStatus(currentStatus) {
        const statusFlow = {
          'Pending': 'Processing',
          'Processing': 'Shipped',
          'Shipped': 'Delivered',
          'Delivered': 'Delivered', // No next status
          'Cancelled': 'Cancelled' // No next status
        };
        
        return statusFlow[currentStatus] || currentStatus;
      },
      updateOrderStatus(order, newStatus) {
        // In a real app, this would make an API call
        
        // Update in the orders array
        const orderIndex = this.orders.findIndex(o => o.id === order.id);
        if (orderIndex !== -1) {
          this.orders[orderIndex].status = newStatus;
        }
        
        // If the order is selected, update that too
        if (this.selectedOrder && this.selectedOrder.id === order.id) {
          this.selectedOrder.status = newStatus;
        }
        
        // Re-filter orders
        this.filterOrders();
        
        // Add to activity log
        this.recentActivities.unshift({
          type: 'order',
          message: `Order #${order.id} status updated to ${newStatus}`,
          time: 'Just now'
        });
        
        // Recalculate stats
        this.calculateDashboardStats();
      },
      confirmCancelOrder(order) {
        if (order.status === 'Cancelled') {
          alert('This order is already cancelled.');
          return;
        }
        
        this.showCancelModal = true;
      },
      cancelOrder() {
        if (this.selectedOrder) {
          this.updateOrderStatus(this.selectedOrder, 'Cancelled');
          this.showCancelModal = false;
        }
      },
      printOrder(order) {
        // In a real app, this would open a print dialog with formatted order details
        alert(`Printing order #${order.id}`);
      },
      createShippingLabel(order) {
        // In a real app, this would generate a shipping label
        alert(`Creating shipping label for order #${order.id}`);
      },
      calculateDashboardStats() {
        // Calculate total orders
        this.totalOrders = this.orders.length;
        
        // Calculate pending orders
        this.pendingOrders = this.orders.filter(order => 
          order.status === 'Pending' || order.status === 'Processing'
        ).length;
        
        // Calculate revenue
        this.revenue = this.orders.reduce((sum, order) => 
          order.status !== 'Cancelled' ? sum + order.total : sum, 0
        );
      }
    }
  };
  </script>
  
  <style scoped>
  /* Main layout */
  /* Main layout */
.admin-dashboard {
  display: flex;
  height: 100vh;
  background-color: #f5f7fa;
  color: #333;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* Sidebar styles */
.sidebar {
  width: 250px;
  background-color: #1a1c23;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s;
}

.logo-container {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-container h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
}

.nav-menu {
  padding: 1rem 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  color: #a0aec0;
  text-decoration: none;
  transition: all 0.2s;
  margin: 0.25rem 0;
}

.nav-item:hover, .nav-item.active {
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.nav-icon {
  width: 20px;
  height: 20px;
  margin-right: 0.75rem;
}

.account-link {
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1rem;
  margin-bottom: 1rem;
}

/* Main content area */
.main-content {
  flex-grow: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: white;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  z-index: 2;
}

.page-title h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
}

.user-menu {
  display: flex;
  align-items: center;
}

.notifications {
  position: relative;
  margin-right: 1.5rem;
  cursor: pointer;
}

.notification-icon {
  font-size: 1.25rem;
}

.notification-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #f56565;
  color: white;
  font-size: 0.7rem;
  padding: 0.1rem 0.35rem;
  border-radius: 50%;
}

.admin-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.admin-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 0.75rem;
  object-fit: cover;
}

.admin-name {
  font-weight: 500;
}

/* Dashboard Overview */
.dashboard-view {
  padding: 2rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #718096;
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.stat-change {
  font-size: 0.875rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  display: inline-block;
}

.stat-change.positive {
  background-color: rgba(72, 187, 120, 0.1);
  color: #48bb78;
}

.stat-change.negative {
  background-color: rgba(245, 101, 101, 0.1);
  color: #f56565;
}

.recent-activity {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.recent-activity h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
}

.activity-list {
  display: flex;
  flex-direction: column;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px solid #edf2f7;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #ebf4ff;
  color: #3182ce;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  margin-right: 1rem;
}

.activity-icon.order {
  background-color: #ebf4ff;
  color: #3182ce;
}

.activity-icon.shipping {
  background-color: #e6fffa;
  color: #38b2ac;
}

.activity-icon.inventory {
  background-color: #fefcbf;
  color: #d69e2e;
}

.activity-icon.customer {
  background-color: #feebc8;
  color: #dd6b20;
}

.activity-details {
  flex-grow: 1;
}

.activity-message {
  margin-bottom: 0.25rem;
  font-weight: 500;
  color: #2d3748;
}

.activity-time {
  font-size: 0.875rem;
  color: #a0aec0;
}

/* Orders View */
.orders-view {
  padding: 1.5rem;
}

.view-controls {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.search-box input {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  width: 300px;
  font-size: 0.875rem;
}

.filter-options select {
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  background-color: white;
}

.orders-table-container {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
}

.orders-table th {
  background-color: #f7fafc;
  text-align: left;
  padding: 1rem;
  font-weight: 600;
  color: #4a5568;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
}

.orders-table td {
  padding: 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3748;
  font-size: 0.875rem;
}

.order-row {
  cursor: pointer;
  transition: background-color 0.2s;
}

.order-row:hover {
  background-color: #f7fafc;
}

.order-status {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.order-status.pending {
  background-color: #fefcbf;
  color: #d69e2e;
}

.order-status.processing {
  background-color: #e6fffa;
  color: #38b2ac;
}

.order-status.shipped {
  background-color: #ebf4ff;
  color: #3182ce;
}

.order-status.delivered {
  background-color: #c6f6d5;
  color: #38a169;
}

.order-status.cancelled {
  background-color: #fed7d7;
  color: #e53e3e;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: background-color 0.2s;
}

.btn-icon:hover {
  background-color: #f0f0f0;
}

/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.modal-content {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  width: 90%;
  max-width: 1000px;
}

.order-details-modal {
  padding: 2rem;
}

.modal-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #a0aec0;
  transition: color 0.2s;
}

.modal-close:hover {
  color: #4a5568;
}

.order-info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.order-info-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
}

.order-info-section p {
  margin: 0.5rem 0;
  color: #2d3748;
  font-size: 0.875rem;
}

.order-items {
  margin-bottom: 2rem;
}

.order-items h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #4a5568;
}

.order-items-table {
  width: 100%;
  border-collapse: collapse;
}

.order-items-table th {
  background-color: #f7fafc;
  text-align: left;
  padding: 0.75rem 1rem;
  font-weight: 500;
  color: #4a5568;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
}

.order-items-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  color: #2d3748;
  font-size: 0.875rem;
}

.product-cell {
  min-width: 250px;
}

.product-info {
  display: flex;
  align-items: center;
}

.product-thumb {
  width: 40px;
  height: 40px;
  margin-right: 0.75rem;
  border-radius: 0.25rem;
  object-fit: cover;
}

.text-right {
  text-align: right;
}

.total-row {
  font-weight: 600;
  font-size: 1rem;
}

.order-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 0.25rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn:hover {
  background-color: #3182ce;
}

.btn-outline {
  background-color: white;
  color: #4299e1;
  border: 1px solid #4299e1;
}

.btn-outline:hover {
  background-color: #ebf8ff;
}

.btn-danger {
  background-color: #f56565;
}

.btn-danger:hover {
  background-color: #e53e3e;
}

.confirmation-modal {
  padding: 1.5rem;
  max-width: 400px;
  text-align: center;
}

.confirmation-modal h3 {
  margin-top: 0;
  color: #2d3748;
}

.confirmation-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

/* Placeholder sections */
.placeholder-message {
  background-color: white;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  text-align: center;
  margin: 2rem;
}

.placeholder-message h3 {
  margin-top: 0;
  color: #2d3748;
}

.placeholder-message p {
  color: #718096;
}

/* Mobile navigation */
.mobile-actions {
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.75rem;
}

.mobile-action-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  text-decoration: none;
  color: #718096;
  padding: 0.5rem;
  font-size: 0.75rem;
}

.mobile-action-item svg {
  width: 24px;
  height: 24px;
  margin-bottom: 0.25rem;
}

/* Responsive styles */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .admin-dashboard {
    flex-direction: column;
  }
  
  .sidebar {
    width: 100%;
    height: auto;
  }
  
  .nav-menu {
    flex-direction: row;
    overflow-x: auto;
    padding: 1rem;
  }
  
  .nav-item {
    padding: 0.5rem 1rem;
  }
  
  .nav-icon {
    margin-right: 0.5rem;
  }
  
  .account-link {
    display: none;
  }
  
  .main-content {
    padding-bottom: 70px; /* Space for mobile navigation */
  }
  
  .mobile-actions {
    display: flex;
  }
  
  .header {
    padding: 1rem;
  }
  
  .admin-name {
    display: none;
  }
  
  .search-box input {
    width: 100%;
  }
  
  .view-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .order-info-grid {
    grid-template-columns: 1fr;
  }
  
  .order-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .orders-table {
    display: block;
    overflow-x: auto;
  }
}

body.modal-open {
  overflow: hidden;
}
  </style>