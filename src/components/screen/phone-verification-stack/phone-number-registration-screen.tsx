import _ from 'lodash';
import React, { useContext, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from 'react-native';
import {
  AnimatedFadeInView,
  AnimatedSlideDownView,
  Button,
  Center,
  Margin,
  MaskedInput,
  Overlay,
  Padding,
  Spinner,
  Stack,
  Text,
} from '../..';
import { PhoneVerificationIllustration } from '../../../assets';
import { AuthContext } from '../../../authentication';
import { Header } from '../../header';
import { Queue } from '../../layout';

import { NavigationRoutes } from '../../navigation/navigation-param';

export const PhoneNumberRegistrationScreen = ({ navigation }) => {
  const { signInWithPhoneNumber } = useContext(AuthContext);
  const [phonenumber, setPhonenumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const isValidPhone = _.size(phonenumber) == 8;
  const [isFocused, setIsFocused] = useState(false);
  const verifyPhone = async () => {
    if (!isValidPhone) {

      return;
    }
    setLoading(true);
    try {

    console.log(phonenumber);
      await signInWithPhoneNumber(`+976${phonenumber}`);
      navigation.navigate(NavigationRoutes.CodeVerificationScreen, {
        phonenumber,
      });
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };
  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: '#FFFFFF', height: '100%' }}>
        <Header withBack={true} headerText="Бүртгэл" menu={false} />
        <Margin size={Platform.OS === 'ios' ? [0, 4, 0, 4] : [4, 4, 0, 4]}>
          {/* <Queue justifyContent="center"> */}
          <Stack size={6}>
            <Padding size={[6, 0, 6, 0]}>
              <Stack size={4}>
                <Center>
                  <PhoneVerificationIllustration />
                </Center>
                <Text type="headline3" textAlign="center" role="default">
                  Нэвтрэх Бүртгүүлэх хэсэг
                </Text>
                <Text type="paragraph" role="info" textAlign="center">
                  Та өмнө бүртгэлтэй бол тухайн дугаараараа анх удаа бүртгүүлж
                  байгаа бол мөн адил дугаараа л оруулахад хангалттай.
                </Text>
              </Stack>
            </Padding>
            <Stack size={4}>
              <View>
                <AnimatedFadeInView visible={!loading}>
                  <MaskedInput
                    lineWidth="light"
                    borderRole={
                      error ? 'error' : isFocused ? 'info' : 'tertiary'
                    }
                    radius="large"
                    backgroundRole={isFocused ? 'default' : 'tertiary'}
                    size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
                    autoFocus={true}
                    onFocus={() => setIsFocused(true)}
                    role="info"
                    mask="0000-0000"
                    placeholder="Утасны дугаар"
                    keyboardType="numeric"
                    onChangeText={value => {
                      setError(false);
                      setPhonenumber(value);
                    }}
                  />
                  <Overlay top={0} right={10} height="100%">
                    <Center flex={1}>
                      <Button
                        disabled={!isValidPhone}
                        textRole={!isValidPhone ? 'info' : 'success'}
                        lineWidth="none"
                        radius="xmedium"
                        backgroundRole="transparent"
                        onPress={verifyPhone}>
                        Илгээх
                      </Button>
                    </Center>
                  </Overlay>
                </AnimatedFadeInView>
                <Overlay top={0} right={0} left={0}>
                  <AnimatedFadeInView width="100%" visible={loading}>
                    <Center>
                      <Spinner role="success" />
                    </Center>
                  </AnimatedFadeInView>
                </Overlay>
              </View>
              <AnimatedSlideDownView height={20} visible={error}>
                <Text
                  type="paragraph"
                  textAlign="center"
                  role="error"
                  numberOfLines={2}>
                  Алдаа гарлаа! Та түр хүлээгээд дахин оролдоно уу.
                </Text>
              </AnimatedSlideDownView>
            </Stack>
          </Stack>
          {/* </Queue> */}
        </Margin>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
