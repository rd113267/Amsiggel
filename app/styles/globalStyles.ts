import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('screen');

const videoHeight = width * 0.75;

export default StyleSheet.create({
  playButtonContainer: {
    position: 'absolute',
    // left: '38%',
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: -(videoHeight / 2 + 50),
    marginLeft: width / 2 - 50,
    zIndex: 9,
  },
  tifinaghe: {
    fontFamily: 'TamazightTifinaghe',
  },
  arabic: {
    fontFamily:
      Platform.OS === 'ios' ? 'ScheherazadeOTM2A-Regular' : 'ScheherazadeOTM2A',
  },
  arabicBold: {
    fontFamily:
      Platform.OS === 'ios' ? 'ScheherazadeOTM2A-Regular' : 'Scheherazade-Bold',
  },
});
