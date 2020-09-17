const CLIENT_ID = 'client_id_upucj1';
const CLIENT_SECRET = 'client_secret_mum6fdgkvniwzygu417yv7syvkipgk3q';

export default {
  asyncData({ redirect }) {
    redirect(`https://bnk.dev/oauth/authorization?client_id=${CLIENT_ID}&scope=read_write`);
  }
}
