<template>
  <div class="fixed w-16 left-0 bottom-0 top-12">
    <simplebar class="h-full bg-white">
      <div class="py-10 overflow-x-hidden flex flex-col space-y-6">
        <!-- Home -->
        <div class="flex flex-col items-center text-gray-700">
          <nuxt-link to="/">
            <i class="fas fa-home w-4" />
          </nuxt-link>
        </div>
        <hr />
        <!-- Main -->
        <div class="flex flex-col items-center space-y-6 text-gray-700">
          <nuxt-link to="/feed/trending" class="hover:text-black"
            ><i class="fas fa-fire-alt w-4"
          /></nuxt-link>
          <nuxt-link to="/feed/subscriptions" class="hover:text-black">
            <i class="fas fa-boxes w-4" />
          </nuxt-link>
          <nuxt-link to="/feed/history" class="hover:text-black"
            ><i class="fas fa-history w-4"
          /></nuxt-link>
          <nuxt-link to="/studio" class="relative hover:text-black"
            ><i class="fas fa-camera w-4" />
            <span
              class="absolute -top-1 -right-2 animate-pulse inline-flex items-center justify-center ml-3 h-4 px-1 rounded bg-red-500 text-white text-xs font-bold"
            >
              8
            </span></nuxt-link
          >
        </div>
        <hr />
        <!-- Popular Channels -->
        <div class="flex flex-col items-center space-y-6">
          <nuxt-link v-for="n in 4" :key="n" :to="`/channel/name-${n}`">
            <div class="w-6 h-6 rounded-full overflow-hidden">
              <img
                :src="`https://randomuser.me/api/portraits/thumb/men/${n}.jpg`"
              />
            </div>
          </nuxt-link>
        </div>
        <hr class="-mx-6" />
        <!-- Help -->
        <div class="flex flex-col items-center space-y-6 text-gray-700">
          <nuxt-link to="/account" class="hover:text-black"
            ><i class="fas fa-cog w-4"
          /></nuxt-link>
          <nuxt-link to="/help" class="hover:text-black">
            <i class="fas fa-question-circle w-4" />
          </nuxt-link>
          <nuxt-link to="/feedback" class="hover:text-black"
            ><i class="fas fa-comments w-4"
          /></nuxt-link>
        </div>
      </div>
    </simplebar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState(['sidebar']),
  },
  methods: {
    ...mapMutations(['showModal']),
  },
};
</script>

<style scoped>
.nuxt-link-exact-active {
  @apply text-gray-800 font-bold;
}
</style>
