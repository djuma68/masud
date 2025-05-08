<template>
  <div class="home">
    <h1>Welcome to TechElite!</h1>
    <p>Your ultimate destination for the latest electronics and gadgets.</p>

    <div class="cta">
      <button @click="goToProducts">Shop Now</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToProducts = () => {
  router.push('/product') // Navigate to the Products page
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #f4f7fa;
}

.home h1 {
  font-size: 3rem;
  color: #1a1a1a;
  margin-bottom: 1rem;
}

.home p {
  font-size: 1.25rem;
  color: #555;
  margin-bottom: 2rem;
}

.cta button {
  padding: 0.75rem 2rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.cta button:hover {
  background-color: #2c80b4;
}
</style>
