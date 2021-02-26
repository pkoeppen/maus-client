import * as querystring from 'querystring';

export const state = () => ({
  authenticating: false,
  admin: null,
});

export const actions = {
  /*
   * Dev Routes
   */
  seed() {
    return this.$axios
      .post(`/dev/seed`)
      .then(({ data }) => data)
      .catch(this.$catch);
  },
  flush() {
    return this.$axios
      .post(`/dev/flush`)
      .then(({ data }) => data)
      .catch(this.$catch);
  },

  /*
   * Ban Routes
   */
  addBan(context, params) {
    return this.$axios
      .put(`/bans`, params)
      .then(({ data }) => data)
      .catch(this.$catch);
  },

  /*
   * Meta Routes
   */
  getActivity() {
    return this.$axios
      .get(`/meta/activity`)
      .then(({ data }) => data)
      .catch(this.$catch);
  },

  /*
   * Admin Routes
   */
  login(context, params) {
    context.commit('setAuthenticating', true);
    return this.$axios
      .post(`/admin/login`, params)
      .then(({ data }) => {
        context.commit('setAdmin', data);
        return true;
      })
      .catch(this.$catch)
      .finally(() => context.commit('setAuthenticating', false));
  },
  logout(context) {
    return this.$axios
      .post(`/admin/logout`)
      .then(() => {
        context.commit('setAdmin', null);
        return true;
      })
      .catch(this.$catch);
  },

  /*
   * Post Routes
   */
  getPost(context, id) {
    return this.$axios
      .get(`/posts/${id}`)
      .then(({ data }) => data)
      .catch(this.$catch);
  },
  addPost(context, { recaptcha, formData }) {
    return this.$axios
      .put(`/posts?recaptcha=${recaptcha}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({ data }) => data)
      .catch(this.$catch);
  },
  editPost(context, { id, ...edits }) {
    return this.$axios
      .post(`/posts/${id}`, edits)
      .then(({ data }) => data)
      .catch(this.$catch);
  },
  deletePost(context, { id, params }) {
    return this.$axios
      .delete(`/posts/${id}`, params)
      .then(({ data }) => data)
      .catch(this.$catch);
  },

  /*
   * Thread Routes
   */
  getThread(context, { id, ...params }) {
    const query = querystring.encode(params);
    return this.$axios
      .get(`/threads/${id}?${query}`)
      .then(({ data }) => data)
      .catch(this.$catch);
  },
  getThreads(context, params) {
    const query = querystring.encode(params);
    return this.$axios
      .get(`/threads?${query}`)
      .then(({ data }) => data)
      .catch(this.$catch);
  },
  addThread(context, { recaptcha, formData }) {
    return this.$axios
      .put(`/threads?recaptcha=${recaptcha}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(({ data }) => data)
      .catch(this.$catch);
  },
  editThread(context, { id, edits }) {
    return this.$axios
      .post(`/threads/${id}`, edits)
      .then(({ data }) => data)
      .catch(this.$catch);
  },
};

export const mutations = {
  setAuthenticating(_state, authenticating) {
    _state.authenticating = authenticating;
  },
  setAdmin(_state, admin) {
    _state.admin = admin;
    if (process.browser && !admin) {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++)
        clearCookie(cookies[i].split('=')[0]);
    }
  },
};

function clearCookie(name, domain = document.domain, path = '/') {
  document.cookie = `${name}=; expires=${+new Date()}; domain=${domain}; path=${path}`;
}
