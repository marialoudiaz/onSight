import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, Button, View, Text, Alert, ScrollView, ImageBackground } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {container, searchContainer, header, headerinput, text, button, image, searchbox, resultBlock, addButton, innerShadow, dropShadow, addWLBtn, dropShadowInput, glassComponent} from '../style/style.js';
import {useFonts} from 'expo-font';
import Icon from 'react-native-vector-icons/FontAwesome'
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Search from './Search'


export default function WatchList({dataPassed}){
  console.log('dataPassed',dataPassed)
//////////////////// USE OF ASYNCSTORAGE /////////////////////////
const [data, setData]=useState([])
const [retrievedData, setRetrievedData]=useState([])
const [lengthList, setLengthList]=useState(0)

useEffect(() => {
  // make it an array
  if (dataPassed && Array.isArray(dataPassed)) {
    setData(dataPassed);
  }
}, [dataPassed]);
console.log('data',data)

// send each item created to the storage
const _storeData = async (data) => {
  try {
    // we need to stringify our array into a string
    const set = await AsyncStorage.setItem('item', JSON.stringify(data) );
    console.log('set',set)
  } catch (error){
  }
};
// Once put, retrieve them and display them
const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('item');
    console.log('value',value)
    let bringBackToArray= JSON.parse(value)
    console.log('parsedvalue', bringBackToArray)
    setRetrievedData(bringBackToArray)
// now we have data restored from asyncStorage parsed back into an array which we can use
} catch (error) {}};
// Will trigger only once : when opening the app
useEffect(()=>{_retrieveData()},[])/////////// TYPOS ///////////////////////////////////////
const [fontsLoaded] = useFonts({
  'FT88-Regular': require('../assets/fonts/FT88-Regular.ttf'),
  'FT88-Serif': require('../assets/fonts/FT88-Serif.ttf'),
  'Montserrat-Regular' : require('../assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-Light' : require('../assets/fonts/Montserrat-Light.ttf'),
  'Montserrat-Medium' : require('../assets/fonts/Montserrat-Medium.ttf'),
  'Montserrat-SemiBold' : require('../assets/fonts/Montserrat-SemiBold.ttf')
}) 
  // Fonction pour supprimer un film de la liste  (DELETE)
    const myAlert =(i)=>{
      Alert.alert('Reset Data','Are you sure you want to delete this movie from the list ?',
        [{text: 'Cancel', onPress:()=> console.log('Cancel Pressed'), style: 'cancel'}, {text: 'OK', onPress:()=>removeValue(i) },],{cancelable: false})
    }  
      // I = INDEX OF ELEMENT TO DELETE IN THE ARRAY
      const removeValue = (i)=>{
      // 1 - enlever l'élement de data
      const removeFromData = data.filter((_, index) => index !== i);
      console.log('removeFromData',data)
      setData(removeFromData)
     // 2- enlever l'élement de l'AsyncStorage : will be done by the useEffect that stores the data everytime data changes
  //   try {
  //     const storedData = await AsyncStorage.getItem('item') // recupere toute l'array de film
  //     console.log('storedData', storedData)
  //   if (storedData) {
  //     const retrievedData = JSON.parse(storedData); // Parse the stored JSON data into an array
  //     console.log('retrievedData', retrievedData)
  //     retrievedData.splice(i, 1); // Remove the item at the specified index
  //     console.log('retrievedData', retrievedData)
  //     const set = await AsyncStorage.setItem('item', JSON.stringify(retrievedData)); // Save the updated array back to AsyncStorage
  //     setData(retrievedData)
  //     // setRetrievedData(retrievedData);
  //     console.log('set',set)
  //     console.log('Data removed and updated in AsyncStorage.');
  //   } else {
  //     console.log('No data found in AsyncStorage.');
  //   }
  // } catch (error) {
  //   console.log('Error:', error);// }
  // console.log('Done.');
};

  // Fonction pour afficher les films (DISPLAY)
  const showFilm=()=>(
    data.map((movie,i)=>{
      {/*DISPLAY DOTS IF TOO LONG*/}
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
           {fontsLoaded&&<Text style={{fontFamily:'Montserra-Light', color: 'white' }}>{i}</Text>}
           </BlurView>
           </View>
        </View>
        <View style={[{position: 'absolute', top:10,right:55}]}><Icon name="remove" size={20} color='white'onPress={()=> myAlert(i)}/></View>
        </ImageBackground>
      </View> 
     )}
  ))

  // Fonction pour calculer le nombre de films dans la watchList
     const moviesLeft=()=>{return setLengthList(data.length)}
  // Re-render when number of item change in watchList (permet de changer nombre d'items affichés dans la liste)
    useEffect(()=>{moviesLeft();},[retrievedData])
  // une fois que data est assigné 
  useEffect(()=>{if({data}.length > 0){_storeData();}},[data])

  return (
    <LinearGradient colors={['#192b87', '#5dbdf5']} style={styles.container}>
      <SafeAreaView>
        <View>
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 42, paddingTop: 10, paddingRight: 10, marginTop: 20, marginLeft:20, color:'white'}}>My watchlist</Text>}          
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 15.4, paddingTop: 10, paddingBottom:10, marginBottom: 10, marginLeft:20,color:'white'}}>{ lengthList<=1 ? `you have ${lengthList} film to watch` : `you have ${lengthList} films to watch` }</Text>}
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