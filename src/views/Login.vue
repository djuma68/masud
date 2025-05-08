<template>
    <div class="login-page">
      <h1>Sign in to your account</h1>
      <div class="form-container">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="email">Email address</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              autocomplete="email" 
              required 
              v-model="email"
              placeholder="your@email.com"
            />
            <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
          </div>
  
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              autocomplete="current-password" 
              required 
              v-model="password"
              placeholder="********"
            />
            <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
          </div>
  
          <div class="form-options">
            <div class="remember-me">
              <input 
                id="remember-me" 
                name="remember-me" 
                type="checkbox" 
                v-model="rememberMe"
              />
              <label for="remember-me">Remember me</label>
            </div>
  
            <div class="forgot-password">
              <a href="#">Forgot your password?</a>
            </div>
          </div>
  
          <button 
            type="submit" 
            class="btn" 
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
          </button>
  
          <div class="register-link">
            <p>
              Don't have an account?
              <router-link to="/signup">Register</router-link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        rememberMe: false,
        isSubmitting: false,
        errors: {
          email: '',
          password: ''
        }
      };
    },
    methods: {
      validateEmail() {
        this.errors.email = '';
        if (!this.email) {
          this.errors.email = 'Email is required';
          return false;
        }
        if (!/^\S+@\S+\.\S+$/.test(this.email)) {
          this.errors.email = 'Email format is invalid';
          return false;
        }
        return true;
      },
  
      validatePassword() {
        this.errors.password = '';
        if (!this.password) {
          this.errors.password = 'Password is required';
          return false;
        }
        if (this.password.length < 6) {
          this.errors.password = 'Password must be at least 6 characters';
          return false;
        }
        return true;
      },
  
      async submitForm() {
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
  
        if (isEmailValid && isPasswordValid) {
          this.isSubmitting = true;
          try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.$emit('login', {
              email: this.email,
              password: this.password,
              rememberMe: this.rememberMe
            });
            
            // Reset form
            this.email = '';
            this.password = '';
            this.rememberMe = false;
          } catch (error) {
            console.error('Login error:', error);
          } finally {
            this.isSubmitting = false;
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-page {
    max-width: 500px;
    margin: 0 auto;
    padding: 2rem 1rem;
  }
  
  h1 {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    color: #333;
    text-align: center;
  }
  
  .form-container {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  .form-group {
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 1rem;
  }
  
  input[type="email"]:focus,
  input[type="password"]:focus {
    border-color: #1a73e8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.2);
  }
  
  .error-message {
    color: #e53935;
    font-size: 0.85rem;
    margin-top: 0.5rem;
  }
  
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  
  .remember-me {
    display: flex;
    align-items: center;
  }
  
  .remember-me input {
    margin-right: 0.5rem;
  }
  
  .forgot-password a {
    color: #1a73e8;
    text-decoration: none;
    font-size: 0.9rem;
  }
  
  .forgot-password a:hover {
    text-decoration: underline;
  }
  
  .register-link {
    text-align: center;
    margin-top: 1.5rem;
  }
  
  .register-link a {
    color: #1a73e8;
    text-decoration: none;
    font-weight: 500;
  }
  
  .register-link a:hover {
    text-decoration: underline;
  }
  </style>