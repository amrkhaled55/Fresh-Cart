import { createContext, useEffect, useState } from "react";
export const theContext= createContext();
export function TokenContext({children}){
   const [token,setToken]= useState(null);
   const [loading,setLoading]=useState(true)
 useEffect(()=>{
            if(localStorage.getItem("tkn")){
        setToken(localStorage.getItem("tkn"));
    }
            setLoading(false);
 },[]);

    return <theContext.Provider value={{token,setToken,loading,setLoading}}>
    
    {children}
    </theContext.Provider>
}