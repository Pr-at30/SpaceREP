import axios from 'axios'

const API_URL ="https://stickmen.herokuapp.com/api/card/"

axios.defaults.withCredentials = true;
// Get all decks 

const getCards = async( id , deckid , token ) => {
    const config = {
        headers:{
            // Authorization:`Bearer ${token}`
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "https://stickmen.herokuapp.com" ,

        }, 
        crendentials: 'include'
        // withCredentials: true
    }

    

    const response = await axios.post(API_URL + "/" + deckid + "/" + id , config,{
        withCredentials: true
    })

    return response.data 

}



//creeat new deck 

const createCard = async( cardData, deckid ) => {
    const config = {
        headers:{
            // Authorization:`Bearer ${token}`
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "https://stickmen.herokuapp.com" ,

        }, 
        crendentials: 'include'
        // withCredentials: true
    }
   

    const response = await axios.post(API_URL + "/upload/" + deckid, cardData, config)
    console.log(response)

    return response.data 
}


// delete user deck

const deleteCard = async(deckid , id , token ) => {
   
        const config = {
            headers:{
                // Authorization:`Bearer ${token}`
                "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "https://stickmen.herokuapp.com" ,

            }, 
            crendentials: 'include'
            // withCredentials: true
        }
    

    const response = await axios.delete(API_URL + `${deckid}` +`/${id}`  , config)

    return response.data 

}

// updation of the deck 


const updateCard = async(id, deckid , cardData , token) =>{
    const config = {
        headers:{
            // Authorization:`Bearer ${token}`
            "Content-Type" : "application/json",
            "Access-Control-Allow-Origin" : "https://stickmen.herokuapp.com" ,

        }, 
        crendentials: 'include'
        // withCredentials: true
    }
    const response = axios.patch(API_URL + `${deckid}` +`/${id}` ,cardData ,  config )
    return response.data

}



const cardServices ={
    createCard , getCards , deleteCard , updateCard
}

export default cardServices