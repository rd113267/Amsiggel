import {Alert} from 'react-native';
import {Language, VideoDetails} from './types';
import constants from './constants';

export const getVideoDetails = async (id: string): Promise<VideoDetails> => {
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

export const getVideoIDs = (language: string) => {
  switch (language) {
    case Language.ENGLISH:
      return constants.ENGLISH_VIMEO_CODES;
    case Language.FRENCH:
      return constants.FRENCH_VIMEO_CODES;
    default:
      return constants.BERBER_VIMEO_CODES;
  }
};

export const getAudioLinks = (
  language?: string,
): {full: string; firstHalf: string; secondHalf: string} => {
  switch (language) {
    case Language.ENGLISH:
      return {full: '335', firstHalf: '556', secondHalf: '558'};
    case Language.FRENCH: {
      return {full: '777', firstHalf: '773', secondHalf: '775'};
    }
    default:
      return {full: '585', firstHalf: '474', secondHalf: '476'};
  }
};

export const getAudioLinkText = (
  language?: string,
): {fullText: string; firstHalfText: string; secondHalfText: string} => {
  switch (language) {
    case Language.ENGLISH:
      return {
        fullText: 'Amsiggel English.mp3	 ',
        firstHalfText: 'Amsiggel English 1-9.mp3',
        secondHalfText: 'Amsiggel English 10-17.mp3',
      };
    case Language.FRENCH: {
      return {
        fullText: 'télécharge Amsiggel MP3 audio – histoire intégrale',
        firstHalfText: 'télécharge Amsiggel MP3 audio – chapitres 1-9',
        secondHalfText: 'télécharge Amsiggel MP3 audio – chapitres 10-17',
      };
    }
    default:
      return {
        fullText: 'Amsiggel lqist kullutt.mp3',
        firstHalfText: 'Amsiggel agzzum 1-9.mp3',
        secondHalfText: 'Amsiggel agzzum 10-17.mp3',
      };
  }
};

export const getDurationString = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);

  const hours = h < 10 ? `0${h}` : h;
  const minutes = m < 10 ? `0${m}` : m;
  const secs = s < 10 ? `0${s}` : s;

  if (h > 0) {
    return `${hours}:${minutes}:${secs}`;
  }
  return `${minutes}:${secs}`;
};
