import { useState } from "react";


function useForm(initialState){

    const [data, setData] = useState(initialState)

   function inputHandler(e){
    const name = e.target.name;
    const value = e.target.value;
    setData(prevData => ({...prevData, [name]: value}))
   }

return {data, inputHandler}  

}

export default useForm