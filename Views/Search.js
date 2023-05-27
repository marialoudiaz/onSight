import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, Button, View, Text,TextInput, Image, Alert, ScrollView, ImageBackground } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {container, searchContainer, header, headerinput, text, button, image, searchbox, resultBlock, addButton, innerShadow, dropShadow, addWLBtn, dropShadowInput, glassComponent, bottomNavigation} from '../style/style.js';
import { LinearGradient } from 'expo-linear-gradient';
import {useFonts} from 'expo-font';
import { GpsFixed } from '@mui/icons-material';


export default function Search({storeData,fontsLoaded,watchListData, setWatchListData}){
//////////////////// USE OF ASYNCSTORAGE /////////////////////////
// the data to store (items)
const [data, setData]=useState([])

//////////////////// STATE COMPONENTS AND VARIABLES /////////////////////////
const [error, setError]=useState('')
const [s, setS] = useState(''); 
const [results, setResults] = useState([]); 
//////////////////// END IF STATE COMPONENTS AND VARIABLES /////////////////////////

/////////////////////////////////// FOR SEARCH ///////////////////////////////////////
const searchFilm = (s) => {
  const url= `http://www.omdbapi.com/?s=${s}&apikey=348eb517`;
  axios(url).then(({ data }) => {
    if (data.Response==="True"){
    // chaque object.search envoyé dans setResults en tant qu'object 
    //Change l'état de results à l'array des recherches trouvées
      let newResults=data.Search
      console.log('search',data.Search)
      setResults(newResults)
    } else{
      setError("After reviewing every single movie names known to mankind, we cannot provide anything ")
    }
  });
}; 

const showResult=()=>{
     return results.map((result,i)=>{
        return(
        <View key={i} style={styles.image}>
          {result.Poster==="N/A"?(
          <ImageBackground style={styles.resultBlockSearch} imageStyle={{borderRadius:40,opacity:0.3,borderColor:'lightgrey',borderWidth: 3}} source={require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/onsightblurre-4.png')}>
          <View style={styles.headerBlock}>
          {fontsLoaded&&(<Text style={{fontFamily:'Montserrat-Regular',color:'white',fontSize:18}}>{result.Title}</Text>)}
          {fontsLoaded&&(<Text style={{fontFamily:'Montserrat-Regular',color:'white',fontSize:10,padding:2}}>{result.Type}</Text>)}
          {fontsLoaded&&(<Text style={{fontFamily:'Montserrat-Regular',color:'white',fontSize:9,padding:2}}>{result.Year}</Text>)}
          </View>
          <View style={[styles.addButtonSearch, styles.dropShadow]}>
          <Button onPress={()=>handleSubmit(result.imdbID)} title="+" color="grey"/>
          </View>
          </ImageBackground>
          ):(
          <ImageBackground  style={styles.resultBlockSearch} imageStyle={{borderRadius:40,opacity:0.3,borderColor:'lightgrey',borderWidth:3}} source={{uri:`${result.Poster}`}}>
          <View style={styles.headerBlock}>
          {fontsLoaded&&(<Text style={{fontFamily:'Montserrat-Regular',color:'white',fontSize:18}}>{result.Title}</Text>)}
          {fontsLoaded&&(<Text style={{fontFamily:'Montserrat-Regular',color:'white',fontSize:10,padding:2}}>{result.Type}</Text>)}
          {fontsLoaded&&(<Text style={{fontFamily:'Montserrat-Regular',color:'white',fontSize:9,padding:2}}>{result.Year}</Text>)}
          </View>
          <View style={[styles.addButtonSearch, styles.dropShadow]}><Button onPress={()=>handleSubmit(result.imdbID)} title="+" color="grey"/></View>
          </ImageBackground>
         )}
        </View>
      )})}
  // ce qui est submit
  const handleSubmit=(id)=>{setResults([]);findMovie(id)};

  /////////////////////////////////// FOR WATCHLIST ///////////////////////////////////////
  //Fonction pour récupérer les données de l'api à partir du titre inputed


  const addToWatchList = ({ title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster }) => {
    const newMovie = {
      title: Title,
      year: Year,
      runtime: Runtime,
      genre: Genre,
      director: Director,
      poster: Poster,
    };
    setData([...data, newMovie]);
    setWatchListData([...watchListData, newMovie]);
  }

  // a chaque fois que je modifie watchListData : modifier dans AsyncStorage

  const findMovie = async (id) => {
    const url= `http://www.omdbapi.com/?i=${id}&apikey=348eb517`
    try {
      const res = await axios.get(url);
      console.log('res', res)
      // if response is true 
      let {Title, Year, Runtime, Genre, Director, Poster} = res.data;
      console.log('res',res.data)
      // trigger addToWatchList
      if (Poster=='N/A') {
        Poster='/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/onsightblurre-4.png';
        addToWatchList({ title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster })
      }else {
        addToWatchList({ title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster })
      };
    }catch(error){
    setError(error.message)
}}
  // // une fois que data est assigné 
  // useEffect(()=>{if(data.length>0){storeData();{/*une fois data ajoutés au component data, je lance la fonction _storeData*/}}},[data])

////////////////////////////////////////// FOR RETURN //////////////////////////////////////////

  return ( 
  <LinearGradient colors={['#192b87', '#5dbdf5']} style={styles.container}>
    <SafeAreaView>
        <View>
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 50, paddingTop: 10, paddingRight: 10, marginTop: 20, marginLeft:20, color:'white'}}>Hello,</Text>}          
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 15, paddingTop: 10, paddingBottom:10, marginBottom: 10, marginLeft:20,color:'white'}}>Start searching for your next movie</Text>}
        </View>
        <View  style={styles.searchContainer}>
        {fontsLoaded && <TextInput style={[styles.searchbox, styles.dropShadowInput, { fontFamily: 'Montserrat-Light' }]} value={s} placeholder="search for a movie" onChangeText={(text) => setS(text)}/>}
        <View style={[styles.addButtonInput, styles.dropShadow]}><Button onPress={()=>searchFilm(s)} title="+" color="grey"/></View>
        </View>
        {/* The suggestion from search + Triggered quand results a des items */}
        <ScrollView>
        {results.length>0 && <Text style={[styles.header, {fontFamily: 'FT88-Serif', color: 'white'}]}>Matched results</Text>}  
        {results.length>0 && showResult()}
        {error!='' ? (<View style={{ flexDirection: 'row', alignItems: 'center'}}><Text style={[styles.header,{fontFamily: 'FT88-Regular', color: 'white', fontSize: 16, lineHeight: 21, paddingLeft:5, paddingRight:5}]}>{error}<Image style={{width:17, height:17, resizeMode:'cover'}} source={require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/emoji_sad.png')}/></Text></View>): <View></View>}
        </ScrollView>
    </SafeAreaView>
  </LinearGradient>
)}

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
  addButtonWL: {...addButton, height:60, width: 60, borderWidth: 3, borderColor:'#5072A7' },
  glassComponent: glassComponent,
  resultBlockWatch: {...resultBlock, flex:1},
  resultBlockSearch: {...resultBlock, gap:50},
  bottomNavigation: bottomNavigation,
})