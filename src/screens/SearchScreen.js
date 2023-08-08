import {SafeAreaView, StyleSheet, Text, View,TouchableOpacity} from 'react-native';
import React,{useState} from 'react';
import {useNavigation} from "@react-navigation/native";



export default function SearchScreen() {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
            <TouchableOpacity onPress = {()=> navigation.goBack()}><Text>검색 스크린</Text></TouchableOpacity>
        </SafeAreaView>
    );
}

