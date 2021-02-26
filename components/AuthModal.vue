<template>
  <div
    v-show="visible"
    class="fixed inset-0 overflow-auto bg-black bg-opacity-80"
  >
    <div
      class="absolute inset-0 z-40"
      @click="hideModal({ modal: 'auth', data: {} })"
    />

    <div class="h-full w-full flex flex-col items-center p-2">
      <div
        class="relative z-50 w-full max-w-sm p-6 bg-white rounded"
        style="margin: auto 0"
      >
        <div
          class="absolute top-0 -right-9 h-8 w-8 rounded bg-white bg-opacity-0 hover:bg-opacity-20 cursor-pointer"
          @click="hideModal({ modal: 'auth', data: {} })"
        >
          <div class="flex items-center justify-center p-2 text-white">
            <i class="fas fa-times" />
          </div>
        </div>
        <div class="flex items-center justify-center">
          <img class="h-10 mr-2" src="~/assets/svg/maus-logo-glyph-only.svg" />
          <h2 class="text-xl font-bold">{{ headerText }}</h2>
        </div>
        <div class="flex text-center font-bold my-6">
          <div
            :class="{ 'text-blue-500 border-blue-500': data.tab === 0 }"
            class="w-1/2 pb-1 border-b-2 cursor-pointer"
            @click="setModalData({ modal: 'auth', data: { tab: 0 } })"
          >
            Log In
          </div>
          <div
            :class="{ 'text-blue-500 border-blue-500': data.tab === 1 }"
            class="w-1/2 pb-1 border-b-2 cursor-pointer"
            @click="setModalData({ modal: 'auth', data: { tab: 1 } })"
          >
            Sign Up
          </div>
        </div>
        <div>
          <form
            v-if="data.tab === 0"
            class="flex flex-col text-sm"
            spellcheck="false"
            @submit.prevent="logIn()"
          >
            <div class="mb-4">
              <div class="font-bold mb-1">
                <label for="username">Username</label>
              </div>
              <input
                :input="data.username"
                class="outline-none px-3 py-1 w-full rounded bg-gray-200 focus:bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-blue-300"
                type="text"
                @input="
                  (e) =>
                    setModalData({
                      modal: 'auth',
                      data: { username: e.target.value },
                    })
                "
              />
            </div>
            <div class="mb-3">
              <div class="font-bold mb-1">
                <label for="password">Password</label>
              </div>
              <input
                :input="data.password"
                class="outline-none px-3 py-1 w-full rounded bg-gray-200 focus:bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-blue-300"
                type="password"
                @input="
                  (e) =>
                    setModalData({
                      modal: 'auth',
                      data: { password: e.target.value },
                    })
                "
              />
            </div>
            <nuxt-link
              to="/recover"
              class="text-xs text-blue-500 hover:underline mb-6"
              >Trouble logging in?</nuxt-link
            >
            <button
              :class="
                data.loading ? 'bg-blue-200 pointer-events-none' : 'bg-blue-400'
              "
              class="w-full text-white hover:bg-blue-500 rounded px-3 py-2 font-bold"
              type="submit"
            >
              <i v-if="data.loading" class="fas fa-asterisk animate-spin" />
              <span v-else>Log In</span>
            </button>
          </form>
          <form
            v-if="data.tab === 1"
            class="flex flex-col text-sm"
            spellcheck="false"
            @submit.prevent="signUp()"
          >
            <div class="mb-4">
              <div class="font-bold mb-1">
                <label for="username">Username</label>
              </div>
              <input
                :input="data.username"
                class="outline-none px-3 py-1 w-full rounded bg-gray-200 focus:bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-blue-300"
                type="text"
                @input="
                  (e) =>
                    setModalData({
                      modal: 'auth',
                      data: { username: e.target.value },
                    })
                "
              />
            </div>
            <div class="mb-3">
              <div class="font-bold mb-1">
                <label for="password">Password</label>
              </div>
              <input
                :input="data.password"
                class="outline-none px-3 py-1 w-full rounded bg-gray-200 focus:bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-blue-300"
                type="password"
                @input="
                  (e) =>
                    setModalData({
                      modal: 'auth',
                      data: { password: e.target.value },
                    })
                "
              />
            </div>
            <div class="mb-3">
              <div class="font-bold mb-1">
                <label for="password">Confirm Password</label>
              </div>
              <input
                :input="data.confirmPassword"
                class="outline-none px-3 py-1 w-full rounded bg-gray-200 focus:bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-blue-300"
                type="password"
                @input="
                  (e) =>
                    setModalData({
                      modal: 'auth',
                      data: { confirmPassword: e.target.value },
                    })
                "
              />
            </div>
            <div class="mb-3">
              <div class="font-bold mb-1">
                <label for="email">Date of Birth</label>
              </div>
              <div class="flex gap-2">
                <input
                  :input="data.dobMonth"
                  class="outline-none px-3 py-1 w-full rounded bg-gray-200 focus:bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-blue-300"
                  type="text"
                  placeholder="Month"
                  @input="
                    (e) =>
                      setModalData({
                        modal: 'auth',
                        data: { dobMonth: e.target.value },
                      })
                  "
                />
                <input
                  :input="data.dobDay"
                  class="outline-none px-3 py-1 w-full rounded bg-gray-200 focus:bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-blue-300"
                  type="text"
                  placeholder="Day"
                  @input="
                    (e) =>
                      setModalData({
                        modal: 'auth',
                        data: { dobDay: e.target.value },
                      })
                  "
                />
                <input
                  :input="data.dobYear"
                  class="outline-none px-3 py-1 w-full rounded bg-gray-200 focus:bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-blue-300"
                  type="text"
                  placeholder="Year"
                  @input="
                    (e) =>
                      setModalData({
                        modal: 'auth',
                        data: { dobYear: e.target.value },
                      })
                  "
                />
              </div>
            </div>
            <div class="mb-6">
              <div class="font-bold mb-1">
                <label for="email">Email</label>
              </div>
              <input
                :input="data.email"
                class="outline-none px-3 py-1 w-full rounded bg-gray-200 focus:bg-white border-2 border-gray-200 hover:border-gray-300 focus:border-blue-300"
                type="email"
                @input="
                  (e) =>
                    setModalData({
                      modal: 'auth',
                      data: { email: e.target.value },
                    })
                "
              />
            </div>
            <div class="text-xs text-gray-600 mb-6 text-center">
              By clicking Sign Up, you are indicating that you have read and
              acknowledge the
              <nuxt-link to="/terms" class="text-blue-500 hover:underline"
                >Terms of Service</nuxt-link
              >
              and
              <nuxt-link to="/privacy" class="text-blue-500 hover:underline"
                >Privacy Notice</nuxt-link
              >.
            </div>
            <button
              :class="
                data.loading ? 'bg-blue-200 pointer-events-none' : 'bg-blue-400'
              "
              class="w-full text-white hover:bg-blue-500 rounded px-3 py-2 font-bold"
              type="submit"
            >
              <i v-if="data.loading" class="fas fa-asterisk animate-spin" />
              <span v-else>Sign Up</span>
            </button>
          </form>
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
      visible: (state) => state.modals.auth.visible,
      data: (state) => state.modals.auth.data,
    }),
    headerText() {
      return 'Log in to Maus';
    },
  },
  methods: {
    ...mapMutations(['setModalData', 'hideModal']),

    /*
     * Clears the modal form.
     */
    clearForm() {
      this.form = {};
    },

    /*
     * Call the API to login.
     */
    async logIn() {
      if (this.data.loading) return;
      this.setModalData({ modal: 'auth', data: { loading: true } });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.hideModal({ modal: 'auth', data: {} });
    },

    /*
     * Call the API to login.
     */
    async signUp() {
      if (this.data.loading) return;
      this.setModalData({ modal: 'auth', data: { loading: true } });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      this.hideModal({ modal: 'auth', data: {} });
    },
  },
};
</script>
