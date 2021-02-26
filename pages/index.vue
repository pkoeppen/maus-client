<template>
  <div>
    <top-nav />
    <!-- Sidebar -->
    <sidebar :creators="creators" :channels="channels" />
    <div class="fixed top-12 bottom-0 left-64 right-0">
      <simplebar class="h-full">
        <main>
          <!-- Featured Content -->
          <section id="featured" class="p-12">
            <div class="flex items-center justify-evenly relative -mx-12">
              <div
                class="h-12 w-12 text-2xl flex items-center justify-center text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <i class="fas fa-angle-left" />
              </div>
              <div class="w-4/5 flex items-stretch shadow-lg">
                <div class="flex-grow">
                  <div class="relative flex-grow aspect-ratio-16/9 bg-gray-200">
                    <div class="absolute inset-0">
                      <img
                        :src="`http://www.theonering.net/torwp/wp-content/uploads/2019/03/Tolkien-poster-facebook.jpg`"
                        class="object-cover h-full"
                      />
                    </div>
                    <div
                      class="absolute top-3 left-3 px-2 py-1 bg-black bg-opacity-30 text-white text-xs rounded"
                    >
                      <i class="fas fa-star mr-1" />Featured
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
                <div class="bg-white w-60 p-6 space-y-3 flex flex-col">
                  <nuxt-link
                    to="/channel/featured"
                    class="flex mt-2 space-x-2 mb-3"
                  >
                    <div class="w-12 h-12 rounded-full overflow-hidden">
                      <img
                        :src="`https://randomuser.me/api/portraits/thumb/women/65.jpg`"
                      />
                    </div>
                    <div class="space-y-1">
                      <div class="font-bold text-sm">Featured Channel</div>
                      <div class="flex items-center">
                        <div class="rounded-full w-2 h-2 bg-red-500 mr-1" />
                        <div class="text-xs">
                          {{
                            Math.floor(Math.random() * 15) +
                            '.' +
                            Math.floor(Math.random() * 10)
                          }}K Subscribers
                        </div>
                      </div>
                    </div>
                  </nuxt-link>
                  <div class="flex-grow relative">
                    <p
                      class="absolute inset-0 text-sm leading-tight overflow-hidden"
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>
                  <button
                    class="bg-gradient-to-r from-yellow-500 to-yellow-400 rounded text-white px-3 py-2 w-full font-bold"
                  >
                    <i class="fas fa-plus-square w-4 mr-3" /><span
                      >Subscribe</span
                    >
                  </button>
                </div>
              </div>
              <div
                class="h-12 w-12 text-2xl flex items-center justify-center text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                <i class="fas fa-angle-right" />
              </div>
            </div>
          </section>

          <hr class="mx-6" />

          <section
            class="p-6 flex flex-wrap grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6"
          >
            <div v-for="n in 4" :key="n">
              <nuxt-link :to="`/watch?v=${n + 4}`">
                <div class="relative aspect-ratio-16/9">
                  <div class="absolute inset-0">
                    <img
                      :src="`https://picsum.photos/seed/${n + 4}/400/225`"
                      class="object-cover"
                    />
                  </div>
                  <div
                    class="absolute bottom-1.5 right-1.5 px-1 py-0.5 bg-black bg-opacity-30 text-white text-xs font-bold rounded"
                  >
                    {{
                      `${Math.floor(Math.random() * 60)}:${String(
                        Math.floor(Math.random() * 60)
                      ).padStart(2, '0')}`
                    }}
                  </div>
                </div>
              </nuxt-link>
              <div class="flex mt-3 space-x-2">
                <nuxt-link :to="`/${creators[n + 4].login.username}`">
                  <div class="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      :src="`https://randomuser.me/api/portraits/thumb/men/${
                        n + 4
                      }.jpg`"
                    />
                  </div>
                </nuxt-link>
                <div class="flex-grow">
                  <nuxt-link
                    :to="`/watch?v=${n + 4}`"
                    class="font-bold text-sm mb-1 block"
                    >Title Goes Here</nuxt-link
                  >
                  <nuxt-link
                    :to="`/${creators[n + 4].login.username}`"
                    class="text-xs text-gray-600 block"
                  >
                    {{ creators[n + 4].name.first + ' ' + creators[n].name.last
                    }}<i class="fas fa-check-circle ml-1" />
                  </nuxt-link>
                  <nuxt-link
                    :to="`/${channels[n + 4].login.username}`"
                    class="text-xs text-gray-600 block"
                  >
                    {{ channels[n + 4].location.state }}
                  </nuxt-link>
                </div>
                <div
                  class="justify-self-end px-3 text-gray-600 hover:text-black cursor-pointer"
                >
                  <i class="fas fa-ellipsis-v" />
                </div>
              </div>
            </div>
          </section>
        </main>
      </simplebar>
    </div>
  </div>
</template>

<script>
import simplebar from 'simplebar-vue';
import 'simplebar/dist/simplebar.min.css';
export default {
  components: {
    simplebar,
  },
  async asyncData({ $axios }) {
    const { data } = await $axios.get(
      'https://randomuser.me/api?results=50&nat=us,dk,de,es,fr,gb'
    );
    const creators = data.results.slice(0, 25);
    const channels = data.results.slice(25);
    return {
      creators,
      channels,
    };
  },
};
</script>
