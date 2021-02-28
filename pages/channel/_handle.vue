<template>
  <main>
    <section class="w-full h-56 overflow-hidden">
      <img
        src="https://yt3.ggpht.com/p7fjEUL78FhHnu1LWbvz9DzbaSnY4u2u0zF9gOjLNGnjL4yYxF1g8PpIeLd76I4VI9wcJUjcYPw=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj"
        class="object-cover w-full h-full"
      />
    </section>
    <div class="flex flex-col items-center p-6 divide-y-4">
      <section class="w-full max-w-6xl pb-6">
        <div class="w-full p-6 bg-white shadow-lg rounded">
          <div class="flex items-center justify-between">
            <nuxt-link
              :to="`/channel/${channel.handle}`"
              class="flex items-center"
            >
              <div class="h-20 w-20 overflow-hidden rounded-full mr-4">
                <img class="w-full h-full object-cover" :src="channel.avatar" />
              </div>
              <div>
                <div class="flex items-center">
                  <div class="text-2xl font-bold mr-3">{{ channel.name }}</div>
                  <i class="fa fa-boxes text-gray-500" />
                </div>
                <div class="flex items-center text-sm">
                  <div class="text-gray-500 mr-3 font-bold">
                    &copy;{{ channel.handle }}
                  </div>
                  <div class="rounded-full w-2 h-2 bg-red-500 mr-1" />
                  <div>{{ channel.subscribers }} Subscribers</div>
                </div>
              </div>
            </nuxt-link>
            <div class="flex items-center">
              <i
                class="fas fa-rss mr-4 text-gray-400 hover:text-gray-800 cursor-pointer"
              />
              <button
                class="group flex rounded overflow-hidden text-white font-bold mb-1"
                @click="showModal({ modal: 'subscribe', data: channel })"
              >
                <div
                  class="bg-gradient-to-l from-yellow-500 to-yellow-400 group-hover:from-yellow-400 group-hover:to-yellow-300 flex items-center px-3 py-2"
                >
                  <i class="fas fa-plus-square w-4 mr-3" /><span
                    >Subscribe</span
                  >
                </div>
                <div
                  class="flex items-center px-3 py-2 shadow-inner bg-yellow-600 group-hover:bg-yellow-500"
                >
                  <span>$9.99</span>
                </div>
              </button>
            </div>
          </div>

          <NuxtChild
            v-if="$route.matched.length > 1"
            :key="key"
            :channel="channel"
          />
          <div v-else>
            <!-- Tabs -->
            <div class="flex text-center font-bold my-6">
              <nuxt-link
                :to="`/channel/${channel.handle}`"
                class="w-1/2 py-2 border-b-2 cursor-pointer text-blue-500 border-blue-500 bg-gray-100"
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
                class="w-1/2 py-2 border-b-2 cursor-pointer"
              >
                About
              </nuxt-link>
            </div>

            <!-- Tab Panel -->
            <div class="flex gap-6">
              <div class="flex-grow">
                <div class="relative aspect-ratio-16/9 bg-gray-200">
                  <div class="absolute inset-0">
                    <img
                      :src="`http://www.theonering.net/torwp/wp-content/uploads/2019/03/Tolkien-poster-facebook.jpg`"
                      class="object-cover w-full h-full"
                    />
                  </div>
                  <div
                    class="absolute top-3 left-3 px-2 py-1 bg-black bg-opacity-30 text-white text-xs rounded"
                  >
                    <i class="fas fa-boxes mr-1" />Trailer
                  </div>
                  <div
                    class="group absolute inset-0 flex items-center justify-center cursor-pointer"
                  >
                    <i
                      class="fas fa-play fa-3x text-white opacity-50 group-hover:opacity-100"
                    />
                  </div>
                </div>
              </div>
              <div class="bg-white w-60 flex flex-col">
                <div class="font-bold text-md">
                  The Best Channel in the World
                </div>
                <div class="text-xs text-gray-500 mb-3">
                  Updated: 2 Weeks Ago
                </div>
                <div class="flex-grow relative">
                  <div
                    class="absolute inset-0 text-sm overflow-hidden space-y-2"
                  >
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit.
                    </p>
                    <p>
                      Quis commodo consequat. Duis aute irure dolor in
                      reprehenderit in voluptate velit esse cillum dolore eu
                      fugiat nulla pariatur.
                    </p>
                  </div>
                </div>
                <nuxt-link
                  class="text-center bg-gradient-to-l from-gray-500 to-gray-400 hover:from-gray-600 hover:to-gray-500 rounded text-white px-3 py-2 w-full font-bold"
                  :to="`/channel/${channel.handle}/creators`"
                >
                  <i class="fas fa-users w-4 mr-3" /><span>Our Creators</span>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="w-full my-6">
        <div class="text-2xl my-4">Recent videos</div>
        <h1
          v-if="!channel.creators.length"
          class="text-center text-xl text-gray-400"
        >
          No content found.
        </h1>
        <div
          v-else
          class="flex flex-wrap grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div v-for="(creator, n) of channel.creators.slice(0, 4)" :key="n">
            <nuxt-link :to="`/watch?v=${n}`">
              <div class="relative aspect-ratio-16/9">
                <div class="absolute inset-0">
                  <img
                    :src="creator.video"
                    class="object-cover w-full h-full"
                  />
                </div>
                <div
                  class="absolute bottom-1.5 right-1.5 px-1 py-0.5 bg-black bg-opacity-30 text-white text-xs font-bold rounded"
                >
                  {{ creator.time }}
                </div>
              </div>
            </nuxt-link>
            <div class="flex mt-3 space-x-2">
              <nuxt-link :to="`/${creator.username}`">
                <div class="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    :src="creator.avatar"
                    class="w-full h-full object-cover"
                  />
                </div>
              </nuxt-link>
              <div class="flex-grow">
                <nuxt-link
                  :to="`/watch?v=${n}`"
                  class="font-bold text-sm mb-1 block"
                  >{{ creator.title }}</nuxt-link
                >
                <nuxt-link
                  :to="`/${creator.username}`"
                  class="text-xs text-gray-600 block"
                >
                  {{ creator.name }}<i class="fas fa-check-circle ml-1" />
                </nuxt-link>
              </div>
              <div
                class="justify-self-end px-3 text-gray-600 hover:text-black cursor-pointer"
              >
                <i class="fas fa-ellipsis-v" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="w-full my-6">
        <div class="text-2xl my-4">Most popular</div>
        <h1
          v-if="!channel.creators.length"
          class="text-center text-xl text-gray-400"
        >
          No content found.
        </h1>
        <div
          v-else
          class="flex flex-wrap grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <div v-for="(creator, n) of channel.creators.slice(4, 8)" :key="n">
            <nuxt-link :to="`/watch?v=${n}`">
              <div class="relative aspect-ratio-16/9">
                <div class="absolute inset-0">
                  <img
                    :src="creator.video"
                    class="object-cover w-full h-full"
                  />
                </div>
                <div
                  class="absolute bottom-1.5 right-1.5 px-1 py-0.5 bg-black bg-opacity-30 text-white text-xs font-bold rounded"
                >
                  {{ creator.time }}
                </div>
              </div>
            </nuxt-link>
            <div class="flex mt-3 space-x-2">
              <nuxt-link :to="`/${creator.username}`">
                <div class="w-10 h-10 rounded-full overflow-hidden">
                  <img :src="creator.avatar" />
                </div>
              </nuxt-link>
              <div class="flex-grow">
                <nuxt-link
                  :to="`/watch?v=${n}`"
                  class="font-bold text-sm mb-1 block"
                  >{{ creator.title }}</nuxt-link
                >
                <nuxt-link
                  :to="`/${creator.username}`"
                  class="text-xs text-gray-600 block"
                >
                  {{ creator.name }}<i class="fas fa-check-circle ml-1" />
                </nuxt-link>
              </div>
              <div
                class="justify-self-end px-3 text-gray-600 hover:text-black cursor-pointer"
              >
                <i class="fas fa-ellipsis-v" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  async asyncData({ route, $axios }) {
    const { data } = await $axios.get(
      'https://randomuser.me/api?results=50&nat=us,dk,de,es,fr,gb'
    );
    const creators = data.results.slice(0, 25).map((creator, n) => {
      return {
        avatar: `https://randomuser.me/api/portraits/men/${n}.jpg`,
        username: creator.login.username,
        name: `${creator.name.first} ${creator.name.last}`,
        video: `https://picsum.photos/seed/${(n + 1) * Math.random()}/400/225`,
        videoCount: Math.floor(Math.random() * 100),
        viewCount: Math.floor(Math.random() * 500000),
        title:
          (Math.random() > 0.5 ? `${creator.name.last} ` : '') +
          creator.location.state,
        time: `${Math.floor(Math.random() * 60)}:${String(
          Math.floor(Math.random() * 60)
        ).padStart(2, '0')}`,
      };
    });
    const channel = {
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg/330px-Elon_Musk_Royal_Society_%28crop1%29.jpg',
      handle: route.params.handle,
      name: 'Some Channel',
      creators,
      subscribers: 3297,
      library: Math.floor(Math.random() * 200),
    };
    return { channel, key: route.path };
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
    ...mapMutations(['showModal', 'scrollTop']),
  },
};
</script>
