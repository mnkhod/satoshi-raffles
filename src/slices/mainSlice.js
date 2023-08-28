import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    amount: 1,
  },
  reducers: {
    setTicketAmount: (state, action) => {
      state.amount = action.payload;
    },
  },
});

const accountSlice = createSlice({
  name: "unisat",
  initialState: {
    connected: false,
    address: "",
    addresses: [],
    network: "",
    isOnCorrectNetwork: false,
    inscriptions: {},
  },
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },
    setNetwork: (state, action) => {
      state.network = action.payload;
    },
    setIsOnCorrectNetwork: (state, action) => {
      state.isOnCorrectNetwork = action.payload;
    },
    setInscriptions: (state, action) => {
      state.inscriptions = action.payload;
    },
  },
});

export const { setTicketAmount } = ticketSlice.actions;
export const {
  setConnected,
  setAddress,
  setAddresses,
  setNetwork,
  setInscriptions,
  setIsOnCorrectNetwork,
} = accountSlice.actions;

export const ticketReducer = ticketSlice.reducer;
export const accountReducer = accountSlice.reducer;
