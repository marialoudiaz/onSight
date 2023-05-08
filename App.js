import React, {useState, useEffect} from 'react'
import {StyleSheet, SafeAreaView, Button, View, Text,TextInput } from 'react-native'
import axios from 'axios'

export default function App(){
//length of watchList
const [lengthList, setLengthList]=useState(0)



// Les données de l'api
const [movie, setMovie]= useState({movie:'',title:'',year:'',runtime:'',genre:'',director:''})
// L'ensemble des films
const [watchList, setWatchList]= useState([])
// State component for error
const [error, setError]=useState('')
// const [isReady, setIsReady]= useState(false);
// const [loading, setLoading]= useState(false);

// ce qui est input
const handleChange=(value)=>setMovie({...movie, movie: value});
// ce qui est submit
const handleSubmit=()=>{findMovie(movie.movie)};

//Fonctions
const addToWatchList = (m) => {
  console.log("movie:  ",movie)
const newMovie = {
      title: m.title,
      year: m.year,
      runtime: m.runtime,
      genre: m.genre,
      director: m.director
    };
    setWatchList([...watchList, newMovie]);
    setMovie({
      movie:'',
      title:'',
      year:'',
      runtime:'',
      genre:'',
      director:''
    });
  };

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
        </View>
        {/* <Text style={styles.text} color="red"> {film} </Text> */}
        {/* <DeleteOutlined/> */}
        <Button onPress={()=> getDeleted(i)} title="delete" color="red" />
      </View>
    }
  ))


  //Fonction pour récupérer les données de l'api à partir du titre inputed
    const findMovie = async (movie) => {
      const url= `http://www.omdbapi.com/?t=${movie}&apikey=348eb517`
      // const url = `http://www.omdbapi.com/?i=${movie}&apikey=348eb517`
      console.log(url)
      try {
        const res = await axios.get(url);
        console.log(res)
        // if response is true 
        let {Title, Year, Runtime, Genre, Director} = res.data;
        console.log(res.data)
        console.log(81,{title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, movie:''})
        // Destructure l'objet reçu
        setMovie({title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, movie:''});
        addToWatchList({title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, movie:''})
        // setIsReady(true); setError(Error);
      }catch (error) {
       setError(error.message); 
      //  setIsReady(true);
      }
    };

    // Fonction pour calculer le nombre de films dans la watchList
    const moviesLeft=()=>{return setLengthList(watchList.length) }

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
<TextInput style={styles.input} onChangeText={handleChange}  value={movie.movie}/>
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
});