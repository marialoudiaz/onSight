import React, {useState, useEffect} from 'react'
import { TextInput } from 'react-native-paper';
import {StyleSheet, SafeAreaView, Button, View, Text } from 'react-native'
import axios from 'axios';



export default function App(){

  //length of watchList
  const [lengthList, setLengthList]=useState(0)

  // Les données de l'api
  const [movie, setMovie]= useState({
    title:'',
    year:'',
    runtime:'',
    genre:'',
    director:''
  })

  // L'ensemble des films
  const [watchList, setWatchList]= useState([])
  // State component for error
  const [error, setError]=useState('')
  const [isReady, setIsReady]= useState(false);
  const [loading, setLoading]= useState(false);
  

  /////////////////////////// A VERIFIER ////////////////////////////////////////////////////
  // ce qui est input
  const handleChange =(value)=> setMovie({...movie, movie: value});
  // ce qui est submit
  const handleSubmit = ()=> {setLoading(true); findMovie(movie.movie); };
  


  //////////////////////////  FONCTIONS ////////////////////////// 
  const addToWatchList = () => {
    const newMovie = {
      title: movie.title,
      year: movie.year,
      runtime: movie.runtime,
      genre: movie.genre,
      director: movie.director
    };
    setWatchList([...watchList, newMovie]);
    setMovie({
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
        <View style={styles.text}>{film.title}</View>
        <View style={styles.text}>{film.year}</View>
        <View style={styles.text}>{film.runtime}</View>
        <View style={styles.text}>{film.genre}</View>
        <View style={styles.text}>{film.director}</View>
        {/* <Text style={styles.text} color="red"> {film} </Text> */}
        {/* <DeleteOutlined/> */}
        <Button onPress={()=> getDeleted(i)} title="film watched" color="red" />
      </View>
    }
  ))


  //Fonction pour récupérer les données de l'api à partir du titre inputed
    const findMovie = async (movie) => {
      const url = `https://omdbapi.com?t=${movie}&apikey=thewdb`
      try {
        const res = await axios.get(url);
        // if response is true 
        let {Title, Year, Runtime, Genre, Director} = res.data;
        // Destructure l'objet recu
        setMovie({title: Title, year: Year, runtime: Runtime, genre: Genre, director: Director, movie:''});
        addToWatchList()
        setIsReady(true); setError(Error);
      } // fetchMovieDetails(imdb_id);
       catch (error) {
       setError(error.message); setIsReady(true);
      }
    };

    // Fonction pour calculer le nombre de films dans la watchList
    const moviesLeft=()=>{return setLengthList(watchList.length) }


    // Re-render when number of item change in watchList (permet de changer nombre d'items affichés dans la liste)
    useEffect(()=>{
      // findMovie(movie)
      moviesLeft()
    },[watchList])




  return (
    <SafeAreaView>
      {/* File rendering all the movies added */}
      <View>
        <Text>Hello,</Text><Text>you have {lengthList} films left</Text> 
      </View>

      <View> <TextInput onChangeText={handleChange}  value={movie.movie}/> </View>
      <View style={styles.button}> <Button onPress={handleSubmit} title="Add to watchlist" color='#841584'/> </View>

      {/*Display all the movies stored in watchList */}
      {watchList.length >0 && showFilm()}
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















{/* <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="AddFilm" component={AddFilm} />
      </Stack.Navigator>
      </NavigationContainer> */}

      // // Navigate to AddFilm
// const addFilm =()=>{
//   navigation.navigate("AddFilm")}
  
// }

{/* <AddFilm item={addToList} input={input}/> */}

      {/* // The movies added to watchList */}
      {/* {watchList && watchList.map((watchList, index)=>( 
        <Item id={index} item={watchList} deleted={getDeleted}/> 
      ))}  */}

      {/* Button to add a new movie */}
      {/* <Button title="+" onPress={addFilm} /> */}

      {/* BOTTOM NAVIGATION - List of movies / Add a movie */}