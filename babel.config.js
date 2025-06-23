module.exports = function (api) {
  api.cache(true);
  return {
    // presets: ['module:metro-react-native-babel-preset', 'nativewind/babel'],
    presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
