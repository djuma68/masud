<template>
    <div class="signup-page">
      <h1>Create new account</h1>
      <div class="form-container">
        <form @submit.prevent="submitForm">
          <div class="name-fields">
            <div class="form-group">
              <label for="first-name">First name</label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                autocomplete="given-name"
                required
                v-model="firstName"
                placeholder="John"
              />
              <p v-if="errors.firstName" class="error-message">{{ errors.firstName }}</p>
            </div>
            <div class="form-group">
              <label for="last-name">Last name</label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                autocomplete="family-name"
                required
                v-model="lastName"
                placeholder="Doe"
              />
              <p v-if="errors.lastName" class="error-message">{{ errors.lastName }}</p>
            </div>
          </div>
          <div class="form-group">
            <label for="register-email">Email address</label>
            <input
              id="register-email"
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
            <label for="register-password">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              v-model="password"
              placeholder="********"
            />
            <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autocomplete="new-password"
              required
              v-model="confirmPassword"
              placeholder="********"
            />
            <p v-if="errors.confirmPassword" class="error-message">{{ errors.confirmPassword }}</p>
          </div>
          <div class="form-group checkbox">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              v-model="termsAccepted"
            />
            <label for="terms">I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a></label>
            <p v-if="errors.terms" class="error-message">{{ errors.terms }}</p>
          </div>
          <div class="button-container">
            <button type="submit" class="submit-button" :disabled="isSubmitting">
              {{ isSubmitting ? 'Creating account...' : 'Create account' }}
            </button>
          </div>
          <p v-if="submitError" class="submit-error">{{ submitError }}</p>
          <div class="login-link">
            Already have an account? <a href="/login">Log in</a>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignupForm',
    data() {
      return {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
        errors: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: ''
        },
        isSubmitting: false,
        submitError: ''
      }
    },
    methods: {
      validateForm() {
        // Reset errors
        this.errors = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          terms: ''
        }
        
        let isValid = true
  
        // Validate first name
        if (!this.firstName.trim()) {
          this.errors.firstName = 'First name is required'
          isValid = false
        }
  
        // Validate last name
        if (!this.lastName.trim()) {
          this.errors.lastName = 'Last name is required'
          isValid = false
        }
  
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!this.email.trim()) {
          this.errors.email = 'Email is required'
          isValid = false
        } else if (!emailRegex.test(this.email)) {
          this.errors.email = 'Please enter a valid email address'
          isValid = false
        }
  
        // Validate password
        if (!this.password) {
          this.errors.password = 'Password is required'
          isValid = false
        } else if (this.password.length < 8) {
          this.errors.password = 'Password must be at least 8 characters'
          isValid = false
        }
  
        // Validate password confirmation
        if (!this.confirmPassword) {
          this.errors.confirmPassword = 'Please confirm your password'
          isValid = false
        } else if (this.password !== this.confirmPassword) {
          this.errors.confirmPassword = 'Passwords do not match'
          isValid = false
        }
  
        // Validate terms acceptance
        if (!this.termsAccepted) {
          this.errors.terms = 'You must accept the Terms of Service and Privacy Policy'
          isValid = false
        }
  
        return isValid
      },
      async submitForm() {
        if (!this.validateForm()) {
          return
        }
  
        this.isSubmitting = true
        this.submitError = ''
  
        try {
          // Replace with your actual API call
          // For example:
          // const response = await this.$api.auth.register({
          //   firstName: this.firstName,
          //   lastName: this.lastName,
          //   email: this.email,
          //   password: this.password
          // })
  
          // Simulate API call with a timeout
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          // Handle successful registration
          this.$emit('registration-success')
          this.$router.push('/registration-success')
        } catch (error) {
          // Handle registration error
          console.error('Registration failed:', error)
          this.submitError = error.message || 'Registration failed. Please try again.'
        } finally {
          this.isSubmitting = false
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .signup-page {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  h1 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    text-align: center;
    color: #333;
  }
  
  .form-container {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  .name-fields {
    display: flex;
    gap: 1rem;
  }
  
  @media (max-width: 600px) {
    .name-fields {
      flex-direction: column;
      gap: 0;
    }
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #333;
  }
  
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }
  
  input[type="text"]:focus,
  input[type="email"]:focus,
  input[type="password"]:focus {
    border-color: #4a90e2;
    outline: none;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
  
  .checkbox {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .checkbox input {
    margin-top: 0.25rem;
  }
  
  .checkbox label {
    margin-bottom: 0;
    font-weight: normal;
  }
  
  .checkbox a {
    color: #4a90e2;
    text-decoration: none;
  }
  
  .checkbox a:hover {
    text-decoration: underline;
  }
  
  .error-message {
    color: #e53935;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    margin-bottom: 0;
  }
  
  .button-container {
    margin-top: 1.5rem;
  }
  
  .submit-button {
    width: 100%;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.875rem;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .submit-button:hover {
    background-color: #3a7bc8;
  }
  
  .submit-button:disabled {
    background-color: #a0c3e8;
    cursor: not-allowed;
  }
  
  .submit-error {
    color: #e53935;
    text-align: center;
    margin-top: 1rem;
  }
  
  .login-link {
    text-align: center;
    margin-top: 1.5rem;
    font-size: 0.9rem;
    color: #666;
  }
  
  .login-link a {
    color: #4a90e2;
    text-decoration: none;
  }
  
  .login-link a:hover {
    text-decoration: underline;
  }
  </style>