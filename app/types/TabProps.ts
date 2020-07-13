import {VideoDetails} from '.';

export default interface TabProps {
  language: string | undefined;
  fullscreen: boolean;
  setFullscreen: (fullscreen: boolean) => void;
  video?: VideoDetails;
  setVideo?: (video: VideoDetails) => void;
}
