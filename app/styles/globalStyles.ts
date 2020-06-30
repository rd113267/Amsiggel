import {StyleSheet, Dimensions} from 'react-native';

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
});
