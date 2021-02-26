import * as cookie from 'cookie';

export const state = () => ({
  nsfwEnabled: false,
  nightModeEnabled: false,
});

export const actions = {
  toggleNsfw(context) {
    context.commit('toggleNsfw');
  },
  toggleNightMode(context) {
    context.commit('toggleNightMode');
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

        context.commit('api/setAdmin', { token, expires, data });
      } catch (error) {
        context.commit('api/setAdmin', null);
        if (req.url.startsWith('/admin')) redirect('/admin/login');
      }
    } else {
      // No cookies.
      context.commit('api/setAdmin', null);
    }
  },
};

export const mutations = {
  toggleNsfw(_state) {
    _state.nsfwEnabled = !_state.nsfwEnabled;
  },
  toggleNightMode(_state) {
    _state.nightModeEnabled = !_state.nightModeEnabled;
  },
};
