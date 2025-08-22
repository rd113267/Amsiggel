import { useEffect } from 'react';
import { BackHandler } from 'react-native';

const useBackHandler = (handler: () => boolean) => {
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handler
    );

    return () => subscription.remove();
  }, [handler]);
};

export default useBackHandler;

