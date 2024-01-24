// src/api/api.js
import axiosInstance from './index'

const axios = axiosInstance

export const getBooks = () => {return axios.get('http://127.0.0.1:32325/test/')}

export const postBook = (bookName, bookAuthor) => {return axios.post('http://10.249.43.60:32325/test/', {'name': bookName, 'author': bookAuthor})}