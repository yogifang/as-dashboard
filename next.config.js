module.exports = {
  reactStrictMode: true,
  env: {
<<<<<<< HEAD
    MONGO_URI: 'mongodb+srv://yogi:askYogi0325@cluster0.qgucu.mongodb.net/asia-scouting?retryWrites=true&w=majority',
    HOST_URI: 'http://localhost:3000/',
    //HOST_URI: "https://dashboard-chi-three.vercel.app/"
=======
    MONGO_URI: "mongodb+srv://yogi:askYogi0325@cluster0.qgucu.mongodb.net/asia-scouting?retryWrites=true&w=majority",
    //HOST_URI: "http://localhost:3000/"
    HOST_URI: "https://dashboard-chi-three.vercel.app/"
>>>>>>> 2b7c4d81810fa3ce9ba01e30de5780c776c09e39
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },
};
