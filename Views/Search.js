import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, Button, View, Text,TextInput, Image, Alert, ScrollView, ImageBackground } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {container, searchContainer, header, headerinput, text, button, image, searchbox, resultBlock, addButton, innerShadow, dropShadow, addWLBtn, dropShadowInput, glassComponent, bottomNavigation} from '../style/style.js';
import {useFonts} from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/FontAwesome'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import WatchList from './WatchList'



export default function Search(){
//////////////////// USE OF ASYNCSTORAGE /////////////////////////
// the data to store (items)
const [data, setData]=useState([])
const [retrievedData, setRetrievedData]=useState([])
const [watchListData, setWatchListData] = useState([]);
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
} catch (error) {
}
};
//////////////////// END OF ASYNCSTORAGE /////////////////////////

//////////////////// STATE COMPONENTS AND VARIABLES /////////////////////////
//length of watchList
const [lengthList, setLengthList]=useState(0)
const [error, setError]=useState('')
const [s, setS] = useState(''); 
const [results, setResults] = useState([]); 
///////////////////// TYPOS ///////////////////////////////////////
const [fontsLoaded] = useFonts({
  'FT88-Regular': require('../assets/fonts/FT88-Regular.ttf'),
  'FT88-Serif': require('../assets/fonts/FT88-Serif.ttf'),
  'Montserrat-Regular' : require('../assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-Light' : require('../assets/fonts/Montserrat-Light.ttf'),
  'Montserrat-Medium' : require('../assets/fonts/Montserrat-Medium.ttf'),
  'Montserrat-SemiBold' : require('../assets/fonts/Montserrat-SemiBold.ttf')
}) 
//////////////////// END IF STATE COMPONENTS AND VARIABLES /////////////////////////

// Will trigger only once : when opening the app
useEffect(()=>{_retrieveData()},[])
/////////////////////////////////// FOR SEARCH ///////////////////////////////////////
const searchFilm = (s) => {
  console.log('s',s)  
  const url= `http://www.omdbapi.com/?s=${s}&apikey=348eb517`;
  axios(url).then(({ data }) => {
    console.log('data',data)
    if (data.Response==="True"){
      // chaque object.search envoyé dans setResults en tant qu'object 
      console.log('data Search', data.Search)
    //   // Change l'état de results à l'array des recherches trouvées
      let newResults = data.Search
      setResults(newResults); 
    } else{
       setError('Movie not found')
    }
  }); 
}; 
console.log('results array', results)

const showResult=()=>{
    console.log('results passed to showResult', results)
     return results.map((result,i)=>{
        return (
        <View key={i} style={styles.image}>
            <ImageBackground  style={styles.resultBlockSearch} imageStyle={{borderRadius: 40, opacity: 0.3, borderColor: 'lightgrey', borderWidth: 3}} source={{uri:`${result.Poster}`}}>
            <View style={styles.headerBlock}>
              {fontsLoaded&&<Text style={{fontFamily: 'Montserrat-Regular', color: 'white', fontSize: 18}}>{result.Title}</Text>}
              {fontsLoaded&&<Text style={{fontFamily: 'Montserrat-Regular', color: 'white', fontSize: 10, padding:2}}>{result.Type}</Text>}
              {fontsLoaded&&<Text style={{fontFamily: 'Montserrat-Regular', color: 'white', fontSize: 9, padding:2}}>{result.Year}</Text>}
              </View>
              <View style={[styles.addButtonSearch, styles.dropShadow]}><Button onPress={()=>handleSubmit(result.imdbID)} title="+" color="grey"/></View>
            </ImageBackground>
        </View>
        )
      })
  }

  // ce qui est submit
  const handleSubmit=(id)=>{
    setResults([])
    findMovie(id)
  };

  /////////////////////////////////// FOR WATCHLIST ///////////////////////////////////////
  //Fonction pour récupérer les données de l'api à partir du titre inputed
  const findMovie = async (id) => {
    const url= `http://www.omdbapi.com/?i=${id}&apikey=348eb517`
    try {
      const res = await axios.get(url);
      console.log('res',res)
      // if response is true 
      let {Title, Year, Runtime, Genre, Director, Poster} = res.data;
      console.log(res.data)
      console.log(81,{title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster})
      // trigger addToWatchList
      addToWatchList({title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster})
    }catch (error) {
    setError(error.message); 
    }
  };

  const addToWatchList = ({title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster}) => {
    const newMovie = {
          title: Title,
          year: Year,
          runtime: Runtime,
          genre: Genre,
          director: Director,
          poster: Poster
        };
        setData([...data, newMovie]); // au lieu de watchList
        setWatchListData([...watchListData, newMovie]);
  };
  console.log('data in search', data)
  console.log('watchLisdata',watchListData)

{  useEffect(()=>{
  <WatchList watchList={watchListData} setWatchListData={setWatchListData()}/>
  {console.log('watchlistpassed',watchListData)}
  {console.log('setWatchpassed',setWatchListData())}
}, [watchListData])
  
}


  // Fonction pour calculer le nombre de films dans la watchList
     const moviesLeft=()=>{return setLengthList(retrievedData.length)}
  // Re-render when number of item change in watchList (permet de changer nombre d'items affichés dans la liste)
    useEffect(()=>{moviesLeft();},[retrievedData])

  // une fois que data est assigné 
  useEffect(()=>{
    if(data.length > 0){
      _storeData(); // une fois data ajoutés au component data, je lance la fonction _storeData
      // _retrieveData()
  }},[data])



////////////////////////////////////////// FOR RETURN //////////////////////////////////////////

  return ( 
  <LinearGradient colors={['#192b87', '#5dbdf5']} style={styles.container}>
    <SafeAreaView>
        <View>
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 50, paddingTop: 10, paddingRight: 10, marginTop: 20, marginLeft:20, color:'white'}}>Hello,</Text>}          
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 15, paddingTop: 10, paddingBottom:10, marginBottom: 10, marginLeft:20,color:'white'}}>{ lengthList<=1 ? `you have ${lengthList} film to watch` : `you have ${lengthList} films to watch` }</Text>}
        </View>
        <View  style={styles.searchContainer}>
        {fontsLoaded && <TextInput style={[styles.searchbox, styles.dropShadowInput, { fontFamily: 'Montserrat-Light' }]} value={s} placeholder="search for a movie" onChangeText={(text) => setS(text)}/>}
        <View style={[styles.addButtonInput, styles.dropShadow]}><Button onPress={()=>searchFilm(s)} title="+" color="grey"/></View>
        </View>
        {/* The suggestion from search + Triggered quand results a des items */}
          <ScrollView>
          {results.length>0 && <Text style={[styles.header, {fontFamily: 'FT88-Serif', color: 'white'}]}>Matched results</Text>}  
          {results.length>0 && showResult()}
          {/* {data.length>0 && <Text style={[styles.header, {fontFamily: 'FT88-Serif', color: 'white'}]}>My watchlist</Text>}  
          {data.length>0 && showFilm()} */}
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