import * as Font from 'expo-font';
// import {
//   Poppins_300Light,
//   Poppins_300Light_Italic,
//   Poppins_400Regular,
//   Poppins_400Regular_Italic,
//   Poppins_600SemiBold,
//   Poppins_600SemiBold_Italic,
//   Poppins_700Bold,
//   Poppins_700Bold_Italic,
//   Poppins_800ExtraBold,
//   Poppins_800ExtraBold_Italic,
// } from '@expo-google-fonts/poppins';

const useFonts = async () => {
  await Font.loadAsync({
    NexaRegular: require('../assets/fonts/Nexa-Regular.otf'),
    NexaBold: require('../assets/fonts/Nexa-Bold.otf'),
    NexaBlack: require('../assets/fonts/Nexa-Black.otf'),
    NexaHeavy: require('../assets/fonts/Nexa-Heavy.otf'),
    NexaBook: require('../assets/fonts/Nexa-Book.otf'),
  });
};

export default useFonts;