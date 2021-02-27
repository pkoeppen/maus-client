import * as cookie from 'cookie';

export const state = () => ({
  nsfwEnabled: false,
  darkEnabled: false,
  sidebar: true,
  modals: {
    auth: {
      visible: false,
      data: {},
    },
    creatorAuth: {
      visible: false,
      data: {},
    },
    subscribe: {
      visible: false,
      data: {},
    },
  },
  mainScrollElement: null,
  sidebarScrollElement: null,
  agentData: {},
});

export const actions = {
  async nuxtClientInit(context) {
    const { data } = await this.$axios.get(
      'https://www.cloudflare.com/cdn-cgi/trace'
    );
    context.commit('setAgentData', data);
  },
  nuxtServerInit(context, { req, redirect }) {
    if (req.headers?.cookie) {
      // Found cookies.
      try {
        const cookies = cookie.parse(req.headers.cookie);
        const token = cookies.token;
        const expires = parseInt(cookies.expires);
        const data = JSON.parse(cookies.data);

        if (!token || !expires || !data) {
          throw new Error('Invalid cookie');
        }
        if (expires < Date.now()) {
          throw new Error('Invalid cookie');
        }

        context.commit('api/setUser', { token, expires, data });
      } catch (error) {
        context.commit('api/setUser', null);
        if (req.url.startsWith('/admin')) redirect('/admin/login');
      }
    } else {
      // No cookies.
      context.commit('api/setUser', null);
    }
  },
};

export const mutations = {
  showModal(_state, { modal, data }) {
    if (data) _state.modals[modal].data = data || {};
    _state.modals[modal].visible = true;
  },
  hideModal(_state, { modal, data }) {
    _state.modals[modal].visible = false;
    if (data) _state.modals[modal].data = data || {};
  },
  setModalData(_state, { modal, data }) {
    _state.modals[modal].data = { ..._state.modals[modal].data, ...data };
  },
  clearModalData(_state, { modal }) {
    _state.modals[modal].data = {};
  },
  toggleSidebar(_state) {
    _state.sidebar = !_state.sidebar;
  },
  toggleNsfw(_state) {
    _state.nsfwEnabled = !_state.nsfwEnabled;
  },
  toggleDark(_state) {
    _state.darkEnabled = !_state.darkEnabled;
  },
  setMainScrollElement(_state, element) {
    _state.mainScrollElement = element;
  },
  setSidebarScrollElement(_state, element) {
    _state.sidebarScrollElement = element;
  },
  setAgentData(_state, str) {
    const data = {};
    const lines = str.split('\n').filter((line) => line);
    for (const line of lines) {
      const [key, val] = line.split('=');
      data[key] = val;
    }
    _state.agentData = data;
  },
};
