<template>
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to TechElite</h1>
        <p class="hero-subtitle">
          Discover the future of technology — smart, sleek, and cutting-edge.
        </p>
        <router-link to="/products" class="hero-button">Explore Products</router-link>
      </div>
    </section>
  </template>
  
  <style scoped>
  .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
    color: white;
    height: 80vh;
    padding: 0 20px;
    text-align: center;
  }
  
  .hero-content {
    max-width: 700px;
  }
  
  .hero-title {
    font-size: 3rem;
    margin-bottom: 20px;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
    margin-bottom: 30px;
  }
  
  .hero-button {
    display: inline-block;
    background-color: #3498db;
    color: white;
    padding: 12px 25px;
    border-radius: 8px;
    font-weight: bold;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }
  
  .hero-button:hover {
    background-color: #2980b9;
  }
  
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2rem;
    }
  
    .hero-subtitle {
      font-size: 1rem;
    }
  }
  </style>
  
  <script>
  export default {
    name: 'Hero'
  }
  </script>
  