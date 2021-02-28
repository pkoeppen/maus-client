<template>
  <div>
    <!-- Tabs -->
    <div class="flex text-center font-bold my-6">
      <nuxt-link
        :to="`/channel/${channel.handle}`"
        class="w-1/2 py-2 border-b-2 cursor-pointer"
      >
        Overview
      </nuxt-link>
      <nuxt-link
        :to="`/channel/${channel.handle}/creators`"
        class="w-1/2 py-2 border-b-2 cursor-pointer"
      >
        <div class="inline-flex items-center">
          <span>Creators</span
          ><span
            class="inline-flex items-center justify-center ml-2 h-4 px-1 bg-red-500 rounded text-white text-xs font-bold"
          >
            {{ channel.creators.length }}
          </span>
        </div>
      </nuxt-link>
      <nuxt-link
        :to="`/channel/${channel.handle}/community`"
        class="w-1/2 py-2 border-b-2 cursor-pointer"
      >
        Community
      </nuxt-link>
      <nuxt-link
        :to="`/channel/${channel.handle}/about`"
        class="w-1/2 py-2 border-b-2 cursor-pointer text-blue-500 border-blue-500 bg-gray-100"
      >
        About
      </nuxt-link>
    </div>

    <!-- Tab Panel -->
    <div class="flex gap-6">
      <div class="p-6">
        description contact links stats (growth chart, joined, views, creator
        count, video count, post count, comment count, avg videos per month,
        etc)
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (!to.path.startsWith(`/channel/${from.params.handle}`)) {
        vm.scrollTop();
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    if (!to.path.startsWith(`/channel/${from.params.handle}`)) {
      this.scrollTop();
    }
    next();
  },
  methods: {
    ...mapMutations(['scrollTop']),
  },
};
</script>
