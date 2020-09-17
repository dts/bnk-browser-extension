export default {
  asyncData({ env, redirect }) {
    redirect(`https://bnk.dev/oauth/authorization?client_id=${env.clientID}&scope=read_write`);
  }
}
