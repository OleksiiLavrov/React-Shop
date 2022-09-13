import React from 'react'
import {BsSearch} from 'react-icons/bs';

import { useStateContext } from '../context/StateContext';

const Input = () => {
   const {setNameFilter} = useStateContext();
   // const [input, setInput] = useState(second);
   const inputHandler = (event) => {
      setNameFilter(event.target.value);
   }
   return (
     <div className="filter-input-container">
       <input 
          type="text" 
          placeholder="Find something special..."
          className="filter-input"
          onChange={inputHandler}
       />
       <span className="filter-search"><BsSearch /></span>
   
     </div>
   )
}

export default Input