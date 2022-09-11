import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import deckServices from "./deckServices";

const initialState = {
  deck: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get user goals

export const getDecks = createAsyncThunk(
  "deck/getAll ",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await deckServices.getDecks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new deck

export const createDeck = createAsyncThunk(
  "deck/create",
  async (deckName, thunkAPI) => {
    try {
      // const token  = thunkAPI.getState().auth.user.token
      // console.log(token)

      return await deckServices.createDeck(deckName);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Deletion of deck

export const deleteDeck = createAsyncThunk(
  "deck/delete",
  async (deckId, thunkAPI) => {
    try {
      return await deckServices.deleteDeck(deckId);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateDeck = createAsyncThunk(
  "deck/update",
  async (deckData, id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await deckServices.updateDeck(id, deckData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deckSlice = createSlice({
  name: "deck",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDeck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDeck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deck.decks.push(action.payload);
      })

      .addCase(createDeck.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getDecks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDecks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deck = action.payload;
      })

      .addCase(getDecks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(deleteDeck.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(deleteDeck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.meta.arg);
        state.deck.decks = state.deck.decks.filter(
          (deck) => deck._id !== action.meta.arg
        );
      })

      .addCase(deleteDeck.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(updateDeck.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(updateDeck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.deck = state.deck.map((deck) =>
          deck._id === action.payload._id ? action.payload : deck
        );
      })

      .addCase(updateDeck.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = deckSlice.actions;
export default deckSlice.reducer;
