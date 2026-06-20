<template>
  <svg 
    :width="size" 
    :height="size" 
    viewBox="0 0 120 120" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    class="logo-terra"
  >
    <!-- Círculo fondo con animación -->
    <circle 
      cx="60" 
      cy="60" 
      r="55" 
      class="logo-circle"
    />
    
    <!-- Hoja izquierda -->
    <path 
      d="M60 25 C45 25 35 40 35 55 C35 70 45 80 60 85" 
      class="logo-leaf-left"
    />
    
    <!-- Hoja derecha -->
    <path 
      d="M60 25 C75 25 85 40 85 55 C85 70 75 80 60 85" 
      class="logo-leaf-right"
    />
    
    <!-- Tallo -->
    <line 
      x1="60" 
      y1="85" 
      x2="60" 
      y2="105" 
      class="logo-stem"
    />
    
    <!-- Texto TV -->
    <text 
      x="60" 
      y="58" 
      text-anchor="middle" 
      class="logo-text"
    >
      TV
    </text>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 120
  }
})
</script>

<style scoped>
.logo-terra {
  filter: drop-shadow(0 4px 6px rgba(63, 95, 42, 0.2));
}

.logo-circle {
  fill: #3F5F2A;
  stroke: #B88A34;
  stroke-width: 2;
  animation: pulse-circle 3s ease-in-out infinite;
}

.logo-leaf-left {
  fill: #7D9A5A;
  stroke: #3F5F2A;
  stroke-width: 1.5;
  animation: grow-leaf 2s ease-out forwards;
  transform-origin: 60px 85px;
}

.logo-leaf-right {
  fill: #B88A34;
  stroke: #8A6A24;
  stroke-width: 1.5;
  animation: grow-leaf 2s ease-out 0.3s forwards;
  transform-origin: 60px 85px;
  opacity: 0;
}

.logo-stem {
  stroke: #3F5F2A;
  stroke-width: 3;
  stroke-linecap: round;
  animation: grow-stem 1.5s ease-out forwards;
  transform-origin: 60px 105px;
  transform: scaleY(0);
}

.logo-text {
  fill: #FFFDF8;
  font-family: 'Georgia', serif;
  font-size: 24px;
  font-weight: bold;
  opacity: 0;
  animation: fade-in-text 1s ease-out 1.5s forwards;
}

@keyframes pulse-circle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

@keyframes grow-leaf {
  from { 
    transform: scale(0) rotate(-10deg); 
    opacity: 0; 
  }
  to { 
    transform: scale(1) rotate(0deg); 
    opacity: 1; 
  }
}

@keyframes grow-stem {
  from { transform: scaleY(0); }
  to { transform: scaleY(1); }
}

@keyframes fade-in-text {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hover effect */
.logo-terra:hover .logo-circle {
  fill: #2A3F1A;
  transition: fill 0.3s ease;
}

.logo-terra:hover .logo-leaf-left {
  fill: #3F5F2A;
  transition: fill 0.3s ease;
}

.logo-terra:hover .logo-leaf-right {
  fill: #D8B76A;
  transition: fill 0.3s ease;
}
</style>