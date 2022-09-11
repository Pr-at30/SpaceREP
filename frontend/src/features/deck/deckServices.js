import axios from 'axios'

const API_URL ="https://stickmen.herokuapp.com/api/deck"

axios.defaults.withCredentials = true;
// Get all decks 

const getDecks = async(  ) => {
    const config = {
        headers:{
            // Authorization:`Bearer ${token}`
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "https://stickmen.herokuapp.com" ,
            
        }, 
        crendentials: 'include'
        // withCredentials: true
    }

    // console.log(token)

    const response = await axios.get(API_URL  , config)

    return response.data 

}



//creeat new deck 

const createDeck = async(deckName ) => {
    const config = {
        headers:{
            // Authorization:`Bearer ${token}`
            "Content-type" : "application/json",
            "Access-Control-Allow-Origin" : "https://stickmen.herokuapp.com" ,
        }, 
        credentials: 'include'
        // withCredentials: true
    }

    // console.log(token)

    const response = await axios.post(API_URL  + '/upload', deckName, config)

    return response.data.deck 

}


// delete user deck

const deleteDeck = async( deckId ) => {
    const config = {
        headers:{
            // Authorization:`Bearer ${token}`
            "Content-Type" : "application/json",
            
            "Access-Control-Allow-Origin" : "https://stickmen.herokuapp.com" ,
        }, 
        crendentials: 'include'
        // withCredentials: true
    }

    

    const response = await axios.delete(API_URL + "/" + deckId , config)

    return response.data.deck

}

// updation of the deck 


const updateDeck = async(id , deckData , token) =>{
    const config = {
        headers:{
            // Authorization:`Bearer ${token}`
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "https://stickmen.herokuapp.com" ,

        }, 
        crendentials: 'include'
        // withCredentials: true
    }
    const response = axios.patch(API_URL + id ,deckData ,  config )
    return response.data

}



const deckServices ={
    createDeck , getDecks , deleteDeck , updateDeck
}

export default deckServices