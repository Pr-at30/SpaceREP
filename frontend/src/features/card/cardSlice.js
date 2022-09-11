import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cardServices from "./cardServices";

const initialState = {
    card: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}


// Get user goals 

export const getCards = createAsyncThunk('card/getAll ', async (id, deckid, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token


        return await cardServices.getDecks(id, deckid,token)


    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})





// Create new card

export const createCard = createAsyncThunk('card/create', async (cardData, deckid, thunkAPI) => {


    try {
        const deckId = localStorage.getItem("deckId");
        console.log(deckId);
        return await cardServices.createCard(cardData, deckId)
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }



})


// Deletion of card 


export const deleteCard = createAsyncThunk('card/delete', async (id, deckid, thunkAPI) => {


    try {

        const token = thunkAPI.getState().auth.user.token


        return await cardServices.deleteCard(id, deckid, token)


    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }



})

export const updateCard = createAsyncThunk('card/update', async (cardData, id, deckid, thunkAPI) => {


    try {

        const token = thunkAPI.getState().auth.user.token


        return await cardServices.updateCard(id, deckid, cardData, token)


    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        return thunkAPI.rejectWithValue(message)
    }



})





export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCard.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createCard.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.createDeck.push(action.payload)

            })

            .addCase(createCard.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })

            .addCase(getCards.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getCards.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.deck = action.payload

            })

            .addCase(getCards.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })

            .addCase(deleteCard.pending, (state) => {
                state.isLoading = true
            })

            .addCase(deleteCard.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.card = state.card.filter((card) => card._id !== action.payload.id)

            })



            .addCase(deleteCard.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })

            .addCase(updateCard.pending, (state) => {
                state.isLoading = true
            })

            .addCase(updateCard.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.card = state.card.map((card) => card._id === action.payload._id ? action.payload : card)

            })



            .addCase(updateCard.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload

            })

    },
})


export const { reset } = cardSlice.actions
export default cardSlice.reducer

