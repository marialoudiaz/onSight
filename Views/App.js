import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, Button, View, Text,TextInput, Image, Alert, ScrollView } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {container, searchContainer, resultsContainer, input, text, button, image, alert, searchbox, results, result, addButton, innerShadow, dropShadow} from '../style/style.js';
import {useFonts} from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as Font from 'expo-font';
import InsetShadow from "react-native-inset-shadow";



export default function App(){
//////////////////// USE OF ASYNCSTORAGE /////////////////////////
// the data to store (items)
const [data, setData]=useState([])
const [retrievedData, setRetrievedData]=useState([])

// send each item created to the storage
const _storeData = async () => {
  try {
    // we need to stringify our array into a string
    await AsyncStorage.setItem('item', JSON.stringify(data) );
  } catch (error){
  }
};
// Once put, retrieve them and display them
const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('item');
    let bringBackToArray= JSON.parse(value)
    setRetrievedData(bringBackToArray)
// now we have data restored from asyncStorage parsed back into an array which we can use
} catch (error) {
}
};
//////////////////// END OF ASYNCSTORAGE /////////////////////////


//////////////////// STATE COMPONENTS AND VARIABLES /////////////////////////
//length of watchList
const [lengthList, setLengthList]=useState(0)
// Les données de l'api
const [movie, setMovie]= useState({title:'',year:'',runtime:'',genre:'',director:'', poster:''})
//state component pour l'input
const [input, setInput]=useState('')
// State component for error
const [error, setError]=useState('')
const [s, setS] = useState(''); 
const [results, setResults] = useState([]); 
const myAlert =(i)=>{
  Alert.alert('Reset Data','Are you sure you want to delete this movie from the list ?',
    [{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, {text: 'OK', onPress: () => getDeleted(i) },],{cancelable: false})
}

///////////////////// TYPOS ///////////////////////////////////////
const [fontsLoaded] = useFonts({
  'FT88-Regular': require('../assets/fonts/FT88-Regular.ttf')
}) 
//L'ensemble des films
// const [watchList, setWatchList]= useState([])
//////////////////// END IF STATE COMPONENTS AND VARIABLES /////////////////////////

//////////////////// FONCTIONS ///////////////////////////////////////////////
// // ce qui est input
// const handleChange=(value)=>setInput(value);
/////////////////////////////////// FOR SEARCH ///////////////////////////////////////
const searchFilm = (s) => {
  console.log('s',s)  
  const url= `http://www.omdbapi.com/?s=${s}&apikey=348eb517`;
  axios(url).then(({ data }) => {
    console.log('data',data)
    if (!data.Response){
      setError('Movie not found')
    } else{
      // chaque object.search envoyé dans setResults en tant qu'object 
      console.log('data Search', data.Search)
      // Change l'état de results à l'array des recherches trouvées
      let newResults = data.Search
      setResults(newResults); 
    }
  }); 
}; 
console.log('results array', results)

const showResult=()=>{
  console.log('results passed to showResult', results)
 
  return results.map((result,i) => (
    <View key={i} style={[styles.result, styles.text]}> 
        <Text>{result.Title}</Text> 
        <Text>{result.Year}</Text> 
        <Text>{result.Type}</Text> 
        <Image style={styles.image} source={{uri:`${result.Poster}`}} resizeMode="cover" /> 
        <View style={styles.button}><Button onPress={()=>handleSubmit(result.Title)} title="Add to watchlist" color="#841584"/></View>
    </View>
    ))} 

// ce qui est submit
const handleSubmit=(title)=>{
  console.log('title',title)
  setInput(title);
  setResults([])
  findMovie(title)
};
/////////////////////////////////// FOR WATCHLIST ///////////////////////////////////////

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
    setMovie({
      title:'',
      year:'',
      runtime:'',
      genre:'',
      director:'',
      poster:''
    });
    _storeData(); // une fois data ajoutés au component data, je lance la fonction _storeData
    _retrieveData()
  };
 
  // Fonction pour supprimer un film de la liste  (DELETE)
    const triggerAlert=(i)=>{myAlert(i)}  
    const getDeleted =(i)=>{
      const temp = [...retrievedData]
      temp.splice(i,1)
      setRetrievedData([...temp])
    }

  // Fonction pour afficher les films (DISPLAY)
  const showFilm =()=>(
    retrievedData.map((movie,i)=>{
      return <View key={i}>
        <View style={styles.text}>
          <Text>{movie.title}</Text>
          <Text>{movie.year}</Text>
          <Text>{movie.runtime}</Text>
          <Text>{movie.genre}</Text>
          <Text>{movie.director}</Text>
          <Image style={styles.image} source={{uri:`${movie.poster}`}}/>
        </View>
        <Button onPress={()=> triggerAlert(i)} title="delete" style={styles.text} />
        <View style={styles.alert}></View>
      </View>
    }
  ))

  //Fonction pour récupérer les données de l'api à partir du titre inputed
    const findMovie = async (title) => {
      const url= `http://www.omdbapi.com/?t=${title}&apikey=348eb517`
      try {
        const res = await axios.get(url);
        console.log(res)
        // if response is true 
        let {Title, Year, Runtime, Genre, Director, Poster} = res.data;
        console.log(res.data)
        console.log(81,{title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster})
        // Destructure l'objet reçu
        setMovie({title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster});
        // trigger addToWatchList
        addToWatchList({title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster})
      }catch (error) {
       setError(error.message); 
      }
    };

  // Fonction pour calculer le nombre de films dans la watchList
     const moviesLeft=()=>{return setLengthList(retrievedData.length)}

  // Re-render when number of item change in watchList (permet de changer nombre d'items affichés dans la liste)
    useEffect(()=>{
  // findMovie
    moviesLeft();
    },[retrievedData])

////////////////////////////////////////// FOR RETURN //////////////////////////////////////////

  return (
    <LinearGradient colors={['#b2deff', '#eaf6ff']} style={styles.container}>
    <SafeAreaView>
        <View>
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 30, paddingTop: 10, paddingRight: 10, marginTop: 10, marginLeft:20, color:'white'}}>Hello,</Text>}          
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 20, paddingTop: 10, paddingBottom:10, marginBottom: 10, marginLeft:20,color:'white'}}>you have {lengthList} films to see</Text>}
        </View>
        {/* <TextInput style={styles.input} onChangeText={handleChange} value={input}/> */}
        <View  style={styles.searchContainer}>
            <TextInput style={styles.searchbox} value={s} placeholder="search for a movie" onChangeText={(text) => setS(text)}/>
            <View style={[styles.addButton, styles.dropShadow]}><Button onPress={()=>searchFilm(s)} title="+" color="grey"/></View>
        </View>
        {/* The suggestion from search + Triggered quand results a des items */}
        <View style={styles.resultsContainer}>
          <ScrollView style={styles.results}>
            {results.length>0 && showResult()}
          </ScrollView>
          <ScrollView style={styles.results}>
          {retrievedData.length>0 && showFilm()}
          </ScrollView>
        </View>
    </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: container, 
  input: input, 
  text: text, 
  button: button, 
  image: image,
  alert: alert, 
  searchbox: searchbox, 
  results: results, 
  result: result,
  searchContainer: searchContainer,
  resultsContainer: resultsContainer,
  addButton:addButton,
  innerShadow:innerShadow,
  dropShadow: dropShadow
})