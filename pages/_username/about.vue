<template>
  <div>
    <!-- Tabs -->
    <div class="flex text-center font-bold my-6">
      <!-- Overview -->
      <nuxt-link
        :to="`/${creator.username}`"
        class="w-1/2 py-2 border-b-2 cursor-pointer"
      >
        Overview
      </nuxt-link>
      <!-- Community -->
      <nuxt-link
        :to="`/${creator.username}/community`"
        class="w-1/2 py-2 border-b-2 cursor-pointer"
      >
        Community
      </nuxt-link>
      <!-- About -->
      <nuxt-link
        :to="`/${creator.username}/about`"
        class="w-1/2 py-2 border-b-2 cursor-pointer text-blue-500 border-blue-500 bg-gray-100"
      >
        About
      </nuxt-link>
    </div>

    <!-- Tab Panel -->
    <div class="flex flex-col gap-6">
      <div class="p-6">
        description contact links stats (growth chart, joined, views, creator
        count, video count, post count, comment count, avg videos per month,
        etc)
      </div>
      <test-chart />
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  props: {
    creator: {
      type: Object,
      required: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!to.path.startsWith(`/${from.params.username}`)) {
        vm.scrollTop();
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (!to.path.startsWith(`/${from.params.username}`)) {
      this.scrollTop();
    }
    next();
  },
  methods: {
    ...mapMutations(['scrollTop']),
  },
};
</script>
