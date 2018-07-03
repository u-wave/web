// List of dependency paths that need to be compiled.
const es2015Deps = [
  /format-duration/,
  /object-values/,
  /p-finally/,
  /@material-ui\/core\/es/,
  /@material-ui\/icons\/es/,
];

export default function compileDependencies() {
  const babelConfig = {
    loader: 'babel-loader',
    query: {
      babelrc: false,
      presets: [
        ['@babel/preset-env', {
          modules: false,
          // Don't assume dependencies are OK with being run in loose mode
          loose: false,
          forceAllTransforms: true,
        }],
      ],
    },
  };

  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include: es2015Deps,
          use: [babelConfig],
        },
      ],
    },
  };
}
