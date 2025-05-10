import axios from "axios";

export const api = axios.create({
    baseURL: "https://sheets.googleapis.com/v4/spreadsheets/1gLgpkSABsg49X4ZkBj_nxL0Ufu25j1XcPVqAqA-2JlI/values/A2:J?key=AIzaSyAwHgfXP2ZuqZQ1xcH18wTcu6q1-evDAT4"
})


export const apiEnd = axios.create({
    baseURL: "https://sheets.googleapis.com/v4/spreadsheets/1L98USQgbbZ_ABKwS2sTGqxZxUY7qkubkKbDP5ja113M/values/A2:J?key=AIzaSyAwHgfXP2ZuqZQ1xcH18wTcu6q1-evDAT4"
})