import {StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import Login from '../screens/Login';
import OnBoardScreen from '../screens/OnBoardScreen';
import {createStackNavigator} from '@react-navigation/stack';
import {COLORS} from '../assets/theme';
import SubcategoryScreen from '../components/onBoarding/subCategory';
import LoginWithEmail_Password from '../screens/LoginWithEmail_Password';
import ChooseImgScreen from '../screens/ChooseImgScreen';
import SelectImage from '../components/SelectImg';
import Qr_codeScreen from '../screens/Qr_codeScreen';
import QRScanner from '../screens/QRScanner';
import SellerScreen from '../screens/SellerScreen';
import auth from '@react-native-firebase/auth';
import StartUpScreen from '../screens/StartUpScreen';
import {useDispatch, useSelector} from 'react-redux';
import {addUID} from '../redux/userTokenSlice';
import {StartCall} from '../components/WebRTC/StartCall';
import WebRTC from '../components/WebRTC/WebRTC';
import RTCIndex from '../components/WebRTC/RTCIndex';

const Stack = createStackNavigator();

const Authnavigation = () => {
  // const [user, setUser] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.userToken.UID);
  console.log('🚀 ~ Authnavigation ~ user:', user);

  useEffect(() => {
    const unregister = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        console.log('userExist.uid firebaseonAuth----->', userExist.uid);
        dispatch(addUID(userExist.uid));
        // setUser(userExist);
      } else {
        // setUser('');
      }
    });
    return () => {
      unregister();
    };
  }, []);

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={COLORS.darkBlue} />
      <Stack.Navigator
        // initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        {user ? (
          <>
            <Stack.Screen name="SellerScreen" component={SellerScreen} />
            <Stack.Screen name="QRScanner" component={QRScanner} />
            <Stack.Screen name="QR_codeScreen" component={Qr_codeScreen} />
            {/* <Stack.Screen name="WebRTC" component={WebRTC} /> */}
            <Stack.Screen name="RTCIndex" component={RTCIndex} />
          </>
        ) : (
          <>
            <Stack.Screen name="StartUpScreen" component={StartUpScreen} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              name="LoginWithEmail_Password"
              component={LoginWithEmail_Password}
            />
          </>
        )}
      </Stack.Navigator>
    </>
  );
};

export default Authnavigation;
