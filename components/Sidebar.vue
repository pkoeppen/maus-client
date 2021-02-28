<template>
  <div class="fixed w-64 left-0 bottom-0 top-12">
    <simplebar class="h-full">
      <div class="bg-white px-6 py-10 flex flex-col space-y-6 overflow-y-auto">
        <!-- Home -->
        <div class="nav flex flex-col space-y-6 text-gray-700">
          <nuxt-link to="/">
            <i class="fas fa-home w-4 mr-6" /><span>Home</span>
          </nuxt-link>
        </div>
        <hr />
        <!-- Main -->
        <div class="nav flex flex-col space-y-6 text-gray-700">
          <nuxt-link to="/feed/trending" class="hover:text-black"
            ><i class="fas fa-fire-alt w-4 mr-6" /><span
              >Trending</span
            ></nuxt-link
          >
          <nuxt-link to="/feed/subscriptions" class="hover:text-black">
            <i class="fas fa-boxes w-4 mr-6" /><span>Subscriptions</span>
          </nuxt-link>
          <nuxt-link to="/feed/history" class="hover:text-black"
            ><i class="fas fa-history w-4 mr-6" /><span
              >History</span
            ></nuxt-link
          >
          <nuxt-link to="/studio" class="flex items-center hover:text-black"
            ><i class="fas fa-camera w-4 mr-6" /><span>Studio</span>
            <span
              class="animate-pulse inline-flex items-center justify-center ml-3 h-4 px-1 rounded bg-red-500 text-white text-xs font-bold"
            >
              8
            </span></nuxt-link
          >
        </div>
        <hr />
        <!-- Sign In -->
        <div class="px-4 space-y-3">
          <div class="text-sm text-black">
            Sign in to like videos, comment, and subscribe.
          </div>
          <button
            class="group bg-gradient-to-tr from-blue-400 to-green-400 rounded text-white px-3 py-2 w-full font-bold"
            @click="showModal({ modal: 'auth', data: { tab: 0 } })"
          >
            <div
              class="transform group-hover:translate-x-1 transition-transform"
            >
              <i class="fas fa-sign-in-alt w-4 mr-3" /><span>Log In</span>
            </div>
          </button>
        </div>
        <hr />
        <!-- Popular Channels -->
        <div class="space-y-1">
          <div class="font-bold text-gray-600 mb-3">Popular Channels</div>
          <div v-if="!channels.length" class="text-sm text-gray-400">
            No channels found.
          </div>
          <div v-for="(channel, n) of channels.slice(0, 8)" :key="n">
            <nuxt-link
              :to="`/channel/name-${n}`"
              class="p-2 -mx-2 flex items-center space-x-2 hover:bg-gray-100 rounded cursor-pointer"
            >
              <div class="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                <img
                  :src="`https://randomuser.me/api/portraits/thumb/men/${n}.jpg`"
                />
              </div>
              <div class="flex-grow font-bold text-sm truncate">
                {{
                  (Math.random() > 0.5 ? `${channel.name.last} ` : '') +
                  channel.location.state
                }}
              </div>
              <div class="justify-self-end inline-flex items-center">
                <div class="rounded-full w-2 h-2 bg-red-500 mr-1" />
                <div class="text-xs">
                  {{
                    Math.floor(Math.random() * 15) +
                    '.' +
                    Math.floor(Math.random() * 10)
                  }}K
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>
        <hr />
        <!-- Help -->
        <div class="nav flex flex-col space-y-6 text-gray-700">
          <nuxt-link to="/account" class="hover:text-black"
            ><i class="fas fa-cog w-4 mr-6" /><span>Settings</span></nuxt-link
          >
          <nuxt-link to="/help" class="hover:text-black">
            <i class="fas fa-question-circle w-4 mr-6" /><span>Help</span>
          </nuxt-link>
          <nuxt-link to="/feedback" class="hover:text-black"
            ><i class="fas fa-comments w-4 mr-6" /><span
              >Feedback</span
            ></nuxt-link
          >
        </div>
        <hr />
        <!-- Meta -->
        <div class="space-y-4 pb-6 text-gray-600 text-xs">
          <div class="font-bold flex flex-wrap gap-x-3 gap-y-1">
            <nuxt-link to="/about" class="hover:text-black">About</nuxt-link
            ><nuxt-link to="/press" class="hover:text-black">Press</nuxt-link
            ><nuxt-link to="/copyright" class="hover:text-black"
              >Copyright</nuxt-link
            ><nuxt-link to="/contact" class="hover:text-black"
              >Contact</nuxt-link
            ><nuxt-link to="/creators" class="hover:text-black"
              >Creators</nuxt-link
            ><nuxt-link to="/advertise" class="hover:text-black"
              >Advertise</nuxt-link
            ><nuxt-link to="/developers" class="hover:text-black"
              >Developers
            </nuxt-link>
          </div>
          <div class="font-bold flex flex-wrap gap-x-3 gap-y-1">
            <nuxt-link to="/terms" class="hover:text-black">Terms</nuxt-link
            ><nuxt-link to="/privacy" class="hover:text-black"
              >Privacy Policy &amp; Safety</nuxt-link
            >
          </div>
          <div class="text-gray-400">
            &copy; {{ new Date().getFullYear() }} Maus LLC
          </div>
        </div>
      </div>
    </simplebar>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  async fetch() {
    const { data } = await this.$axios.get(
      'https://randomuser.me/api?results=50&nat=us,dk,de,es,fr,gb'
    );
    this.creators = data.results.slice(0, 25);
    this.channels = data.results.slice(25);
  },
  data() {
    return {
      creators: [],
      channels: [],
    };
  },
  computed: {
    ...mapState(['sidebar']),
  },
  methods: {
    ...mapMutations(['showModal']),
  },
};
</script>

<style scoped>
nav .nuxt-link-exact-active {
  @apply text-gray-800 font-bold;
}
</style>
