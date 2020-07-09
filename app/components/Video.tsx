import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from 'react-native';
import TabProps from '../types/TabProps';
import {getVideoIDs, getVideoDetails, getDurationString} from '../helpers';
import {VideoDetails} from '../types';
import {ActivityIndicator} from 'react-native-paper';

const Video: FunctionComponent<TabProps> = ({language}) => {
  const [allVideoDetails, setAllVideoDetails] = useState<VideoDetails[]>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getAllVideoDetails = async (codes: string[]) => {
      setLoading(true);
      const videosDetails = await Promise.all(
        codes.map((code) => {
          return getVideoDetails(code);
        }),
      );
      setAllVideoDetails(videosDetails);
      setLoading(false);
    };
    if (language) {
      const codes = getVideoIDs(language);
      getAllVideoDetails(codes);
    }
  }, [language]);
  return (
    <SafeAreaView>
      <ScrollView>
        {loading || !allVideoDetails ? (
          <ActivityIndicator />
        ) : (
          <View>
            {allVideoDetails.map((details) => {
              const {duration, title} = details.video;
              const durationString = getDurationString(duration);
              return (
                <View key={details.videoUrl}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={{uri: details.thumbnailUrl}}
                      style={{width: 100, height: 75}}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        flex: 1,
                        alignItems: 'center'
                      }}>
                      <Text>{title}</Text>
                      <Text>{durationString}</Text>
                    </View>
                  </TouchableOpacity>
                  <View
                    style={{borderBottomWidth: 0.5, borderBottomColor: '#999'}}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Video;
