import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import SearchScreen from '../screens/SearchScreen';
const Stack = createNativeStackNavigator();

function MainNavigator() {
  return (
    <NavigationContainer>
      {/* 네비게이션 기본틀의 스택을 생성 */}
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerMode: 'screen',
          headerShadowVisible: true,
        }}>
        {/* 해당스택에 들어갈 화면 요소를 넣어준다. */}
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            //스크린을 아래에서 위로 올라오게 합니다.
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
