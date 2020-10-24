const path = require("path");

module.exports = {
  babel: {
    plugins: [
      // FIXME: this is a temporary workaround to make emotion jsx work with react 17 jsx-runtime.
      // Once emotion adds support for jsx-runtime (see https://github.com/emotion-js/emotion/pull/1970),
      // this should be replaced with the supported solution.
      [
        "@babel/plugin-transform-react-jsx",
        {
          runtime: "automatic",
          importSource: path.dirname(require.resolve("./src/emotion-runtime")),
        },
      ],
      "emotion",
    ],
  },
};
