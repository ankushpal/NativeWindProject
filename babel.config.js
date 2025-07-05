const plugins = require('tailwindcss');

module.exports = {
  presets: ['module:@react-native/babel-preset','nativewind/babel'],
  plugins:[
    [
      'module-resolver', 
    {
    root: ['./src/'],
    alias: {
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json','.ttf'],
  }
],
],
};