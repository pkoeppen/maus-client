export default async function ({ store }) {
  if (process.browser) {
    await store.dispatch('nuxtClientInit');
  }
}
