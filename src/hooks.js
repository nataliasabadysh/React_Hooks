// useState 
// useReducer
// useState 

const App = () => {
    useState();  // will return Array with 2 values
    // Declaring a State Variable  “array destructuring”. - 1 - state -  2 - function for change this  state 
    const [ count, setCount ]  = useState();
    // counter, setCount - 2 var - value will be different on each call App-Component
    const increment = () =>{
        setCount(count + 1)
    }
    return( );
}