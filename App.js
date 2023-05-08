import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, Button, View, Text,TextInput, Image } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';



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

// L'ensemble des films
const [watchList, setWatchList]= useState([])
// State component for error
const [error, setError]=useState('')
const styles = StyleSheet.create({
  container: {
    flex:1,
    top:30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    height: 40,
    width:'100%', 
    borderColor: 'gray', 
    width:'70%',
    borderWidth: 1  
  },
  text:{
    fontSize:15,
    color:'black',
  },
  button:{
    height: 40,
    width:'100%', 
    borderColor: 'gray', 
    width:'70%',
    borderWidth: 1 , 
    color:'red'
  },
  image:{
    minWidth: 60, 
    minHeight: 60, 
    marginBottom:10,
  }
});

//////////////////// END IF STATE COMPONENTS AND VARIABLES /////////////////////////

//////////////////// FONCTIONS ///////////////////////////////////////////////
// ce qui est input
const handleChange=(value)=>setInput(value);
// ce qui est submit
const handleSubmit=()=>{findMovie(input)};

//Fonctions
const addToWatchList = (movie) => {
const newMovie = {
      title: movie.title,
      year: movie.year,
      runtime: movie.runtime,
      genre: movie.genre,
      director: movie.director,
      poster: movie.poster
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
  console.log('data', data) 
  // console.log(watchList)

  // Fonction pour supprimer un film de la liste  (DELETE)
    const getDeleted =(idx)=>{
      const temp = [...retrievedData]
      temp.splice(idx,1)
      setWatchList([...temp])
    }
    console.log('retrieveData',retrievedData)

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
          <Image style={styles.image} source={{uri: `${movie.poster}`}}/>
        </View>
        <Button onPress={()=> getDeleted(i)} title="delete" color="red" />
      </View>
    }
  ))

  //Fonction pour récupérer les données de l'api à partir du titre inputed
    const findMovie = async (input) => {
      const url= `http://www.omdbapi.com/?t=${input}&apikey=348eb517`
      try {
        const res = await axios.get(url);
        console.log(res)
        // if response is true 
        let {Title, Year, Runtime, Genre, Director, Poster} = res.data;
        console.log(res.data)
        console.log(81,{title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster})
        // Destructure l'objet reçu
        setMovie({title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster});
        addToWatchList({title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, poster: Poster})
      }catch (error) {
       setError(error.message); 
      }
    };

    // Fonction pour calculer le nombre de films dans la watchList
    const moviesLeft=()=>{return setLengthList(watchList.length)}

    // Re-render when number of item change in watchList (permet de changer nombre d'items affichés dans la liste)
    useEffect(()=>{
    // findMovie
    moviesLeft();
    },[watchList])
    console.log("watchList:",watchList)

  return (
<SafeAreaView>
<View>
<Text>Hello,</Text>
<Text>you have{lengthList}films left</Text>
</View>
<TextInput style={styles.input} onChangeText={handleChange} value={input}/>
<View style={styles.button}><Button onPress={handleSubmit} title="Add to watchlist" color="#841584"/></View>

{watchList.length>0 && showFilm()}
</SafeAreaView>
)
}