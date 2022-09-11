import axios from "axios";

const API = axios.create({ baseURL: "https://stickmen.herokuapp.com" });


API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
   
    return req;
  });

  

// export const signin = (formValue) => API.post("/api/auth/login", formValue);

export const signin = (formValue) => API.post("/api/auth/login", formValue);

export const signup = (formValue) => API.post("/api/auth/register", formValue);

export const deleteDeck = (id) => API.delete(`/api/deck/${id}`);

export const createDeck = (formValue) => API.post(`/api/deck/upload`, formValue);

export const fetchDeck = () => API.get(`/api/deck`);

export const updateDeck = (id, formValue) =>API.patch(`/api/deck/${id}`, formValue);

export const deleteCard = (deckId , id) => API.delete(`/api/card/${deckId}/${id}`);

export const createCard = (formValue) => API.post(`/api/card/upload/:id`, formValue);

export const fetchCard = (id , deckId) => API.delete(`/api/card/${deckId}/${id}`);

export const updateCard = (id,deckId ,  formValue) => API.delete(`/api/card/${deckId}/${id}`, formValue);
