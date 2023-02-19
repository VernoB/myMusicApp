<template>
  <main>
    <div class="container max-w-6xl mx-auto my-16 px-10 antialiased">
      <div id="about" class="grid grid-cols-2 gap-8">
        <div>
          <figure class="relative">
            <img
              class="w-full rounded-md bg-cover aspect-square shadow-lg"
              src="../assets/jason-goodman-bzqU01v-G54-unsplash.jpg"
              alt=""
            />
            <figcaption
              class="px-4 py-4 rounded-tl-2xl rounded-br-2xl overflow-hidden absolute bottom-0 rounded-b-sm bg-gradient-to-bl from-blue-500 to-teal-500"
            >
              My desire is to improved more myself.
            </figcaption>
          </figure>
        </div>

        <div>
          <h1 class="font-serif text-4xl font-semibold text-cyan-900 py-6">
            About Mu<span class="font-light">sic</span>
          </h1>
          <p class="text-xl text-gray-500">
            It's a great application with all feature that Vue offers designed
            and thinking to show you my works, some of the features used in with
            Composition Api are :
          </p>
          <ul class="text-gray-500 mx-8 list-disc list-outside py-4 columns-2">
            <li>Directives</li>
            <li>Events</li>
            <li>Props</li>
            <li>Lifecycle hooks</li>
            <li>Slots</li>
            <li>State management</li>
            <li>Transition</li>
            <li>Server-side rendering &mdash; SSR</li>
            <li>Transition</li>
            <li>Performance Optimization</li>
          </ul>
          <p class="text-xl text-gray-500">
            We also use tools and libraries likes :
          </p>
          <ul class="text-gray-500 mx-8 list-disc list-outside py-4 columns-2">
            <li>Pinia</li>
            <li>Vee-validate</li>
            <li>Animate.css</li>
            <li>Firebase</li>
            <li>Tailwindcss</li>
            <li>Github</li>
            <li>Vite</li>
            <li>Prettier</li>
            <li>Figma for wireframe</li>
            <li>And eslint</li>
          </ul>
          <span class="text-gray-500 block pt-8">
            I will be happy to hear about you soon
            <i class="text-cyan-900 fa fa-heart"></i
          ></span>
        </div>
      </div>
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
