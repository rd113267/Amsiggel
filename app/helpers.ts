import {Alert} from 'react-native';
import {Language} from './types';
import constants from './constants';

export const getVideoDetails = async (
  id: string,
): Promise<{thumbnailUrl: string; videoUrl: string; video: any}> => {
  try {
    const res = await fetch(`https://player.vimeo.com/video/${id}/config`);
    const {video, request} = await res.json();
    return {
      thumbnailUrl: video.thumbs['640'],
      //videoUrl: request.files.hls.cdns[request.files.hls.default_cdn].url,
      videoUrl: request.files.progressive[0].url,
      video,
    };
  } catch (e) {
    Alert.alert('Error', e.message);
    return {thumbnailUrl: '', videoUrl: '', video: {}};
  }
};

export const getHomeVideoID = (language: string) => {
  switch (language) {
    case Language.ENGLISH:
      return constants.ENGLISH_VIMEO_CODE;
    case Language.FRENCH:
      return constants.FRENCH_VIMEO_CODE;
    default:
      return constants.BERBER_VIMEO_CODE;
  }
};
