import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { IUser } from '../../models/IUser'

export const fetchUsers = createAsyncThunk(
  'user/ferchAll', // Название фанка
  async (_, thunkAPI) => {
    //Колбек для выполнения запроса
    const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
    return response.data
  }
)
