<template>
  <nav
    class="fixed top-0 w-full flex h-12 px-6 shadow z-10 bg-white"
    :class="nightModeEnabled ? 'bg-black text-white' : 'text-gray-900'"
  >
    <div class="w-1/3 inline-flex items-center justify-start space-x-6">
      <i class="fas fa-bars w-4" />
      <nuxt-link to="/" class="outline-none text-xs">
        <img
          class="h-12"
          src="https://placeholderlogo.com/img/placeholder-logo-5.png"
        />
      </nuxt-link>
    </div>
    <div
      class="w-1/3 inline-flex items-center justify-center space-x-4 text-xs"
    >
      <input
        class="outline-none p-2 w-64 rounded text-gray-500"
        :class="
          nightModeEnabled
            ? 'bg-gray-900 placeholder-gray-200'
            : 'bg-gray-200 placeholder-gray-400'
        "
        placeholder="Search..."
      />
      <i class="fas fa-search text-gray-500 hover:text-black cursor-pointer" />
    </div>
    <div class="w-1/3 inline-flex items-center justify-end text-xs">
      <button
        class="bg-gray-200 hover:bg-gray-300 rounded px-3 py-2 font-bold mr-2"
      >
        <span>Login</span>
      </button>
      <button
        class="bg-green-400 hover:bg-green-500 text-white rounded px-3 py-2 font-bold mr-6"
      >
        <span>Sign Up</span>
      </button>
      <i class="fas fa-cog text-gray-700 hover:text-black cursor-pointer" />
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    admin() {
      // return this.$store.state.api.admin;
      return false;
    },
    nsfwEnabled() {
      // return this.$store.state.nsfwEnabled;
      return false;
    },
    nightModeEnabled() {
      // return this.$store.state.nightModeEnabled;
      return false;
    },
  },
  methods: {
    toggleNsfw() {
      // this.$store.dispatch('toggleNsfw');
    },
  },
};
</script>
