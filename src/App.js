import './App.css';

//*****REACT*******
import * as React from 'react';
import { useEffect, useState } from 'react';

//*****MATERIAL*****
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import CloudIcon from '@mui/icons-material/Cloud';
import CircularProgress from '@mui/material/CircularProgress';

//*****OTHER*****
import moment from "moment";
import "moment/min/locales";
import axios from 'axios';
import  {useTranslation} from 'react-i18next';
//*****REDUX*****
import {useSelector , useDispatch} from  "react-redux";
import { changeState } from './weatherSlice';
import { fetchWeather } from './weatherSlice';

moment.locale("tr");
let cancelAxios = null

function App() {
  const dispatch = useDispatch()
  const resultState =useSelector((state) => {
    console.log("the state is : " + state);
    return state.resultState;
  });
  const isLoading = useSelector((state)=>{
    return state.weather.isLoading;
  })
  const temp = useSelector((state)=>{
    return state.weather.weather;
  })

  const { t, i18n } = useTranslation();

  
  //STATES
  const [language , setLanguage] = useState("tr")
  const [dateAndTime,setDataAndTime] = useState("")
  
  function handleChangeLanguage(){
    if(language === "tr"){
      setLanguage("en");
      i18n.changeLanguage("en");
      moment.locale("en")
    }else{
      setLanguage("tr");
      i18n.changeLanguage("tr");
      moment.locale("tr");
    }
    setDataAndTime(moment().format('MMMM Do YYYY'));
  }
  useEffect (() =>{
    dispatch(fetchWeather())
    i18n.changeLanguage(language);
  },[])
  useEffect(() => {
    setDataAndTime(moment().format('MMMM Do YYYY'));

    return () =>{
      if(cancelAxios)cancelAxios();
    };
  },[]) 
  
 
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        {/* CONTENT CONTAINER OPENED ------------------------------------------*/}
        <div style={{
          height:"100vh",
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          flexDirection:"column"
          }}>
          {/* CARD OPENED ----------------------------*/}
            <div style={{
              width:"100%",
              background:"rgb(28 52 91 /36%)",
              color:"white",
              padding:"10px",
              borderRadius:"15px",
              boxShadow:"0px 11px 1px rgba(0,0,0,0.05)",
            }}>
              {/* CONTENT OPENED --------------------------*/}
              <div>
                
                  {/* CITY AND TIME OPENED ------------*/}
                    <div style={{
                      display:"flex",
                      alignItems:"end",
                      justifyContent:"start",
                      }}>
                      <Typography variant='h2' style={{marginRight:"20px"}}>{t('Istanbul')}</Typography>
                      <Typography variant='h5' style={{marginRight:"20px"}}>
                        {dateAndTime}  
                      </Typography>
                    </div>
                  {/* CITY AND TIME CLOSED ------------*/}
                  <hr/>
                  <div style={{display:"flex",justifyContent:"space-around",}}>
                    {/* DEGREE & DESCRIPTION OPENED -----*/}
                    <div>
                      {/*------- TEMP ------- */}
                      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        {isLoading === true ?
                           <CircularProgress style={{color:"rgba(145, 197, 255, 1)"}}/> : ""
                        }

                        
                        <Typography variant='h1'style={{textAlign:"left"}}>{temp.number}</Typography>
                        <img src={temp.icon}/>
                      </div>
                      <Typography variant='h6'>{t(temp.description)}</Typography>
                      {/*------- MIN MAX ------- */}
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                        <h5>{t("max")}:{temp.max} </h5>
                        <h5 style={{margin:"0px 5px"}}>|</h5>
                        <h5>{t("min")}:{temp.min} </h5>
                      </div>
                    </div>
                  {/* DEGREE & DESCRIPTION CLOSED -----*/}
                  <CloudIcon style={{fontSize:"200px",color:"white"}}/>
                  </div>
                  
              </div>
              {/* CONTENT CLOSED --------------------------*/}
            </div>
          {/* CARD CLOSED ----------------------------*/}
          <Button onClick={handleChangeLanguage} style={{color:"white",marginRight:"500px",marginTop:"10px"}} variant="text">{language === "en" ? "Turkish" : "İngilizce"}</Button>
        </div>
        
        {/* CONTENT CONTAINER OPENED ------------------------------------------*/}
      </Container>
    </React.Fragment>
  );
}


export default App;
