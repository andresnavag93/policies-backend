const { TABLES } = require('../../utils/constants');
const { config } = require('../../config');

const { comparePassword, encrypt } = require('../../hashing');
const { sign } = require('../../auth/');

const { permissions } = config;

module.exports = function (injectedStore) {
  let store = injectedStore;

  async function login(body = {}) {
    const { email, password } = body;
    const data = await store.list(TABLES.auth, { email });
    if (!data.length) return { error: 'Invalid Credentials' };
    const comparison = await comparePassword(password, data[0].password);
    if (!comparison) return { error: 'Invalid Credentials' };
    const payload = {
      permissions: [data[0].role_id],
    };
    const token = await sign(payload, config.auth.jwtKey, '1d');
    return { token, role_id: data[0].role_id };
  }

  async function register(body = {}) {
    let data;
    try {
      const { email, emailConfirm, password, passwordConfirm, user } = body;
      if (user.bono>100)return { error: 'El bono no puede ser mayor a 100' };
      if (email !== emailConfirm) return { error: 'Emails are note the same' };
      if (password !== passwordConfirm) return { error: 'Paswords are note the same' };

      data = await store.create(TABLES.users, user);
      if (data.error) return data;
      const auth = {
        email,
        password: await encrypt(password),
        role_id: permissions.agent,
        user_id: data.id
      };

      data = await store.create(TABLES.auth, auth);
      if (!data.error) return 'Succesfully created';
    } catch (err) {
      if (err.constraint) {
        return err;
      }
    }
    return data;
  }

  async function update(body, id) {
    let data;
    const client= await store.get(TABLES.auth, id);
    data= await store.get(TABLES.auth, id);
    if (data.error) return data;
    const { email, emailConfirm, password, passwordConfirm, user } = body;
    if (user.bono>100)return { error: 'El bono no puede ser mayor a 100' };
    if (email !== emailConfirm) return { error: 'Emails are note the same' };
    if (password !== passwordConfirm) return { error: 'Paswords are note the same' };
    data = await store.update(TABLES.users, user,  { id: user.id });
    console.log('usuarioooo')
    console.log(data)
    const auth = {
      email,
      password: await encrypt(password),
      
    };


     data = await store.update(TABLES.auth, auth, { id: client.id });
     console.log('authhhh')
     console.log(data)
    return data;
  }


  async function listAgents() {
    const data = await store.listAgents(TABLES.auth, { role_id: permissions.admin });
    return data;
  }
  async function get(id) {
    const data = await store.get(TABLES.auth, id);
    return data;
  }


  return {
    login,
    register,
    listAgents,
    get,
    update

  };
};
