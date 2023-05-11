// const { color } = require("@rneui/themed/dist/config")

 const container= {
  flex:1
  }

  text={
    fontSize:15,
    color:'black',
    backgroundColor: 'rgba(255,255,255,0.8)'
  }

  image={
    borderRadius:50
  }

  alert={
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'red',
  }

  input={
    height: 40,
    width:'100%', 
    borderColor: 'gray', 
    width:'70%',
    borderWidth: 1  
  }
  ////////////////////////////////////////////// SEARCHBOX ////////////////////////////////////////////////

  searchContainer={
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginLeft: 10,
    marginBottom: 30,
    paddingLeft: 25,
    paddingRight: 10
  }

  searchbox={
    fontSize: 15,
    padding:20,
    width:'100%',
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 30,
  }
  dropShadow= {
    shadowColor: '#171717',
    shadowOffset: {width: -0.5, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },

  innerShadow={
    shadowColor: '#171717',
    shadowRadius:20
  }

  ////////////////////////////////////////////// BUTTONS ////////////////////////////////////////////////

  button={
    height: 40,
    width:'100%', 
    borderColor: 'gray', 
    width:'70%',
    borderWidth: 1 ,
    borderRadius: 20,
    backgroundColor: 'white'
  }
  
  addButton={
  borderRadius: 80,
  backgroundColor: 'white',
  height: 40,
  width: 40,
  right: 55
  }

  addWLBtn={
  borderRadius: 80,
  backgroundColor: 'black',
  height: 40,
  width: 40
  }

  ////////////////////////////////////////////// BLOCKS ////////////////////////////////////////////////

  resultView={
    color:'white'
  }
  
  resultBlock={
    flexDirection: 'row',
    width: '95%', 
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 9,
    paddingTop:10,
    paddingBottom: 10,
    borderRadius: 40,
  }

  headerBlock={
    alignItems: 'flex-start',
  }

  


module.exports={
  container, 
  input, 
  text, 
  button, 
  image,
  alert, 
  searchbox, 
  resultView, 
  resultBlock,
  searchContainer,
  addButton,
  innerShadow,
  dropShadow,
  addWLBtn
  }