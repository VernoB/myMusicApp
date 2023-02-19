<template>
  <main>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </main>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.2 linear infinite;
}
.fade-live-to {
  transition: all 0.2 linear infinite;
  opacity: 0;
}
</style>
