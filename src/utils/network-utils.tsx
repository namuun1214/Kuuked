import NetInfo from '@react-native-community/netinfo';

export const isNetworkAvailable = callback => {
  NetInfo.fetch().then(state => {
    callback(state);
  });
};
