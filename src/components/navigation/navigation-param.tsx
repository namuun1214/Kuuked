export enum NavigationRoutes {
  Splash = 'Splash',
  Home = 'Home',
  PhoneNumberRegistrationScreen = 'PhoneNumberRegistrationScreen',
  CodeVerificationScreen = 'CodeVerificationScreen',
  PhoneRegistrationSuccessScreen = 'PhoneRegistrationSuccessScreen',
  HealthScreen = 'HealthScreen',
  MainRoot = 'MainRoot',
  DailyScreen = 'DailyScreen',
  CommonErrorDialog = 'CommonErrorDialog',
  ResendCodeDialog = 'ResendCodeDialog',
  WelcomeScreen = 'WelcomeScreen',
  SelectCategoryScreen = 'SelectCategoryScreen',
  SideMenu = 'SideMenu',
  NewsScreen = 'NewsScreen',
  NewsDetailScreen = 'NewsDetailScreen',
  BabyInfoScreen = 'BabyInfoScreen',
  EmergencyListScreen = 'EmergencyListScreen',
  EmergencyDetailScreen = 'EmergencyDetailScreen',
  ProfileScreen = 'ProfileScreen',
  MemoryListScreen = 'MemoryListScreen',
  SurgeryScreen = 'SurgeryScreen',
  HealthLogScreen = 'HealthLogScreen',
  HealthDetailScreen = 'HealthDetailScreen',
}
export interface NavigationPayload<T> {
  props: T;
}
export type NavigatorParamList = {
  [NavigationRoutes.Splash]: NavigationPayload<any>;
  [NavigationRoutes.DailyScreen]: NavigationPayload<any>;
  [NavigationRoutes.Home]: NavigationPayload<any>;
  [NavigationRoutes.PhoneNumberRegistrationScreen]: NavigationPayload<any>;
  [NavigationRoutes.CodeVerificationScreen]: NavigationPayload<any>;
  [NavigationRoutes.PhoneRegistrationSuccessScreen]: NavigationPayload<any>;
  [NavigationRoutes.MainRoot]: NavigationPayload<any>;
  [NavigationRoutes.HealthScreen]: NavigationPayload<any>;
  [NavigationRoutes.CommonErrorDialog]: NavigationPayload<any>;
  [NavigationRoutes.ResendCodeDialog]: NavigationPayload<any>;
  [NavigationRoutes.WelcomeScreen]: NavigationPayload<any>;
  [NavigationRoutes.SelectCategoryScreen]: NavigationPayload<any>;
  [NavigationRoutes.SideMenu]: NavigationPayload<any>;
  [NavigationRoutes.NewsScreen]: NavigationPayload<any>;
  [NavigationRoutes.NewsDetailScreen]: NavigationPayload<any>;
  [NavigationRoutes.BabyInfoScreen]: NavigationPayload<any>;
  [NavigationRoutes.EmergencyListScreen]: NavigationPayload<any>;
  [NavigationRoutes.EmergencyDetailScreen]: NavigationPayload<any>;
  [NavigationRoutes.ProfileScreen]: NavigationPayload<any>;
  [NavigationRoutes.MemoryListScreen]: NavigationPayload<any>;
  [NavigationRoutes.SurgeryScreen]: NavigationPayload<any>;
  [NavigationRoutes.HealthLogScreen]: NavigationPayload<any>;
  [NavigationRoutes.HealthDetailScreen]: NavigationPayload<any>;
};
