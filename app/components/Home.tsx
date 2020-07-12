import React, {
  FunctionComponent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import {
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Video from 'react-native-video';
import {getVideoDetails, getHomeVideoID} from '../helpers';
import TabProps from '../types/TabProps';
import {ActivityIndicator} from 'react-native-paper';
import VideoPlayer from 'react-native-video-controls';
import useBackHandler from '../hooks/UseBackHandler';
import globalStyles from '../styles/globalStyles';
import colors from '../colors';

const {width} = Dimensions.get('window');
const {height} = Dimensions.get('screen');

const videoHeight = width * 0.75;

const Home: FunctionComponent<TabProps> = ({
  language,
  fullscreen,
  setFullscreen,
}) => {
  const [uri, setUri] = useState('');
  const [paused, setPaused] = useState(true);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef<Video>(null);
  const handleOrientation = useCallback(
    (orientation: string) => {
      orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
        ? setFullscreen(true)
        : setFullscreen(false);
    },
    [setFullscreen],
  );

  useEffect(() => {
    if (fullscreen) {
      StatusBar.setHidden(true);
      setPaused(false);
    } else {
      setPaused(true);
      StatusBar.setHidden(false);
    }
  }, [fullscreen]);

  useEffect(() => {
    const getDetails = async () => {
      if (language) {
        setLoading(true);
        const id = getHomeVideoID(language);
        console.log(id);
        const {thumbnailUrl, videoUrl, video} = await getVideoDetails(id);
        setUri(videoUrl);
        setLoading(false);
      }
    };
    getDetails();
  }, [language]);

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);

    return () => {
      Orientation.removeOrientationListener(handleOrientation);
    };
  }, [handleOrientation]);

  useEffect(() => {
    if (Platform.OS === 'android' && !Orientation.isLocked()) {
      Orientation.lockToPortrait();
    }
  }, []);

  useBackHandler(() => {
    if (fullscreen) {
      setPaused(true);
      Orientation.lockToPortrait();
      return true;
    }
  });

  if (fullscreen && uri) {
    return (
      <VideoPlayer
        source={{uri}}
        disableVolume
        disableFullscreen
        paused={paused}
        onPause={() => setPaused(true)}
        onPlay={() => setPaused(false)}
        onBack={() => Orientation.lockToPortrait()}
        onEnd={() => Orientation.lockToPortrait()}
      />
    );
  }
  return (
    <View style={{backgroundColor: '#fff', justifyContent: 'center', flex: 1}}>
      {!loading && uri ? (
        <View>
          <TouchableOpacity
            onPress={() => {
              if (Platform.OS === 'ios') {
                videoRef.current?.presentFullscreenPlayer();
              } else {
                Orientation.lockToLandscape();
              }
            }}>
            <Video
              ref={videoRef}
              source={{uri}}
              paused={paused || Platform.OS === 'android'}
              onLoad={() => videoRef.current?.seek(0)}
              //onPlay={() => setPaused(false)}
              style={{height: videoHeight}}
              resizeMode="contain"
              onFullscreenPlayerDidPresent={() => setPaused(false)}
              onFullscreenPlayerDidDismiss={() => setPaused(true)}
              //controls
            />
            <View>
              <Icon
                name="play-circle"
                size={100}
                color={colors.primary}
                style={globalStyles.playButtonContainer}
              />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <ActivityIndicator style={{marginTop: videoHeight / 2}} />
      )}

      {/* <View style={{alignItems: 'center', marginTop: 10}}>
        {language === Language.BERBER && (
          <>
            <Image source={require('../images/arraw-ad-Tifinagh-sm.png')} />
            <Image source={require('../images/arraw-ad-Latin-sm.png')} />
            <Image source={require('../images/arraw-ad-Arabic-sm.png')} />
          </>
        )}
        {language === Language.ENGLISH && (
          <>
            <Text style={{fontSize: 28, marginBottom: 10}}>
              The Quest Of Amsiggel
            </Text>
            <Text style={{fontSize: 15, lineHeight: 30, marginHorizontal: 10}}>
              “A storm brought us this child, {'\n'} but he’ll outlive the
              storm.{'\n'}
              Born in Born in darkness, he’ll lead us into light. {'\n'}  Born
              amidst thunder and lightning,  {'\n'} he’ll bring us peace from
              all that beats down on us. {'\n'} We’ll call this child Amsiggel{' '}
              {'\n'}
               for he’ll search out hidden things. {'\n'}  He’ll discover what
              we’ve never known  {'\n'}  and show us the Way of Peace.”
            </Text>
          </>
        )}
        {language === Language.FRENCH && (
          <>
            <Text style={{fontSize: 28, marginBottom: 10}}>
              Le voyage d’Amsiggel
            </Text>
            <Text style={{fontStyle: 'italic', fontSize: 15, marginBottom: 10}}>
              (Amsiggel = le chercheur)
            </Text>
            <Text style={{fontSize: 15, lineHeight: 30, marginHorizontal: 40, textAlign: 'center'}}>
              Né parmi le tonnerre et la foudre, il nous apportera la paix et
              nous délivrera de tout ce qui nous abat.{'\n'} Il découvrira ce
              que nous avons toujours ignoré et nous montrera la Voie de la
              Paix.» {'\n'}«Une tempête nous a apporté cet enfant, mais il
              survivra à la tempête.{'\n'}
              Né dans les ténèbres, il nous conduira à la lumière. {'\n'}Nous
              l’appelerons Amsiggel, car il dénichera des choses cachées.
            </Text>
          </>
        )}
      </View> */}
    </View>
  );
};

export default Home;
