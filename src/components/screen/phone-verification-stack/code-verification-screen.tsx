import { Route, useRoute } from '@react-navigation/native';
import _ from 'lodash';
import React, { useContext, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { CodeVerificationIllustration } from '../../../assets';
import { BackArrowIcon } from '../../../assets/icons';
import { AuthContext } from '../../../authentication';
import {
  AnimatedFadeInView,
  Center,
  InteractiveIcon,
  InteractiveText,
  Margin,
  MaskedInput,
  Overlay,
  Padding,
  Spinner,
  Stack,
  Text,
} from '../../../components';
import { Header } from '../../header';
import { Queue } from '../../layout';
import { NavigationRoutes } from '../../navigation/navigation-param';

export const CodeVerificationScreen = ({ navigation }) => {
  const { confirmCode, verifyPhoneNumber } = useContext(AuthContext);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeInput, setActiveInput] = useState(false);
  const { params } = useRoute<Route<string, any>>();
  const { phonenumber } = params || {};
  const handleGoBack = () => {
    navigation.navigate(NavigationRoutes.PhoneNumberRegistrationScreen);
  };
  const verifyPhone = async code => {
    try {
      setLoading(true);
      await confirmCode(code);
      navigation.navigate(NavigationRoutes.PhoneRegistrationSuccessScreen);
    } catch (error) {
      if (error.code === 'auth/invalid-verification-code') {
        navigation.navigate(NavigationRoutes.CommonErrorDialog, {
          description: 'Таны баталгаажуулах код буруу байна',
        });
      } else {
        navigation.navigate(NavigationRoutes.CommonErrorDialog, {});
      }
    } finally {
      setLoading(false);
    }
  };
  const resendCode = async () => {
    try {
      navigation.navigate(NavigationRoutes.ResendCodeDialog, {
        retry: resendCode,
      });
      setLoading(true);
      setCode('');
      await verifyPhoneNumber(`+976${phonenumber}`);

      navigation.navigate(NavigationRoutes.CodeVerificationScreen, {
        phonenumber,
      });
    } catch (error) {
      navigation.navigate(NavigationRoutes.CommonErrorDialog, {
        description: 'Баталгаажуулах код явуулахад алдаа гарлаа',
        retry: resendCode,
      });
    } finally {
      setActiveInput(true);
      setCode('');
      setLoading(false);
    }
  };

  useEffect(() => {
    const isValidCode = _.size(code) === 6;
    if (isValidCode) {
      verifyPhone(code);
    }
  }, [code]);
  return (
    <KeyboardAvoidingView behavior={'padding'} style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: '#FFFFFF', height: '100%' }}>
        <Header withBack={true} headerText="Бүртгэл" menu={false} />
        <Margin size={Platform.OS === 'ios' ? [0, 4, 0, 4] : [4, 4, 0, 4]}>
          {/* <Center flex={0.2}> */}
          <Stack size={6}>
            <Padding size={[6, 0, 4, 0]}>
              <Stack size={4}>
                <Center>
                  <CodeVerificationIllustration />
                </Center>
                <Text type="headline3" textAlign="center" role="default">
                  Нэвтрэл баталгаажуулах хэсэг
                </Text>
                <Text type="paragraph" role="info" textAlign="center">
                  {phonenumber} дугаар руу очсон баталгаажуулах кодыг оруулна
                  уу.
                </Text>
              </Stack>
            </Padding>
            <Stack size={5}>
              <AnimatedFadeInView visible={!loading}>
                <MaskedInput
                  lineWidth="light"
                  text={code}
                  borderRole={activeInput ? 'info' : 'tertiary'}
                  radius="large"
                  backgroundRole={activeInput ? 'default' : 'tertiary'}
                  size={Platform.OS === 'ios' ? [4, 0, 4, 4] : [2, 0, 2, 4]}
                  autoFocus={true}
                  onFocus={() => setActiveInput(true)}
                  role="info"
                  mask="00-00-00"
                  placeholder="баталгаажуулах кодыг оруулна уу"
                  keyboardType="numeric"
                  onChangeText={setCode}
                />
              </AnimatedFadeInView>
              <Overlay top={0} right={0} left={0}>
                <AnimatedFadeInView width="100%" visible={loading}>
                  <Center>
                    <Spinner role="success" />
                  </Center>
                </AnimatedFadeInView>
              </Overlay>
              <Queue justifyContent="space-between">
                <AnimatedFadeInView width="100%" visible={!loading}>
                  <InteractiveText
                    textAlign="center"
                    role="default"
                    onPress={resendCode}>
                    Кодыг дахин илгээх
                  </InteractiveText>
                </AnimatedFadeInView>
                <AnimatedFadeInView width="100%" visible={!loading}>
                  <InteractiveText
                    textAlign="center"
                    role="default"
                    onPress={handleGoBack}>
                    Утасны дугаараа солих
                  </InteractiveText>
                </AnimatedFadeInView>
              </Queue>
            </Stack>
          </Stack>
          {/* </Center> */}
        </Margin>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
