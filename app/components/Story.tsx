import React, {FunctionComponent} from 'react';
import {ScrollView} from 'react-native';
import {WebView} from 'react-native-webview';
import TabProps from '../types/TabProps';

const Story: FunctionComponent<TabProps> = ({language}) => {
  const link =
    'https://www.amsiggel.com/wp-content/uploads/dlm_uploads/2014/07/Amsiggel%20caracteres%20arabes.pdf';
  return (
    // <ScrollView style={{backgroundColor: '#fff', flex: 1}}>
      <WebView source={{uri: link}} style={{ flex:1}} />
    // </ScrollView>
  );
};

export default Story;
