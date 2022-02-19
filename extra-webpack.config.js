module.exports = {
  resolve: {
    fallback: {
      https: require.resolve("https-browserify"),
      assert: require.resolve("assert"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      url: require.resolve("url/"),
    },
  },
};
