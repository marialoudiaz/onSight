import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, Button, View, Text,TextInput, Image } from 'react-native'
import axios from 'axios'

export default function App(){
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

/////// FONCTIONS /////
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
    setWatchList([...watchList, newMovie]);
    setMovie({
      title:'',
      year:'',
      runtime:'',
      genre:'',
      director:'',
      poster:''
    });
  };

  console.log(watchList)

  // Fonction pour supprimer un film de la liste  (DELETE)
    const getDeleted =(idx)=>{
      const temp = [...watchList]
      temp.splice(idx,1)
      setWatchList([...temp])
    }
  

  // Fonction pour afficher les films (DISPLAY)
  const showFilm =()=>(
    watchList.map((film,i)=>{
      return <View key={i}>
        <View style={styles.text}>
          <Text>{film.title}</Text>
          <Text>{film.year}</Text>
          <Text>{film.runtime}</Text>
          <Text>{film.genre}</Text>
          <Text>{film.director}</Text>
          <Image style={styles.image} source={{uri: `${film.poster}`}}/>
          {/* "https://m.media-amazon.com/images/M/MV5BYWQwMDNkM2MtODU4OS00OTY3LTgwOTItNjE2Yzc0MzRkMDllXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg" */}

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
    // findMovie(movie)
    moviesLeft()
    },[watchList])
    console.log("watchList: ",watchList)

  return (
<SafeAreaView>
<View>
<Text>Hello,</Text>
<Text>you have{lengthList}films left</Text>
</View>
<TextInput style={styles.input} onChangeText={handleChange}  value={input}/>
<View style={styles.button}><Button onPress={handleSubmit} title="Add to watchlist" color="#841584"/></View>

{watchList.length>0 && showFilm()}
</SafeAreaView>
)
}


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