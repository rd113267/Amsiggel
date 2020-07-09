import React, {FunctionComponent, useState} from 'react';
import {Text} from 'react-native';
import {WebView} from 'react-native-webview';
import TabProps from '../types/TabProps';
import {ActivityIndicator} from 'react-native-paper';

const Story: FunctionComponent<TabProps> = ({language}) => {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const link =
    'https://www.amsiggel.com/wp-content/uploads/dlm_uploads/2014/07/Amsiggel%20caracteres%20arabes.pdf';
  return (
    <>
      <WebView source={{uri: link}} startInLoadingState={true} />
    </>
  );
};

export default Story;
