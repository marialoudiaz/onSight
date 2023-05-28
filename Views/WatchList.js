import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, Button, View, Text, Alert, ScrollView, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {container, searchContainer, header, text, button, image, searchbox, resultBlock, addButton, innerShadow, dropShadow, addWLBtn, dropShadowInput, glassComponent} from '../style/style.js';
import {useFonts} from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


export default function WatchList({fontsLoaded,watchListData, setWatchListData}){
//////////////////// USE OF ASYNCSTORAGE /////////////////////////
const [lengthList, setLengthList]=useState(0)

  // Fonction pour supprimer un film de la liste  (DELETE)
    const myAlert =(i)=>{
      Alert.alert('Reset Data','Are you sure you want to delete this movie from the list ?',
        [{text: 'Cancel', onPress:()=> console.log('Cancel Pressed'), style: 'cancel'}, {text: 'OK', onPress:()=>removeValue(i) },],{cancelable: false})
    }  
      // I = INDEX OF ELEMENT TO DELETE IN THE ARRAY
      const removeValue = (i)=>{
      // 1 - enlever l'élement de data
      const removeFromData = watchListData.filter((_, index) => index !== i);
      // removeFromData est la nouvelle constante mise a jour sans l'element supprimé. Peut donc assigner la const directement
      console.log('onceRemoved', removeFromData)
      // setData(removeFromData)
      setWatchListData(removeFromData)};

  // Fonction pour afficher les films (DISPLAY)
  const showFilm=()=>(
    watchListData.map((movie,i)=>{
      {/*display dots if title too long*/}
      const truncatedDirector = movie.director.length > 15 ? movie.director.substring(0, 10) + "..." : movie.director;
      const truncatedTitle = movie.title.length > 15 ? movie.title.substring(0, 10) + "..." : movie.title;
      return (<View key={i}>
        <ImageBackground  style={[styles.resultBlockWatch]} imageStyle={{borderRadius: 40, opacity: 0.3, borderColor: 'lightgrey', borderWidth: 3}} source={{uri:`${movie.poster}`}}>
        <View>
           <View>
            {fontsLoaded&&<Text style={{fontFamily: 'Montserrat-Light', color: 'white', fontSize: 10}}>{movie.genre}</Text>}
            {fontsLoaded&&<Text style={{fontFamily: 'Montserrat-Medium', color: 'white', fontSize: 20, fontWeight: 700}}>{truncatedTitle}</Text>}
            {fontsLoaded&&<Text style={{fontFamily: 'Montserrat-Regular', color: 'white',fontSize: 12}}>{truncatedDirector}</Text>}
           </View>
           <View>
           <BlurView blurType={"light"} blurAmount={50} reducedTransparencyFallbackColor="rgba(37,42,54,.25)" style={[styles.glassComponent]}>
           {fontsLoaded&&<Text style={{fontFamily: 'Montserrat-SemiBold', color: 'white'}}>{movie.year}</Text>}
           {fontsLoaded&&<Text style={{fontFamily: 'Montserrat-SemiBold', color: 'white'}}>{movie.runtime}</Text>}
          
           </BlurView>
           </View>
        </View>
        <View style={[{position: 'absolute', top:10,right:55}]}><Icon name="remove" size={20} color='white'onPress={()=> myAlert(i)}/></View>
        </ImageBackground>
      </View> 
      )} 
    )
  )

  // Fonction pour calculer le nombre de films dans la watchList
     const moviesLeft=()=>{return setLengthList(watchListData.length)}
  // Re-render when number of item change in watchList (permet de changer nombre d'items affichés dans la liste)
    useEffect(()=>{moviesLeft();},[watchListData])
  // // une fois que data est assigné 
  // useEffect(()=>{if({watchListData}.length > 0){storeData();}},[watchListData])

  return (
    <LinearGradient colors={['#192b87', '#5dbdf5']} style={styles.container}>
      <SafeAreaView>
        <View>
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 42, paddingTop: 10, paddingRight: 10, marginTop: 20, marginLeft:20, color:'white'}}>My watchlist</Text>}          
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 15.4, paddingTop: 10, paddingBottom:10, marginBottom: 10, marginLeft:20,color:'white'}}>{ lengthList<=1 ? `you have ${lengthList} film to watch` : `you have ${lengthList} films to watch` }</Text>}
        </View>
        <ScrollView>
          {watchListData.length>0 ? showFilm() : <View>{fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 20, paddingTop: 20, paddingBottom:10, marginBottom: 10, marginLeft:20,color:'white'}}>No movies added yet :-(</Text>}</View>}
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
  resultBlock: resultBlock,
  searchContainer: searchContainer,
  addButton:addButton,
  innerShadow:innerShadow,
  dropShadow: dropShadow,
  addWLBtn:addWLBtn,
  dropShadowInput:dropShadowInput,
  addButtonInput: {...addButton, right:55},
  addButtonWL: {...addButton, right:10, height:40, width: 40, borderWidth: 3, borderColor:'#5072A7' },
  glassComponent: glassComponent,
  resultBlockWatch: {...resultBlock, flex:1},
})