import {Alert, Platform, Linking} from 'react-native';
import {Language, VideoDetails} from './types';
import constants from './constants';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
import {request, PERMISSIONS} from 'react-native-permissions';

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

export const getAudioLinks = (language?: string): {full: string} => {
  switch (language) {
    case Language.ENGLISH:
      return {full: '335'};
    case Language.FRENCH: {
      return {full: '777'};
    }
    default:
      return {full: '585'};
  }
};

export const getAudioLinkText = (language?: string): {fullText: string} => {
  switch (language) {
    case Language.ENGLISH:
      return {
        fullText: 'The Quest of Amsiggel (audio)',
      };
    case Language.FRENCH: {
      return {
        fullText: "Le Voyage d'Amsiggel (audio)",
      };
    }
    default:
      return {
        fullText: 'Amuddu n-Umsiggel (audio)',
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

export const downloadLink = async (
  link: string,
  filename: string,
  pdf?: boolean,
) => {
  const fileType = pdf ? '.pdf' : '.mp3';
  try {
    if (Platform.OS === 'ios') {
      await Share.open({
        url: link,
        saveToFiles: true,
        filename: `${filename}${fileType}`,
      });
    } else {
      await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
      await RNFetchBlob.config({
        addAndroidDownloads: {
          notification: true,
          useDownloadManager: true,
          path: `${RNFetchBlob.fs.dirs.DownloadDir}/${filename}${fileType}`,
        },
      }).fetch('GET', link);
    }
  } catch (e) {
    Alert.alert('Error', e.message);
  }
};
