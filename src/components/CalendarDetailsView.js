import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {Dimensions} from 'react-native';
import {CalendarList} from "react-native-calendars";
import {globalFonts} from "../styles/globalStyles";
import {getFormattedDate, parseDateString} from '../utils/calendarUtils'
import {selectedDate, selectedPrevDate} from "../modules/actions/actions";
import {Provider, useDispatch, useSelector} from 'react-redux'



export default function CalendarDetailsView() {
    const dispatch = useDispatch();
    const windowWidth = Dimensions.get('window').width;
    let currentMonth;

    return (
        <View>
            <Text>ddd</Text>
        </View>
    );
}

