module.exports = {
  client: {
    includes: ["./src/**/*.{tsx,ts}"],
    tagName: "gql",
    service: {
      name: "nuber-eats-backend",
      url: "http://localhost:4000/graphql",
      // url: "https://nodcast.herokuapp.com/graphql",
    },
  },
};
