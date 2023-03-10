import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  HomeScreen,
  ForgotPasswordScreen,
  TestAPiServerRequestScreen,
} from '@src/screens';
import {LandingScreen} from '@src/screens/sample_ui';
import View_PDF from '@src/screens/Pdf/View_PDF';
import CRUD from '@src/screens/CRUD/CRUD';
import Calculator from '@src/screens/Interface/Test/Calculator';
import Facebook from '@src/screens/Interface/CloneUI_Facebook/Facebook';
import Facebook_create from '@src/screens/Interface/CloneUI_Facebook/Facebook_create';
import Facebook_profile from '@src/screens/Interface/CloneUI_Facebook/Facebook_profile';
import {Constant_Navigator} from '@src/navigation/Constant_Navigator';
import Facebook_forgetPass from '@src/screens/Interface/CloneUI_Facebook/Facebook_forgetPass';
import API_NG_crud from '@src/screens/Interface/Test_backend_API_NG/Page/Home/Page_Home';
import API_NG_FILE from '@src/screens/Interface/Test_backend_API_NG/Page/Page_file_detail';
import Api_ng_actor from '@src/screens/Interface/Test_backend_API_NG/components/actor/Modal_actor';
import Otp from '@src/screens/Interface/Test_backend_API_NG/components/session/Otp';
import Api_ng_profile_actor from '@src/screens/Interface/Test_backend_API_NG/Page/Page_profile_actor';
import PageApprovedoc from '@src/screens/Interface/Test_backend_API_NG/Page/PageApprovedoc';
import Interface_Screen from '@src/screens/Interface/Test/Interface_Screen';
import FormInterface from '@src/screens/Interface/Test/FormInterface';
import Page_cgu from '@src/screens/Interface/Test_backend_API_NG/Page/Page_cgu';
import Page_certificate from '@src/screens/Interface/Test_backend_API_NG/Page/Page_certificate';
import Page_test from '@src/screens/Interface/Test_backend_API_NG/Page/Page_test';
import WebOrMobiles from '@components/cheaNit_picker_file/WebOrMobiles';

import PageSession from '@src/screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageSession';
import PageUpload from '@src/screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageUpload';
import PageDetail from '@src/screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageDetailRoot';
import PageScenario from '@src/screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageScenario';
import PageApproveDoc from '@screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageApproveDoc';
import PageCGU from '@screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageCGU';
import PageGenerateCertificate from '@screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageGenerateCertificate';
import PageSignature from '@screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageSignature';
import PageViewPdf from '@screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageViewPDF';
import PageDownload from '@screens/Interface/Test_backend_API_NG/Page/Newer/Page/PageDownload';
// import PageHomeDocusign from '@screens/Interface/Docusign/page/Home/PageHomeDocusign';

import {NavigatorRoute} from './NavigatorRouteConstant';
import TestComponent from '@src/screens/test_commponents';
import {SlideScreen} from '@src/screens/slide';
import {PaginationScreen} from '@src/screens/pagination';
import {DialogScreen} from '@src/screens/dialog';
import {SampleDetailScreen} from '@src/screens/sample_ui/SampleDetailScreen';
import {Localization} from '@src/i18n/languages';
import {useTranslation} from 'react-i18next';
import HeaderLeft from '@src/components/navigations/HeaderLeft';
import {View} from 'native-base';
import {ProgressBarScreen} from '@src/screens/progress_bar';

import {
  // @ts-ignore
  AllDocuments,
  DocumentInProgressScreen,
  SessionScreen,
  UploadToBeSignedScreen,
} from '@src/screens/documents';
import PageAccountDocusign from '@screens/Interface/Docusign/page/PageAccountDocusign';
import PageSetting from '@screens/Interface/Docusign/page/PageSetting';
import PageTemplates from '@screens/Interface/Docusign/page/PageTemplates';
import PageStart from '@screens/Interface/Docusign/page/start/PageStart';
import {TableScreen} from '@src/screens/table';
import PagePreviewPdfDocusign from '@screens/Interface/Docusign/page/Home/subPage/PagePreviewPDFDocusign';
import PageAddPdfDocusign from '@screens/Interface/Docusign/page/Home/subPage/PageAddPdfDocusign';
import PageSignDocusign from '@screens/Interface/Docusign/page/PageSignDocusign';
import PageRecipientsDocusign from '@screens/Interface/Docusign/page/recipient/PageRecipientsDocusign';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  const [Orignal] = useState<'none' | 'flex' | undefined>(
    Constant_Navigator.DOCUSIGN ? 'none' : 'flex',
  );
  const [Docusign] = useState<'none' | 'flex' | undefined>(
    Constant_Navigator.DOCUSIGN ? 'flex' : 'none',
  );
  const {t} = useTranslation();
  return (
    <>
      <Drawer.Navigator
        useLegacyImplementation
        // initialRouteName={NavigatorRoute.HOME}
        initialRouteName={Constant_Navigator.PAGE_START_DOCUSIGN}
      >
        {/* TableScreen */}
        <Drawer.Screen
          name={NavigatorRoute.TABLE_SCREEN}
          component={TableScreen}
          options={{
            headerShown: false,
            drawerItemStyle: {display: Orignal},
          }}
        />
        <Drawer.Screen
          name={NavigatorRoute.DOCUMENT_SCREEN}
          component={AllDocuments}
          options={{
            headerShown: false,
            title: t(Localization('documents')) ?? '',
            drawerItemStyle: {display: Orignal},
          }}
        />
        <Drawer.Screen
          name={NavigatorRoute.SESSION.MAIN}
          component={SessionRoute}
          options={{
            headerShown: false,
            title: 'Sessions',
            drawerItemStyle: {display: Orignal},
          }}
          //   drawer: {
          //   screen: drawerScreens,
          //   navigationOptions: ({navigation}) => ({
          //   header: (
          //   <View style={styles.container}>
          //   <Text>Header</Text>
          //   </View>,
          //   ),
          // }),
          // },
        />
        <Drawer.Screen
          name={NavigatorRoute.UPLOAD_SCREEN}
          component={UploadToBeSignedScreen}
          options={{
            headerShown: false,
            title: 'File uploads',
            drawerItemStyle: {display: Orignal},
          }}
        />
        <Drawer.Screen
          name={NavigatorRoute.PROGRESS_BAR}
          component={ProgressBarScreen}
          options={{
            headerShown: false,
            title: 'Progress Bar',
            drawerItemStyle: {display: Orignal},
          }}
        />

        <Drawer.Screen
          name={NavigatorRoute.PAGINATION_SCREEN}
          component={PaginationScreen}
          options={{
            headerShown: false,
            title: t(Localization('paginationScreen')) ?? '',
            drawerItemStyle: {display: Orignal},
          }}
        />

        <Drawer.Screen
          name={NavigatorRoute.DIALOG_SCREEN}
          component={DialogScreen}
          options={{
            headerShown: false,
            title: t(Localization('dialogScreen')) ?? '',
            drawerItemStyle: {display: Orignal},
          }}
        />
        <Drawer.Screen
          name={NavigatorRoute.SLIDE_SCREEN}
          component={SlideScreen}
          options={{
            headerShown: false,
            title: t(Localization('slideScreen')) ?? '',
            drawerItemStyle: {display: Orignal},
          }}
        />
        <Drawer.Screen
          name={NavigatorRoute.TEST_COMPONENT}
          component={TestComponent}
          options={{
            headerShown: false,
            title: t(Localization('testComponents')) ?? '',
            drawerItemStyle: {display: Orignal},
          }}
        />

        <Drawer.Screen
          name={NavigatorRoute.HOME}
          component={HomeScreen}
          options={{
            headerShown: false,
            drawerItemStyle: {display: Orignal},
          }}
        />
        <Drawer.Screen
          name={NavigatorRoute.FORGOT_PASSWORD}
          component={ForgotPasswordScreen}
          options={{
            headerShown: false,
            title: t(Localization('forgotPassword')) ?? '',
            drawerItemStyle: {display: Orignal},
          }}
        />
        <Drawer.Screen
          name={NavigatorRoute.TEST_API}
          component={TestAPiServerRequestScreen}
          options={{
            headerShown: false,
            title: t(Localization('testAPIServerRequestScreen')) ?? '',
            drawerItemStyle: {display: Orignal},
          }}
        />
        <Drawer.Screen
          name={NavigatorRoute.SAMPLE_UI.MAIN}
          component={SampleUI}
          options={{
            headerShown: false,
            title: t(Localization('sampleUILandingScreen')) ?? '',
            drawerItemStyle: {display: Orignal},
          }}
        />
        {/*  Docusign*/}
        {/*<Drawer.Screen*/}
        {/*  name={Constant_Navigator.PAGE_HOME_DOCUSIGN}*/}
        {/*  component={PageHomeDocusign}*/}
        {/*  options={{*/}
        {/*    headerShown: false,*/}
        {/*    title: t(Localization('home')) ?? '',*/}
        {/*    drawerItemStyle: {display: Docusign},*/}
        {/*  }}*/}
        {/*/>*/}
        <Drawer.Screen
          name={Constant_Navigator.PAGE_ACCOUNT_DOCUSIGN}
          component={PageAccountDocusign}
          options={{
            headerShown: false,
            title: t(Localization('account')) ?? '',
            drawerItemStyle: {display: Docusign},
          }}
        />
        <Drawer.Screen
          name={Constant_Navigator.PAGE_SETTING_DOCUSIGN}
          component={PageSetting}
          options={{
            headerShown: false,
            title: t(Localization('setting')) ?? '',
            drawerItemStyle: {display: Docusign},
          }}
        />
        <Drawer.Screen
          name={Constant_Navigator.PAGE_TEMPLATE_DOCUSIGN}
          component={PageTemplates}
          options={{
            headerShown: false,
            title: t(Localization('templates')) ?? '',
            drawerItemStyle: {display: Docusign},
          }}
        />
        <Drawer.Screen
          name={Constant_Navigator.PAGE_START_DOCUSIGN}
          component={PageStart}
          options={{
            headerShown: false,
            title: t(Localization('backHome')) ?? '',
            drawerItemStyle: {display: Docusign},
          }}
        />
        <Drawer.Screen
          name={Constant_Navigator.PAGE_PREVIEW_PDF_DOCUSIGN}
          component={PagePreviewPdfDocusign}
          options={{
            headerShown: false,
            title: t(Localization('backHome')) ?? '',
            drawerItemStyle: {display: 'none'},
          }}
        />
        <Drawer.Screen
          name={Constant_Navigator.PAGE_ADD_PDF_DOCUSIGN}
          component={PageAddPdfDocusign}
          options={{
            headerShown: false,
            title: t(Localization('backHome')) ?? '',
            drawerItemStyle: {display: 'none'},
          }}
        />

        <Drawer.Screen
          name={Constant_Navigator.PAGE_SIGN_DOCUSIGN}
          component={PageSignDocusign}
          options={{
            headerShown: false,
            title: t(Localization('backHome')) ?? '',
            drawerItemStyle: {display: 'none'},
          }}
        />
        <Drawer.Screen
          name={Constant_Navigator.PAGE_RECIPIENT_DOCUSIGN}
          component={PageRecipientsDocusign}
          options={{
            headerShown: false,
            title: t(Localization('backHome')) ?? '',
            drawerItemStyle: {display: 'none'},
          }}
        />
      </Drawer.Navigator>
    </>
  );
};

const SessionRoute = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={NavigatorRoute.SESSION.SESSION_SCREEN}
    >
      <Stack.Screen
        name={NavigatorRoute.SESSION.SESSION_SCREEN}
        component={SessionScreen}
      />
      <Stack.Screen
        name={NavigatorRoute.SESSION.DOCUMENT_IN_PROGRESS_SCREEN}
        component={DocumentInProgressScreen}
        options={{
          headerShown: true,
          header: () => <Header />,
        }}
      />
    </Stack.Navigator>
  );
};
const Header = () => (
  <View backgroundColor={'#3700B3'}>
    <HeaderLeft />
  </View>
);
const SampleUI = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={NavigatorRoute.SAMPLE_UI.LANDING}
  >
    <Stack.Screen
      name={NavigatorRoute.SAMPLE_UI.LANDING}
      component={LandingScreen}
    />
    <Stack.Screen
      name={NavigatorRoute.SAMPLE_UI.SAMPLE_DETAIL}
      component={SampleDetailScreen}
      options={{
        headerShown: true,
        // headerLeft: () => <HeaderLeft />,
        header: () => <Header />,
      }}
    />
  </Stack.Navigator>
);
export const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={Constant_Navigator.NewP_Session}
    >
      <Stack.Screen
        name={Constant_Navigator.NewP_Upload}
        component={PageUpload}
      />
      <Stack.Screen
        name={Constant_Navigator.ForgotPassword}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name={Constant_Navigator.Home} component={HomeScreen} />
      <Stack.Screen name={Constant_Navigator.View_PDF} component={View_PDF} />
      <Stack.Screen name={Constant_Navigator.View_CRUD} component={CRUD} />
      {/* My adding */}
      <Stack.Screen
        name={Constant_Navigator.Interface_cal}
        component={Calculator}
      />
      <Stack.Screen
        name={Constant_Navigator.Interface}
        component={Interface_Screen}
      />
      <Stack.Screen
        name={Constant_Navigator.Interface_form}
        component={FormInterface}
      />
      <Stack.Screen
        name={Constant_Navigator.Interface_facebook}
        component={Facebook}
      />
      <Stack.Screen
        name={Constant_Navigator.Interface_facebook_create}
        component={Facebook_create}
      />
      <Stack.Screen
        name={Constant_Navigator.Interface_facebook_profile}
        component={Facebook_profile}
      />
      <Stack.Screen
        name={Constant_Navigator.Interface_facebook_forgetPassword}
        component={Facebook_forgetPass}
      />
      <Stack.Screen name={Constant_Navigator.API_NG} component={API_NG_crud} />
      <Stack.Screen
        name={Constant_Navigator.API_NG_FILE}
        component={API_NG_FILE}
      />
      <Stack.Screen
        name={Constant_Navigator.Api_ng_actor}
        component={Api_ng_actor}
      />
      <Stack.Screen name={Constant_Navigator.Otp} component={Otp} />
      <Stack.Screen
        name={Constant_Navigator.Api_ng_profile_actor}
        component={Api_ng_profile_actor}
      />
      <Stack.Screen
        name={Constant_Navigator.PageApproveDoc}
        component={PageApprovedoc}
      />
      <Stack.Screen name={Constant_Navigator.Page_cgu} component={Page_cgu} />
      <Stack.Screen
        name={Constant_Navigator.Page_certificate}
        component={Page_certificate}
      />
      <Stack.Screen name={Constant_Navigator.PS} component={Page_test} />
      <Stack.Screen
        name={Constant_Navigator.FilePicker}
        component={WebOrMobiles}
      />
      <Stack.Screen
        name={Constant_Navigator.NewP_Session}
        component={PageSession}
      />
      <Stack.Screen
        name={Constant_Navigator.NewP_PageDetail}
        component={PageDetail}
      />
      <Stack.Screen
        name={Constant_Navigator.NewP_PageScenario}
        component={PageScenario}
      />
      <Stack.Screen
        name={Constant_Navigator.NewP_ApproveDoc}
        component={PageApproveDoc}
      />
      <Stack.Screen
        name={Constant_Navigator.NewP_PageGcu}
        component={PageCGU}
      />
      <Stack.Screen
        name={Constant_Navigator.NewP_PageGenerateCertificate}
        component={PageGenerateCertificate}
      />
      <Stack.Screen
        name={Constant_Navigator.NewP_PageSignature}
        component={PageSignature}
      />
      <Stack.Screen
        name={Constant_Navigator.NewP_PageDownload}
        component={PageDownload}
      />
      <Stack.Screen
        name={Constant_Navigator.NewP_PageViewPdf}
        component={PageViewPdf}
      />
    </Stack.Navigator>
  );
};
