<template>
  <div
    v-show="visible"
    class="fixed inset-0 overflow-auto bg-black bg-opacity-80 z-40"
  >
    <!-- Overlay -->
    <div
      class="absolute inset-0 z-40"
      @click="hideModal({ modal: 'subscribe' })"
    />

    <div class="h-full w-full flex flex-col items-center p-10">
      <div
        class="relative z-50 w-full max-w-2xl bg-white rounded overflow-hidden flex flex-col"
        style="margin: auto 0"
      >
        <!-- Close Modal -->
        <div
          class="absolute top-3 right-3 h-8 w-8 rounded bg-black bg-opacity-0 hover:bg-opacity-10 cursor-pointer z-20"
          @click="hideModal({ modal: 'subscribe' })"
        >
          <div class="flex items-center justify-center p-2">
            <i class="fas fa-times" />
          </div>
        </div>

        <!-- Header -->
        <div class="shadow-lg">
          <div class="relative bg-gray-200 p-6 overflow-hidden">
            <nuxt-link :to="`/channel/${data.handle}`">
              <div class="relative flex items-center z-10">
                <div class="h-14 w-14 overflow-hidden rounded-full mr-4">
                  <img class="w-full object-cover" :src="data.avatar" />
                </div>
                <div class="text-2xl font-bold mr-3">{{ data.name }}</div>
                <i class="fa fa-boxes text-gray-500" />
              </div>
            </nuxt-link>
            <div class="absolute inset-0">
              <img
                src="https://cdn.wallpapersafari.com/72/16/VIGDOZ.jpg"
                class="object-cover w-full"
              />
            </div>
          </div>

          <!-- Subscription -->
          <div class="flex justify-between items-center p-6">
            <div>
              <div class="text-xl font-bold">{{ data.name }} Premium</div>
              <div class="flex items-center text-sm">
                <div class="rounded-full w-2 h-2 bg-red-500 mr-2" />
                <div>{{ data.subscribers }} Subscribers</div>
              </div>
            </div>
            <div class="text-right">
              <button
                class="group flex rounded overflow-hidden text-white text-sm font-bold mb-1"
                @click="
                  hideModal({ modal: 'subscribe' });
                  showModal({
                    modal: 'auth',
                    data: { tab: 0 },
                  });
                "
              >
                <div
                  class="bg-gradient-to-l from-yellow-500 to-yellow-400 group-hover:from-yellow-400 group-hover:to-yellow-300 flex items-center px-3 py-1.5"
                >
                  <i class="fas fa-plus-square w-4 mr-3" /><span
                    >Subscribe</span
                  >
                </div>
                <div
                  class="flex items-center px-3 py-1.5 shadow-inner bg-yellow-600 group-hover:bg-yellow-500"
                >
                  <span>$9.99</span>
                </div>
              </button>
              <div class="text-xs text-gray-500">
                Renews monthly. Cancel anytime.
              </div>
            </div>
          </div>
        </div>

        <!-- Description -->
        <div class="relative flex-grow overflow-hidden">
          <simplebar class="h-full">
            <div class="flex flex-col p-6 text-center space-y-8">
              <!-- Included Creators -->
              <div class="px-6">
                <div class="text-xl font-bold mb-6">
                  Creators included with this channel:
                </div>
                <div class="flex flex-wrap gap-3 justify-center mb-6">
                  <div v-for="creator of data.creators" :key="creator.username">
                    <nuxt-link :to="`/${creator.username}`">
                      <img
                        class="h-14 w-14 overflow-hidden rounded-full"
                        :src="creator.avatar"
                      />
                    </nuxt-link>
                  </div>
                </div>
                <div>
                  Purchase a Gold subscription now and gain access to exclusive
                  content from
                  <b>{{ (data.creators || []).length }} creators</b> in this
                  channel. Subscribe to enjoy
                  <b>{{ data.library }} paid videos</b> and all premium material
                  from
                  <span
                    class="text-blue-500 hover:underline cursor-pointer"
                    @click="hideModal({ modal: 'subscribe' })"
                    >{{ data.name }}</span
                  >
                  today.
                </div>
              </div>

              <!-- Benefits -->
              <div>
                <div class="text-xl font-bold mb-6">
                  What's included with your
                  <span class="text-yellow-500">Gold</span> subscription:
                </div>
                <div class="">
                  <div class="flex grid gap-3 grid-cols-3">
                    <div class="p-6 bg-gray-100 text-sm rounded">
                      <i class="fa fa-unlock-alt fa-2x mb-3" />
                      <div class="font-bold mb-1">Exclusive Access</div>
                      <div class="leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt.
                      </div>
                    </div>
                    <div class="p-6 bg-gray-100 text-sm rounded">
                      <i class="fa fa-gifts fa-2x mb-3" />
                      <div class="font-bold mb-1">Premium Benefits</div>
                      <div class="leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt.
                      </div>
                    </div>
                    <div class="p-6 bg-gray-100 text-sm rounded">
                      <i class="fa fa-users fa-2x mb-3" />
                      <div class="font-bold mb-1">Private Community</div>
                      <div class="leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt.
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Subscribe -->
              <div class="">
                <button
                  class="group mx-auto flex rounded overflow-hidden text-white font-bold mb-1"
                  @click="
                    hideModal({
                      modal: 'subscribe',
                    });
                    showModal({
                      modal: 'auth',
                      data: { tab: 0 },
                    });
                  "
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
          </simplebar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState({
      visible: (state) => state.modals.subscribe.visible,
      data: (state) => state.modals.subscribe.data,
    }),
  },
  methods: {
    ...mapMutations(['setModalData', 'showModal', 'hideModal']),
  },
};
</script>
