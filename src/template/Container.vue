<template>
  <div class="container">
    <main>
      <!-- 🔥 isi dari luar masuk ke sini -->
      <slot />
    </main>
  </div>
</template>

<script setup>
</script>

<style>
.container {
  display: flex;
  width: 100%;
  max-width: 1200px;
}

</style>