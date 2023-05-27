import { BottomNavigation} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React, {useState, useEffect} from 'react'
import {useFonts} from 'expo-font';
import SearchComponent from './Views/Search';
import WatchListComponent from './Views/WatchList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // 1 - fonction Retrieve Data appellée = watchLisData updatée
  const [watchListData, setWatchListData] = useState([]);
  //state inside App.js pass via props from App.js to WatchList.js
  // will be updated via in Serach and WatchList

  const [fontsLoaded] = useFonts({
    'FT88-Regular': require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/FT88-Regular.ttf'),
    'FT88-Serif': require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/FT88-Serif.ttf'),
    'Montserrat-Regular' : require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/Montserrat-Regular.ttf'),
    'Montserrat-Light' : require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/Montserrat-Light.ttf'),
    'Montserrat-Medium' : require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/Montserrat-Medium.ttf'),
    'Montserrat-SemiBold' : require('/Users/mariadiaz/Documents/BCS/ReactNative/myfirstapp/assets/fonts/Montserrat-SemiBold.ttf')
  })
//////////////////// USE OF ASYNCSTORAGE /////////////////////////
// // the data to store (items)
  const [data, setData]=useState([])
  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('item', jsonValue)
      // const set = await AsyncStorage.setItem('item', JSON.stringify(value) );// we need to stringify our array into a string
    } catch (error){
    }
  };

// Quand je loade l'app je checke tout ce qu'il ya dans l'AsyncStorage
// Once put, retrieve them and display them
  const retrieveData = async()=>{
    try {
      const value = await AsyncStorage.getItem('item') || [];// Or set to empty array for when user is new (no data to retrieve then)
      let bringBackToArray= JSON.parse(value)
      setWatchListData(bringBackToArray)
  // now we have data restored from asyncStorage parsed back into an array which we can use
    } catch (error) {
    }
  };
//////////////////// END OF ASYNCSTORAGE /////////////////////////
// Quand je load l'app : je recupere contenu de l'AS
  useEffect(()=>{retrieveData()},[])
// a chaque fois que watchListData change (storeData est appelée)
  useEffect(()=>{storeData(watchListData)},[watchListData])

//////////////////// NAVIGATION /////////////////////////
// defining routes with components to be rendered
// Passe en props watchListData (updaté de AS) + fonts + storeData(add+delete in both components)
  const SearchRoute=()=> <SearchComponent storeData={storeData} fontsLoaded={fontsLoaded} watchListData={watchListData} setWatchListData={setWatchListData} />
  const WatchListRoute=()=> <WatchListComponent storeData={storeData} fontsLoaded={fontsLoaded} watchListData={watchListData} setWatchListData={setWatchListData}/>
  // state with active route and labels/icons for routes
  const [state, setState]=useState({index:0,routes:[{key:'loupe', title:'search', focusedIcon:'magnify-plus', unfocusedIcon: 'magnify-plus-outline'},{key:'coeur', title:'watchlist', focusedIcon:'cards-heart', unfocusedIcon: 'cards-heart-outline'}]})
  // update route index
  handleIndexChange = (index)=> setState({...state, index});
  //linking keys from state to routes
  const renderScene = BottomNavigation.SceneMap({loupe: SearchRoute, coeur: WatchListRoute,});

  useEffect(()=>{handleIndexChange(0);},[]);
  // Set initial index to 0 for SearchRoute
   
return (
    <SafeAreaProvider>
      <BottomNavigation navigationState={state} onIndexChange={handleIndexChange} renderScene={renderScene}/>
    </SafeAreaProvider>
    )
}
export default App
