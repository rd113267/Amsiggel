import {VideoDetails} from '.';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../App';

type TabsNavigationProp = StackNavigationProp<RootStackParamList, 'Tabs'>;
export default interface TabProps {
  language: string | undefined;
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
  video?: VideoDetails;
  setVideo?: (video: VideoDetails) => void;
  navigation: TabsNavigationProp;
};
