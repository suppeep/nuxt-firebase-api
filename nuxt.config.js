module.exports = {
  target: "server",
  server: {
    port: 1111,
  },
  serverMiddleware: ["~/server/set-token", "~/server/index"],
  plugins: [{ src: "~/server/auth-cookie", mode: "client" }],
};
