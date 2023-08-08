import { SafeAreaView, StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import * as React from "react";
import MainCalendar from "../components/MainCalendar";
import { globalFonts, globalStyles } from "../styles/globalStyles";
import { Drawer } from "react-native-drawer-layout";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerOpen } from "../modules/actions/actions";
import CalendarDetailsView from "../components/CalendarDetailsView";

export default function MainScreen({ navigation }) {
  const dispatch = useDispatch();
  const drawerOpen = useSelector(state => state.drawerOpen);


  return (<Drawer
      open={drawerOpen}
      onOpen={() => dispatch(setDrawerOpen(true))}
      onClose={() => dispatch(setDrawerOpen(false))}
      /*
        front: 뒤에 오버레이로 화면을 덮는 전통적인 서랍.
        back: 스와이프 시 서랍이 화면 뒤로 노출됩니다.
        slide: 화면과 서랍이 모두 스와이프하면 서랍이 드러납니다.
        permanent: 영구 서랍이 사이드 바로 표시됩니다.
      */
      drawerType={"front"}
      swipeMinVelocity={30}
      renderDrawerContent={() => {
        return <Text>Drawer content</Text>;
      }}
    >
      <SafeAreaView style={[globalStyles.container]}>
        <View style={[{ height: 365 }]}>
          <MainCalendar />
        </View>
        <View style={{ flex: 1, borderTopWidth: 1 }}>
          <CalendarDetailsView />
        </View>
      </SafeAreaView>
    </Drawer>);
}


