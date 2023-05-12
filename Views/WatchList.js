import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, Button, View, Text,TextInput, Image, Alert, ScrollView, ImageBackground } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {container, searchContainer, header, headerinput, text, button, image, searchbox, resultBlock, addButton, innerShadow, dropShadow, addWLBtn, dropShadowInput, glassComponent} from '../style/style.js';
import {useFonts} from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


export default function WatchList(){


  return (
    <LinearGradient colors={['#192b87', '#5dbdf5']} style={styles.container}>
    <SafeAreaView>
        <View>
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 50, paddingTop: 10, paddingRight: 10, marginTop: 20, marginLeft:20, color:'white'}}>My watchlist</Text>}          
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 15, paddingTop: 10, paddingBottom:10, marginBottom: 10, marginLeft:20,color:'white'}}>{ lengthList<=1 ? `you have ${lengthList} film to watch` : `you have ${lengthList} films to watch` }</Text>}
        </View>
        <ScrollView>
         {data.length>0 && showFilm()}
        </ScrollView>
    </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: container, 
  header: header,
  input: input, 
  text: text, 
  button: button, 
  image: image,
  searchbox: searchbox, 
  resultBlock: resultBlock,
  searchContainer: searchContainer,
  addButton:addButton,
  innerShadow:innerShadow,
  dropShadow: dropShadow,
  addWLBtn:addWLBtn,
  dropShadowInput:dropShadowInput,
  addButtonInput: {...addButton, right:55},
  addButtonSearch: {...addButton, bottom:2, position: 'absolute',left:280, bottom:21},
  addButtonWL: {...addButton, right:10, height:40, width: 40, borderWidth: 3, borderColor:'#5072A7' },
  glassComponent: glassComponent,
  resultBlockWatch: {...resultBlock, flex:1},
  resultBlockSearch: {...resultBlock, gap:50}
})