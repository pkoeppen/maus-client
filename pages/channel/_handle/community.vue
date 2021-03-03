<template>
  <div>
    <!-- Tabs -->
    <div class="flex text-center font-bold my-6">
      <nuxt-link
        :to="`/channel/${channel.handle}`"
        class="w-full py-2 border-b-2 cursor-pointer"
      >
        Overview
      </nuxt-link>
      <nuxt-link
        :to="`/channel/${channel.handle}/creators`"
        class="w-full py-2 border-b-2 cursor-pointer"
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
        class="w-full py-2 border-b-2 cursor-pointer text-blue-500 border-blue-500 bg-gray-100"
      >
        Community
      </nuxt-link>
      <nuxt-link
        :to="`/channel/${channel.handle}/about`"
        class="w-full py-2 border-b-2 cursor-pointer"
      >
        About
      </nuxt-link>
    </div>

    <!-- Tab Panel -->
    <div class="flex flex-col items-center gap-6">
      <div
        v-for="post of posts"
        :key="post.id"
        class="flex w-full max-w-xl p-6 border gap-3 hover:shadow cursor-pointer"
      >
        <div>
          <div class="w-12 h-12 rounded-full overflow-hidden">
            <img :src="channel.avatar" class="w-full h-full object-cover" />
          </div>
        </div>
        <div class="flex flex-col">
          <div class="text-sm mb-1">
            <span class="mr-2 font-bold">{{ channel.name }}</span
            ><span class="text-gray-500">{{ post.created }} days ago</span>
          </div>
          <div class="leading-tight">
            {{ post.body }}
          </div>
          <div>post thing</div>
        </div>
      </div>
      <div>
        <button
          :class="loading ? 'bg-gray-300 pointer-events-none' : 'bg-gray-500'"
          class="w-28 text-center hover:bg-gray-600 text-sm rounded text-white px-3 py-2 font-bold"
          @click="loadMorePosts({ from: posts.length })"
        >
          <i v-if="loading" class="fas fa-asterisk animate-spin" />
          <span v-else>Load More</span>
        </button>
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
  asyncData() {
    const posts = new Array(3).fill({}).map((_, n) => ({
      id: n,
      created: n,
      body: 'Test post body',
      likes: Math.floor(Math.random * 200),
      dislikes: Math.floor(Math.random * 50),
    }));
    return {
      posts,
      loading: false,
    };
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
    async loadMorePosts({ from }) {
      this.loading = true;
      const posts = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            new Array(3).fill({}).map((_, n) => ({
              id: n + from,
              created: n + from,
              body: 'Test post body',
              likes: Math.floor(Math.random * 200),
              dislikes: Math.floor(Math.random * 50),
            }))
          );
        }, 1000);
      }).finally(() => (this.loading = false));
      this.posts.push(...posts);
    },
  },
};
</script>
