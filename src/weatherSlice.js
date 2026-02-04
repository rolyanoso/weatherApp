import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchWeather = createAsyncThunk("weatherApi/fetchWeather",
    async()=>{
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=41.01&lon=28.94&appid=20585af5c1a84444a9b6405b9cb052fb'
        // ,{
        //     cancelToken: new axios.CancelToken((c) => {
        //         cancleAxios = c
        //     })
        // }
        );
        const responseTemp = Math.round(response.data.main.temp -272.15);
        const min = Math.round(response.data.main.temp_min -272.15);
        const max = Math.round(response.data.main.temp_max -272.15);
        const description = response.data.weather[0].description;
        const icon = response.data.weather[0].icon;
        //setTemp({number: responseTemp ,min ,max,description,icon:`https://openweathermap.org/img/wn/${icon}@2x.png`});
        
        return {number:responseTemp,min,max,description,icon:`https://openweathermap.org/img/wn/${icon}@2x.png`}
    }
)
const myWeatherSlice=createSlice({
    name:"WeatherApp",
    initialState:{
        value : "empty",
        weather: {},
        isLoading: false,
    },
    reducers:{
        changeState:(state,action) =>{
            state.result ="changed";
        }
    },
    extraReducers(builder){
        builder.addCase(fetchWeather.pending,(state,action)=>{
           state.isLoading = true;
           
        }).addCase(fetchWeather.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.weather = action.payload
        }).addCase(fetchWeather.rejected,(state,action)=>{
            state.isLoading = false
        })
    },
})

export const {changeState} = myWeatherSlice.actions;
export default myWeatherSlice.reducer;