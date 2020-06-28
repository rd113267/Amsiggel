import {useEffect} from 'react';
import {BackHandler} from 'react-native';

const useBackHandler = (handler: () => any) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handler);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handler);
    };
  }, [handler]);
};

export default useBackHandler;
