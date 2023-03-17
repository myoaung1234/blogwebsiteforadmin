import axios from "axios"

let data = localStorage.getItem('user') ?  JSON.parse(localStorage.getItem('user')) : {};

export let apiURL = `https://myoaung.codingburma.com/v1`

export let axiosAuth = axios.create({
  headers: {
    Authorization : `Bearer ${ data.tokens?.access?.token }`
    }   
  }
)

export let axiosAuthUpload = axios.create({
    headers: {
      Authorization : `Bearer ${data.tokens?.access?.token}`,
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
        "Accept": "application/json" 
      }
    }
  )


