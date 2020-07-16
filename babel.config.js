module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.tsx, .ts'],
        alias: {
          '@store': './src/store',
          '@components': './src/components',
          '@screens': './src/screens',
          '@src': './src',
          '@assets': './assets',
        },
      },
    ],
  ],
};
