import { configureStore } from "@reduxjs/toolkit";
import  myWeatherSliceReducer from "./weatherSlice";
export default configureStore ({
    reducer:{
        weather:myWeatherSliceReducer,
    }
});