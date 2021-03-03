<template>
  <div>
    <!-- Tabs -->
    <div class="flex text-center">
      <!-- Overview -->
      <nuxt-link :to="`/studio`" class="tab">
        <span class="font-bold">Overview</span>
      </nuxt-link>

      <!-- Settings -->
      <nuxt-link :to="`/studio/settings`" class="tab">
        <span class="font-bold">Settings</span>
      </nuxt-link>

      <!-- Library -->
      <nuxt-link :to="`/studio/library`" class="tab">
        <span class="font-bold">Library</span>
      </nuxt-link>

      <!-- Subscribers -->
      <nuxt-link :to="`/studio/subscribers`" class="tab">
        <div class="inline-flex items-center">
          <span class="font-bold">Subscribers</span
          ><span
            class="inline-flex items-center justify-center ml-2 h-4 px-1 bg-gray-400 rounded text-white text-xs"
          >
            {{ 398 }}
          </span>
        </div>
      </nuxt-link>

      <!-- Channels -->
      <nuxt-link :to="`/studio/channels`" class="tab">
        <div class="inline-flex items-center">
          <span class="font-bold">Channels</span
          ><span
            class="inline-flex items-center justify-center ml-2 h-4 px-1 bg-blue-500 rounded text-white text-xs font-bold"
          >
            {{ 4 }}
          </span>
        </div>
      </nuxt-link>

      <!-- Community -->
      <nuxt-link :to="`/studio/community`" class="tab">
        <span class="font-bold">Community</span>
      </nuxt-link>
    </div>

    <!-- Tab Panel -->
    <div class="py-6">
      <div>subscriber list &amp; filter</div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  async fetch() {
    const { data } = await this.$axios.get('/foo');
    return data;
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(['showModal']),
  },
};
</script>

<style scoped>
.tab {
  @apply w-full py-2 border-b-2 cursor-pointer;
}
.nuxt-link-exact-active {
  @apply text-blue-500 border-blue-500 bg-gray-100;
}
</style>
