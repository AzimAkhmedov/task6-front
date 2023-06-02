import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { IMessage, IState } from "../../types/types"
import axios from "axios"
const initialState: IState = {
    isAuth: false,
    messagesGot: [],
    messagesSend: [],
    username: "",
    loader: true
}

export const getMessages = createAsyncThunk('getMessages', async (username: string) => {
    const res = await axios.get('https://task6-2pw0.onrender.com/' + username)
    return res.data
})

export const getSendedMessages = createAsyncThunk('getSendedMessages', async (username: string) => {
    const res = await axios.get('https://task6-2pw0.onrender.com/' + username)
    return res.data
})
export const sendMessage = createAsyncThunk('sendMessage', async (message: IMessage) => {
    const res = await axios.post('https://task6-2pw0.onrender.com/', message)
    return res.data
})
const slice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setUsername(state, action) {
            state.username = action.payload
            state.isAuth = true
        }

    }, extraReducers: (builder) => {
        builder.addCase(getMessages.fulfilled, (state, action) => {
            state.messagesGot = action.payload
            state.loader = false
        })
        builder.addCase(getSendedMessages.fulfilled, (state, action) => {
            state.messagesSend = action.payload
            state.loader = false
        })
    }
})

export const { setUsername } = slice.actions
export default slice.reducer