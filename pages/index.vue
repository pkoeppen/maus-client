<template>
  <div>
    <top-nav />
    <sidebar v-if="sidebar" />
    <sidebar-condensed v-else />
    <main-panel />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import 'simplebar/dist/simplebar.min.css';
export default {
  computed: {
    ...mapState(['sidebar']),
  },
};
</script>
