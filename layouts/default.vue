<template>
  <div>
    <top-nav />
    <sidebar v-if="sidebar" />
    <sidebar-condensed v-else />
    <div
      :class="sidebar ? 'left-64' : 'left-16'"
      class="fixed top-12 bottom-0 right-0"
    >
      <simplebar ref="main" class="h-full">
        <Nuxt />
      </simplebar>
    </div>
    <auth-modal />
    <creator-auth-modal />
    <subscribe-modal />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState(['sidebar']),
  },
  mounted() {
    this.setMainScrollElement(this.$refs.main.$refs.scrollElement);
  },
  methods: {
    ...mapMutations(['setMainScrollElement']),
  },
};
</script>
