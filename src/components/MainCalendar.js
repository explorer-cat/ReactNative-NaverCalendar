import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Dimensions } from "react-native";
import { CalendarList,CalendarProvider } from "react-native-calendars";
import { globalFonts } from "../styles/globalStyles";
import { getFormattedDate, parseDateString, getWeeksInMonth } from "../utils/calendarUtils";
import { selectedDate, setDrawerOpen } from "../modules/actions/actions";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import DatePicker from 'react-native-date-picker'

const todayDate = getFormattedDate(new Date());

export default function MainCalendar({ navigation }) {
  const dispatch = useDispatch();
  const windowWidth = Dimensions.get("window").width;
  let currentMonth;
  let dayHeight = 0;
  const selected = useSelector(state => state.selectedDate);

  console.log('selected',selected)


  const calendarInfo = [
    {
      "2023-08-01": [{ color: "red" }, { color: "blue" }, { color: "green" }, { color: "gray" }, { color: "purple" }],
    },
    {
      "2023-08-02": [{ color: "red" }, { color: "blue" }, { color: "green" }, { color: "gray" }, { color: "purple" }],
    },
    {
      "2023-08-03": [{ color: "red" }, { color: "blue" }, { color: "green" }, { color: "gray" }, { color: "purple" }],
    },
    {
      "2023-08-13": [{ color: "yellow" }, { color: "blue" }, { color: "black" }],
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <CalendarHeader />
        <CalendarList
          // initialDate={selected}
          // staticHeader = /**/{true}
          // headerStyle = {{height:50}}
          // onVisibleMonthsChange={(months) => {
          //   // console.log('now these months are visible',  months[0].dateString);
          //   // //현재 헤더의 년월 정보를 변수에 저장해놓고 Day컴포넌트르 만들때 사용할게요.
          //   currentMonth = parseDateString(months[0].dateString);
          //   // currentMonth = months[0].dateString;
          //   // console.log('currentMonth',currentMonth)
          //   const weeksCount = getWeeksInMonth(currentMonth.year, currentMonth.month - 1);
          //   dayHeight = weeksCount === 5 ? 40 : 29;
          //   console.log("onVisibleMonthsChange")
          //   // return(<View><Text>dd</Text></View>)
          // }}
          hideArrows={false}
          firstDay={0} // 일요일부터 시작.
          // customHeader={({ current }) => {
          //   //현재 헤더의 년월 정보를 변수에 저장해놓고 Day컴포넌트르 만들때 사용할게요.
          //   // currentMonth = parseDateString(current);
          //   // const weeksCount = getWeeksInMonth(currentMonth.year, currentMonth.month - 1);
          //   // dayHeight = weeksCount === 5 ? 40 : 29;
          //   // console.log("customHeader")
          //   // return(<View><Text>dd</Text></View>)
          // }}
          dayComponent={(data) => {
            // console.log("dayComponent")
            // const dayScheduleData = calendarInfo.find(obj => obj[data.date.dateString]);
            currentMonth = parseDateString(selected);
            return (
              <View style={{ height: dayHeight }}>
                <Day data={data} currentMonth={currentMonth} />
              </View>
            );
          }}
          //월이 바뀔경우 바뀐 월의 1일을 선택합니다.
          onMonthChange={month => {
            // console.log('month',month)
            //오늘 날짜가 포함된 달이 아닌경우에만 1을 선택함
            if (month.dateString !== todayDate) {
              const parseString = parseDateString(month.dateString);
              dispatch(selectedDate(`${parseString.year}-${parseString.month < 10 ? `0${parseString.month}` : `${parseString.month}`}-01`));
            }
          }}
          disableMonthChange = {false}
          hideExtraDays={false} // 월 페이지에서 다른 달의 날짜를 숨길지 여부
          horizontal={true}
          pagingEnabled={true}
          disabledByDefault={true}
          calendarWidth={windowWidth}

        />

    </View>
  );
}


const Day = ({ data, currentMonth, schedule }) => {
  const dayDate = {
    year: data.date.year.toString(),
    month: data.date.month.toString(),
    day: data.date.day.toString(),
  };
  const dispatch = useDispatch();
  const selected = useSelector(state => state.selectedDate);
  //현재 선택되어있는 날짜 flag
  const isSelected = selected === data.date.dateString;
  //현재 생성하는 Day 컴포넌트의 월과 헤더 타이틀에 표시되는 월이 동일한가? 동일하지 않으면 Gray 처리 해야함.
  const isSameMonth = currentMonth.month === dayDate.month;
  //현재 생성하는 Day컴포넌트가 오늘인가? 오늘이라면 검은색으로 표시해줘야함
  const isToday = todayDate === data.date.dateString;
  //컴포넌트 Text Color
  const textColor = isSameMonth ? (isToday ? "white" : "black") : "gray";

  //해당 함수는 각 컴포넌트마다 모두 똑같기 때문에 UseCallBack에 넣어놓고 사용하자.
  const handleOnPressDay = useCallback(({ date }) => {
    //같은 달을 클릭한것이 아니라면 이전달, 다음달로 달력을 이동시켜줘야함.
    if(!isSameMonth) {
      // dispatch(selectedDate(date.year+'-'+date.month+'-01'));
      // dispatch(selectedDate(date.dateString));
    } else {
      dispatch(selectedDate(date.dateString));
    }
  }, [dispatch]);



  // console.log('scheduleInfo[data.date.dateString]',scheduleInfo[data.date.dateString])
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[{ flex: 1, minWidth: 50, alignItems: "center" }]}
      onPress={() => handleOnPressDay(data)}>
      <View
        style={[
          styles.day,
          isSelected && styles.selectedDay,
          isToday && styles.today,
        ]}>
        <Text
          style={[
            globalFonts.fontSemiBold,
            {
              fontSize: 13,
              color: textColor,
              textAlign: "center",
            },
          ]}>
          {data.date.day}
        </Text>
      </View>
      <View style = {{flexDirection :'row',marginTop:4}}>
        {/*{schedule && schedule[data.date.dateString].map((dot, index) => (*/}
        {/*  <View*/}
        {/*    key={index}*/}
        {/*    style={{*/}
        {/*      width: 4,*/}
        {/*      height: 4,*/}
        {/*      marginRight: index === schedule[data.date.dateString].length - 1 ? 0 : 2,*/}
        {/*      backgroundColor: dot.color,*/}
        {/*      borderRadius: 4*/}
        {/*    }}*/}
        {/*  />*/}
        {/*))}*/}

      </View>
    </TouchableOpacity>
  );
};


const CalendarHeader = React.memo(() => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const selected = useSelector(state => state.selectedDate);
  const drawerOpen = useSelector(state => state.drawerOpen);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [date, setDate] = useState(new Date())

  const parts = selected.split("-");
  const year = parts[0];
  const month = parseInt(parts[1]);

  const handleClickSearchBtn = () => {
    navigation.navigate("Search");
  };

  /**
   * @title Drawer Open Event
   */
  const handleOpenDrawer = () => {
    drawerOpen ? dispatch(setDrawerOpen(false)) : dispatch(setDrawerOpen(true));
  };


  return (
    <View style={[styles.calendarHeaderView, { height: 90 }]}>
      <DatePicker
        modal
        open={dialogOpen}
        date={date}
        onConfirm={(date) => {
          setDialogOpen(false)
          dispatch(selectedDate(getFormattedDate(date)));
        }}
        onCancel={() => {
          setDialogOpen(false)
        }}
      />
      <View style={{ flex: 1, flexDirection: "row", paddingHorizontal: 8, justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <TouchableOpacity
            onPress={handleOpenDrawer}
            style={{ flexDirection: "column", marginRight: 18 }}
            activeOpacity={1}>
            <View style={[styles.menuBar, { width: 20, marginBottom: 4 }]}></View>
            <View style={[styles.menuBar, { width: 10, marginBottom: 4 }]}></View>
            <View style={[styles.menuBar, { width: 15 }]}></View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setDialogOpen(dialogOpen ? false : true)}
          >
            <Text style={[globalFonts.fontBold, { fontSize: 20 }]}>{`${year}. ${month}`}</Text>
            <Image
              source={dialogOpen ? require("../../assets/images/arrow_up_icon_dark.png") : require("../../assets/images/arrow_down_icon_dark.png")}
              style={{ marginLeft: 4, marginTop: 4, width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity style={{ marginRight: 24 }} onPress={handleClickSearchBtn} activeOpacity={1}>
            <Image source={require("../../assets/images/search_btn_icon_dark.png")}
                   style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}>
            <Image source={require("../../assets/images/calendar_icon_dark.png")}
                   style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: "row", alignItems: "flex-end", marginBottom: 4 }}>
        <Text style={[styles.dayOfWeek, { color: "red" }]}>일</Text>
        <Text style={[styles.dayOfWeek]}>월</Text>
        <Text style={[styles.dayOfWeek]}>화</Text>
        <Text style={[styles.dayOfWeek]}>수</Text>
        <Text style={[styles.dayOfWeek]}>목</Text>
        <Text style={[styles.dayOfWeek]}>금</Text>
        <Text style={[styles.dayOfWeek, { color: "blue" }]}>토</Text>
      </View>
    </View>

  );
});


const styles = StyleSheet.create({
  calendarHeaderView: {
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 12,
    flexDirection: "column",
  },
  menuBar: {
    height: 2,
    backgroundColor: "black",
    borderRadius: 8,
  },
  dayOfWeek: {
    flex: 1,
    minWidth: 50,
    fontSize: 12,
    textAlign: "center",
  },
  day: {
    alignItems: "center",
    justifyContent: "center",
    width: 22,
    height: 22,
  },
  selectedDay: {
    borderRadius: 15,
    backgroundColor: "#C9C9C9",
  },
  today: {
    borderRadius: 15,
    backgroundColor: "black",
  },

});



