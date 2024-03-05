import { useEffect, useState } from "react";

export function useLocalStorage <T> (key: string,
    initialvalue: T | (() => T)){
        const [value, setValue] = useState<T>( () => {
            const jsonValue = localStorage.getItem(key)
            if(jsonValue == null){
               if(typeof initialvalue ==="function"){
                   return (initialvalue as () => T) ()
               }else{
                return initialvalue
               }
            }else{
                return JSON.parse(jsonValue)
            }
        })
        useEffect(() =>{
           localStorage.setItem(key, JSON.stringify(value))
        },[value,key])

    return [value, setValue] as [T, typeof setValue]

}