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
        class="w-1/2 py-2 border-b-2 cursor-pointer text-blue-500 border-blue-500 bg-gray-100"
      >
        <div class="inline-flex items-center">
          <span>Creators</span
          ><span
            class="inline-flex items-center justify-center ml-2 h-4 px-1 bg-blue-500 rounded text-white text-xs font-bold"
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
        class="w-1/2 py-2 border-b-2 cursor-pointer"
      >
        About
      </nuxt-link>
    </div>

    <!-- Tab Panel -->
    <div>
      <div
        class="flex justify-between items-center"
        :class="{ 'mb-6': filteredCreatorCount }"
      >
        <div
          class="flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <i class="fas fa-eye hover:text-black cursor-pointer mr-2" />
          <span class="text-sm"
            >Showing <b>{{ filteredCreatorCount }}</b> creators and
            <b>{{ filteredVideoCount }}</b> videos.</span
          >
        </div>
        <div>
          <div
            class="inline text-gray-500 hover:text-gray-700 cursor-pointer mr-6"
            @click="toggleSortMode()"
          >
            <i
              class="fas fa-sort-amount-up hover:text-black cursor-pointer mr-2"
            />
            <span class="text-sm">{{ sortModes[sort].name }}</span>
          </div>
          <input
            v-model="filter"
            class="outline-none p-2 w-64 rounded text-gray-500 bg-gray-200 placeholder-gray-400 focus:bg-white border-2 focus:border-gray-200 text-sm"
            placeholder="Filter..."
          />
        </div>
      </div>
      <div class="grid gap-3 grid-cols-3 justify-center">
        <nuxt-link
          v-for="creator of filteredCreators"
          :key="creator.username"
          :to="`/${creator.username}`"
          class="flex items-center justify-between p-2 border hover:shadow"
        >
          <div class="flex items-center gap-2">
            <div class="h-14 w-14 overflow-hidden rounded-full">
              <img class="w-full h-full object-cover" :src="creator.avatar" />
            </div>

            <div class="flex flex-col">
              <div class="flex items-center">
                <div class="text-md font-bold mr-1">{{ creator.name }}</div>
                <i class="fa fa-check-circle text-gray-500" />
              </div>
              <div class="text-gray-500 mr-3 text-sm">
                @{{ creator.username }}
              </div>
            </div>
          </div>
          <div
            class="bg-gray-200 text-gray-700 font-bold text-xs rounded px-2 py-1"
          >
            <span>{{ creator.videoCount }}</span
            ><i class="fas fa-film ml-1" />
          </div>
        </nuxt-link>
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
  data() {
    return {
      filter: '',
      sort: 0,
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
  computed: {
    filteredCreators() {
      return this.channel.creators
        .filter((creator) => {
          for (const term of this.filter.split(/\s+/)) {
            if (creator.name.toLowerCase().includes(term.toLowerCase())) {
              return true;
            }
          }
          return false;
        })
        .sort((a, b) => {
          const direction = this.sortModes[this.sort].direction;
          const field = this.sortModes[this.sort].field;
          if (direction === 'asc') {
            return a[field] - b[field];
          }
          if (direction === 'desc') {
            return b[field] - a[field];
          }
          return 0;
        });
    },
    filteredCreatorCount() {
      return this.filteredCreators.length || 0;
    },
    filteredVideoCount() {
      return this.filteredCreators.reduce((acc, cur) => {
        return acc + cur.videoCount;
      }, 0);
    },
    sortModes() {
      return [
        { field: 'viewCount', direction: 'desc', name: 'Most popular' },
        { field: 'viewCount', direction: 'asc', name: 'Least popular' },
        { field: 'videoCount', direction: 'desc', name: 'Most active' },
        { field: 'videoCount', direction: 'asc', name: 'Least active' },
      ];
    },
  },
  methods: {
    ...mapMutations(['scrollTop']),
    toggleSortMode() {
      this.sort = (this.sort + 1) % this.sortModes.length;
    },
  },
};
</script>
