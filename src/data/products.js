// products.js - Store product information for the Vue application

const products = [
    {
      id: 1,
      name: "Smartphone X",
      description: "Latest smartphone with advanced camera system, all-day battery life, and powerful performance. Features the newest processor and an edge-to-edge display for immersive viewing.",
      price: 799.99,
      image: "https://i.pinimg.com/736x/bb/fd/fb/bbfdfb78e632b2238191a05124779ed9.jpg",
      rating: 4.5,
      reviewCount: 128,
      specs: [
        { name: "Display", value: "6.5-inch OLED" },
        { name: "Processor", value: "Octa-core 2.8GHz" },
        { name: "RAM", value: "8GB" },
        { name: "Storage", value: "128GB" },
        { name: "Camera", value: "Triple 12MP + 12MP + 16MP" },
        { name: "Battery", value: "4500mAh" }
      ]
    },
    {
      id: 2,
      name: "Laptop Pro",
      description: "High-performance laptop designed for professionals and creatives. Featuring a stunning display, powerful graphics, and all-day battery life to handle your most demanding tasks.",
      price: 1299.99,
      image: "https://i.pinimg.com/736x/26/93/10/269310705c983749d2ec0c7502a77de8.jpg",
      rating: 4.8,
      reviewCount: 95,
      specs: [
        { name: "Display", value: "14-inch 4K" },
        { name: "Processor", value: "Intel Core i7" },
        { name: "RAM", value: "16GB" },
        { name: "Storage", value: "512GB SSD" },
        { name: "Graphics", value: "Dedicated 6GB VRAM" },
        { name: "Battery", value: "Up to 12 hours" }
      ]
    },
    {
      id: 3,
      name: "Wireless Headphones",
      description: "Premium noise-cancelling wireless headphones with crystal-clear sound quality. Perfect for immersive listening experiences whether you're working, traveling, or relaxing at home.",
      price: 249.99,
      image: "https://i.pinimg.com/736x/81/5c/97/815c97598cc55a2186fb8334168490f0.jpg",
      rating: 4.6,
      reviewCount: 214,
      specs: [
        { name: "Type", value: "Over-ear" },
        { name: "Battery Life", value: "30 hours" },
        { name: "Connectivity", value: "Bluetooth 5.0" },
        { name: "Noise Cancellation", value: "Adaptive ANC" },
        { name: "Charging", value: "USB-C Fast Charge" },
        { name: "Weight", value: "255g" }
      ]
    },
    {
      id: 4,
      name: "Smart Watch",
      description: "Advanced fitness and health tracking smart watch with always-on display. Monitor your workouts, sleep, heart rate and more while staying connected with notifications and apps.",
      price: 199.99,
      image: "https://i.pinimg.com/736x/d7/21/dd/d721dd94aa8438636d24bf2504a74318.jpg",
      rating: 4.3,
      reviewCount: 167,
      specs: [
        { name: "Display", value: "1.4-inch AMOLED" },
        { name: "Battery", value: "Up to 7 days" },
        { name: "Water Resistance", value: "50m" },
        { name: "Sensors", value: "Heart rate, ECG, SpO2" },
        { name: "Connectivity", value: "Bluetooth, GPS, NFC" },
        { name: "Compatibility", value: "iOS & Android" }
      ]
    },
    {
      id: 5,
      name: "Wireless Earbuds",
      description: "True wireless earbuds with exceptional sound quality and comfortable fit. Featuring touch controls, long battery life, and a compact charging case that fits easily in your pocket.",
      price: 129.99,
      image: "https://i.pinimg.com/736x/8b/78/83/8b7883f20ddb771af92b3559692a8151.jpg",
      rating: 4.4,
      reviewCount: 183,
      specs: [
        { name: "Type", value: "In-ear TWS" },
        { name: "Battery Life", value: "8hrs (28hrs with case)" },
        { name: "Water Resistance", value: "IPX5" },
        { name: "Connectivity", value: "Bluetooth 5.2" },
        { name: "Noise Reduction", value: "Passive isolation" },
        { name: "Controls", value: "Touch sensitive" }
      ]
    },
    {
      id: 6,
      name: "4K Smart TV",
      description: "Ultra HD Smart TV with vibrant colors and immersive sound. Access all your favorite streaming services and enjoy cinema-quality entertainment from the comfort of your home.",
      price: 699.99,
      image: "https://i.pinimg.com/736x/4f/50/15/4f5015ab6b7d3580f0e7d6c3fae9b5cb.jpg",
      rating: 4.7,
      reviewCount: 142,
      specs: [
        { name: "Display", value: "55-inch 4K LED" },
        { name: "Resolution", value: "3840 x 2160" },
        { name: "HDR", value: "Dolby Vision, HDR10+" },
        { name: "Audio", value: "20W Stereo" },
        { name: "Smart Features", value: "Voice Control, App Store" },
        { name: "Connectivity", value: "4x HDMI, 2x USB, Wi-Fi" }
      ]
    },
    {
      id: 7,
      name: "Digital Camera",
      description: "Professional-grade digital camera with advanced autofocus and image stabilization. Capture stunning photos and 4K videos with precision and clarity in any lighting conditions.",
      price: 899.99,
      image: "https://i.pinimg.com/736x/bb/e5/30/bbe530457ef790f682c1121212e8a42f.jpg",
      rating: 4.9,
      reviewCount: 78,
      specs: [
        { name: "Resolution", value: "24.2 MP" },
        { name: "Sensor", value: "APS-C CMOS" },
        { name: "Video", value: "4K 30fps" },
        { name: "ISO Range", value: "100-51200" },
        { name: "Stabilization", value: "5-axis IBIS" },
        { name: "Weight", value: "450g" }
      ]
    },
    {
      id: 8,
      name: "Gaming Console",
      description: "Next-generation gaming console delivering stunning visuals and lightning-fast performance. Experience games with incredible detail, speed, and immersion like never before.",
      price: 499.99,
      image: "https://i.pinimg.com/736x/00/23/85/002385f838126b679040b5d58c4ebd7e.jpg",
      rating: 4.8,
      reviewCount: 203,
      specs: [
        { name: "CPU", value: "8-core 3.5GHz" },
        { name: "GPU", value: "10.3 TFLOPS" },
        { name: "Storage", value: "1TB Custom SSD" },
        { name: "Resolution", value: "Up to 4K 120fps" },
        { name: "Ray Tracing", value: "Hardware Accelerated" },
        { name: "Audio", value: "3D Spatial Audio" }
      ]
    }
  ];
  
  // Export as default for use in Vue components
  export default products;