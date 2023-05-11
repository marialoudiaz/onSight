import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, Button, View, Text,TextInput, Image, Alert, ScrollView, ImageBackground } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {container, searchContainer, header, input, text, button, image, searchbox, resultBlock, addButton, innerShadow, dropShadow, headerBlock, addWLBtn, dropShadowInput, glassComponent} from '../style/style.js';
import {useFonts} from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';


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
  'FT88-Regular': require('../assets/fonts/FT88-Regular.ttf'),
  'FT88-Serif': require('../assets/fonts/FT88-Serif.ttf'),
  'Montserrat-Regular' : require('../assets/fonts/Montserrat-Regular.ttf'),
  'Montserrat-Light' : require('../assets/fonts/Montserrat-Light.ttf'),
  'Montserrat-Medium' : require('../assets/fonts/Montserrat-Medium.ttf'),
  'Montserrat-SemiBold' : require('../assets/fonts/Montserrat-SemiBold.ttf')
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
     results.map((result,i)=>{
        return <View key={i} style={styles.image}>
            <ImageBackground  style={styles.resultBlock} imageStyle={{borderRadius: 40, opacity: 0.3, borderColor: 'lightgrey', borderWidth: 3}} source={{uri:`${result.Poster}`}}>
            <View style={styles.headerBlock}>
              {fontsLoaded&&<Text style={{fontFamily: 'Montserrat-Regular', color: 'white', fontSize: 18}}>{result.Title}</Text>}
              {fontsLoaded&&<Text style={{fontFamily: 'Montserrat-Regular', color: 'white', fontSize: 10}}>{result.Type}</Text>}
              {fontsLoaded&&<Text style={{fontFamily: 'Montserrat-Regular', color: 'white', fontSize: 9}}>{result.Year}</Text>}
              </View>
              <View style={[styles.addButtonSearch, styles.dropShadow]}><Button onPress={()=>handleSubmit(result.Title)} title="+" color="grey"/></View>
            </ImageBackground>
        </View>})
  }

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
    console.log('setData', setData([...data, newMovie]))
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
  const showFilm=()=>(
     retrievedData.map((movie,i)=>{
      {/*DISPLAY DOTS IF TOO LONG*/}
      const truncatedDirector = movie.director.length > 15 ? movie.director.substring(0, 10) + "..." : movie.director;
      const truncatedTitle = movie.title.length > 15 ? movie.title.substring(0, 10) + "..." : movie.title;
      return <View key={i}>
        <ImageBackground  style={[styles.resultBlockWatch]} imageStyle={{borderRadius: 40, opacity: 0.3, borderColor: 'lightgrey', borderWidth: 3}} source={{uri:`${movie.poster}`}}>
        <View style={[styles.headerBlock]}>
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
        <View style={[styles.addButtonWL, styles.dropShadow]}><Button onPress={()=> triggerAlert(i)} title="x" color='grey'/></View>
        </ImageBackground>
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
    <LinearGradient colors={['#192b87', '#5dbdf5']} style={styles.container}>
    <SafeAreaView>
        <View>
          {fontsLoaded &&<Text style={{fontFamily: 'FT88-Regular', fontSize: 50, paddingTop: 10, paddingRight: 10, marginTop: 10, marginLeft:20, color:'white'}}>Hello,</Text>}          
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
          {retrievedData.length>0 && <Text style={[styles.header, {fontFamily: 'FT88-Serif', color: 'white'}]}>My watchlist</Text>}  
          {retrievedData.length>0 && showFilm()}
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
  headerBlock: headerBlock,
  addWLBtn:addWLBtn,
  dropShadowInput:dropShadowInput,
  addButtonInput: {...addButton, right:55},
  addButtonSearch: {...addButton, right: 50, bottom:2, },
  addButtonWL: {...addButton, right: 50, bottom:43, height: 22, width: 22, borderWidth: 3, borderColor:'#5072A7' },
  glassComponent: glassComponent,
  resultBlockWatch: {...resultBlock, flex:1}
})