import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, Button, View, Text,TextInput, Image, Alert, ScrollView, ImageBackground } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {container, searchContainer, header, headerinput, text, button, image, searchbox, resultBlock, addButton, innerShadow, dropShadow, addWLBtn, dropShadowInput, glassComponent, bottomNavigation} from '../style/style.js';
import { LinearGradient } from 'expo-linear-gradient';
import {useFonts} from 'expo-font';


export default function Search({watchListData, setWatchListData}){
//////////////////// USE OF ASYNCSTORAGE /////////////////////////
// the data to store (items)
const [data, setData]=useState([])
const [retrievedData, setRetrievedData]=useState([])
// send each item created to the storage
const _storeData = async (data) => {
  try {
    // we need to stringify our array into a string
    const set = await AsyncStorage.setItem('item', JSON.stringify(data) );
  } catch (error){
  }
};
// Once put, retrieve them and display them
const _retrieveData = async()=>{
  try {
    const value = await AsyncStorage.getItem('item') || [];// Or set to empty array for when user is new(no data to retrieve then)
    let bringBackToArray= JSON.parse(value)
    setRetrievedData(bringBackToArray)
// now we have data restored from asyncStorage parsed back into an array which we can use
} catch (error) {}};
//////////////////// END OF ASYNCSTORAGE /////////////////////////

//////////////////// STATE COMPONENTS AND VARIABLES /////////////////////////
//length of watchList
const [lengthList, setLengthList]=useState(0)
const [error, setError]=useState('')
const [s, setS] = useState(''); 
const [results, setResults] = useState([]); 
///////////////////// TYPOS ///////////////////////////////////////
const [fontsLoaded] = useFonts({
  'FT88-Regular': require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/FT88-Regular.ttf'),
  'FT88-Serif': require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/FT88-Serif.ttf'),
  'Montserrat-Regular' : require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-Light' : require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/Montserrat-Light.ttf'),
  'Montserrat-Medium' : require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/Montserrat-Medium.ttf'),
  'Montserrat-SemiBold' : require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/Montserrat-SemiBold.ttf')
})
//////////////////// END IF STATE COMPONENTS AND VARIABLES /////////////////////////

// Will trigger only once : when opening the app
useEffect(()=>{_retrieveData()},[])
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
      setError('After reviewing every single movie names known to mankind, we cannot provide anything. Please forgive us.')
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
  const findMovie = async (id) => {
    const url= `http://www.omdbapi.com/?i=${id}&apikey=348eb517`
    try {
      const res = await axios.get(url);
      console.log('res', res)
      // if response is true 
      let {Title, Year, Runtime, Genre, Director, Poster} = res.data;
      console.log('res',res.data)
      // trigger addToWatchList
      addToWatchList({title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster})
      if (Poster=='N/A') {
        Poster='/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/onsightblurre-4.png';
        addToWatchList = ({ title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director }) => {
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
        };
      } else {
        addToWatchList = ({ title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster }) => {
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
        };}}catch(error){setError(error.message);}};

  // useEffect(()=>{<WatchList watchList={watchListData} setWatchListData={setWatchListData()}/>},[watchListData])
  // can't passed props to siblings

  // Fonction pour calculer le nombre de films dans la watchList
     const moviesLeft=()=>{return setLengthList(retrievedData.length)}
  // Re-render when number of item change in watchList (permet de changer nombre d'items affichés dans la liste)
    useEffect(()=>{moviesLeft();},[retrievedData])

  // une fois que data est assigné 
  useEffect(()=>{if(data.length>0){_storeData();{/*une fois data ajoutés au component data, je lance la fonction _storeData*/}}},[data])

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
          {results.length>0 && showResult() || <Text style={[styles.header, {fontFamily: 'FT88-Regular', color: 'white', fontSize: 16, lineHeight: 21, paddingLeft:5, paddingRight:5}]}>{error}</Text>}
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
  bottomNavigation: bottomNavigation
})