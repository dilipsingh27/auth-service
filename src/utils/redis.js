const {createClient} = require('redis');

const insertInRedis = async (token,userId) => {
    const client = createClient({
      socket: {
            host: "redis",
            port: 6379,
      },
    });

    client.on('error', (error) => {
        throw new Error(error);
    });

    await client.connect();
    await client.set(token,userId);
    await client.disconnect();
};

const getFromRedis = async (token) => {
  const client = createClient({
    socket: {
          host: "redis",
          port: 6379,
    },
  });

  client.on('error', (error) => {
    throw new Error(error);
  });

  await client.connect();
  const userId = await client.get(token);
  console.log("sdcfcd", userId)
  await client.disconnect();

  return userId;
}


module.exports = {insertInRedis, getFromRedis};