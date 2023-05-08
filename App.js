import React, {useState} from 'react'
import { TextInput } from 'react-native-paper';
import {StyleSheet, SafeAreaView, Button, View, Text } from 'react-native'

// import AsyncStorage from '@react-native-async-storage/async-storage'; // equivalent du localStorage
import axios from "axios";
// import { DeleteOutlined } from '@ant-design/icons';

export default function App(){

  // // Le film que j'input
  const [input, setInput]= useState('') // ou objet selon ce que j'amène de l'api
  // L'ensemble des films
  const [watchList, setWatchList]= useState([])
  // Les données de l'api
  const axios =require('axios');
  const [state, setState]= useState({
    title:'',
    year:'',
    director:'',
    length:'',
  })
  const [error, setError]=useState('')

  //Variable for title
  const options = {
    method: 'GET',
    url: 'https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids',
    params: {
      idsList: 'tt0001702,tt0001856,tt0001857'
    },
    headers: {
      'X-RapidAPI-Key': 'f96d605029msh7be90c57aea792ap1ce7c1jsne79eaf074699',
      'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
    }
  };

  // Variable for year

  
  //////////////////////////  FONCTIONS ////////////////////////// 
  // Fonction pour ajouter de nouveaux films (CREATE)
  const addToList =()=>{
    const temp = [...watchList]
    temp.push({input})
    setWatchList([...temp])
    // Remet a zero pour prochaine input
    setInput('')
  }
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
        <View style={styles.text}>{film.director}</View>
        <View style={styles.text}>{film.length}</View>
        {/* <Text style={styles.text} color="red"> {film} </Text> */}

        {/* <DeleteOutlined/> */}
        <Button onPress={()=> getDeleted(i)} title="film watched" color="red" />
      </View>
    }
  ))

  //Fonction pour récupérer les données de l'api
  const findMovie = input =>{
    //URL API
    let url = `${input}`;

    axios
      .get(url)
      .then((res)=>{
        debugger
        let {Title, Year, Director, Length} = res.data;
        setState({title: Title, year: Year, director: Director,length:Length});
     })
      .catch((error) => {
        debugger
        console.log(error)
        setError(error.message)
      });
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }

    // Prend chaque input - trouver comment passer n'importe quel inpur
    useEffect(()=>{
      findMovie(input)
    },[])

  return (
    <SafeAreaView>
      {/* File rendering all the movies added */}
      <View>
        <Text>Hello,</Text>
        <Text>you have films left</Text> 
         {/* recupérer nombre de films de la liste total (length of watchList) */}
      </View>

    {/* The input field */}
      <View>
        <TextInput onChangeText={(input)=> setInput(input)}  value={input}/>
      </View>

      <View style={styles.button}>
      
      <Button onPress={addToList} title="Add to watchlist" color='#841584'/>
      {console.log(watchList)} 
      </View>


      {/*Display all the movies */}
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