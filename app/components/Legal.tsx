import React, {FunctionComponent, useRef} from 'react';
import WebView from 'react-native-webview';
import LegalProps from '../types/LegalProps';
import {Language} from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

const Legal: FunctionComponent<LegalProps> = ({language}) => {
  const getUri = () => {
    if (language === Language.BERBER) {
      'https://www.amsiggel.com/mentions-legales/';
    }
    if (language === Language.FRENCH) {
      return 'https://www.amsiggel.com/mentions-legales/';
    }
    return 'https://www.amsiggel.com/legal/';
  };
  const ref = useRef<WebView>(null);
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        ref={ref}
        source={{uri: getUri()}}
        style={{flex: 1}}
        onLoad={() => {
          ref.current?.injectJavaScript(`
            jQuery('.header-widgets').remove();
            jQuery('nav').remove();
            jQuery('footer').remove();
            true;
          `);
        }}
        startInLoadingState
        javaScriptEnabled
      />
    </SafeAreaView>
  );
};

export default Legal;
