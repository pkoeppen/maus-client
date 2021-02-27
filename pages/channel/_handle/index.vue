<template>
  <channel-page :channel="channel" :tab="0" />
</template>

<script>
import { mapState } from 'vuex';
export default {
  asyncData({ route }) {
    const channel = {
      avatar:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Elon_Musk_Royal_Society_%28crop1%29.jpg/330px-Elon_Musk_Royal_Society_%28crop1%29.jpg',
      handle: route.params.handle,
      name: 'Some Channel',
      creators: new Array(32).fill({}),
      subscribers: 3297,
      library: Math.floor(Math.random() * 200),
    };
    return { channel };
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
    ...mapState(['mainScrollElement']),
  },
  methods: {
    scrollTop() {
      setTimeout(() => (this.mainScrollElement.scrollTop = 0), 0);
    },
  },
};
</script>
