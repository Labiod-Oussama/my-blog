import { createTheme } from "@mui/material";
export const theme= createTheme({
    typography: {
        fontFamily:[ 'DM Sans','Yusei Magic'].join()
    },

    palette: {
        primary: {
            main: '#102C57',
            light: '#F0F0F0',   
            dark:'#ED2B2A',
        },
        secondary:{
            main:'#F4D160',
            light:'#102C57'
            // main:'#102C57'
        }
         
    },
});