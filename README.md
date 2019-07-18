# React v16.8 
- import React, { useState, useEffect, useReducer } from 'react'; 

- [reactjs.org - Введение в хуки](https://ru.reactjs.org/docs/hooks-intro.html)
- [Making Sense of React Hooks by Dan Abramov](https://dev.to/dan_abramov/making-sense-of-react-hooks-2eib)
- [A Complete Guide to useEffect by Dan Abramov](https://overreacted.io/a-complete-guide-to-useeffect/)
- [react-use - репозиторий готовых кастомных хуков](https://github.com/streamich/react-use)


# React Next: Hooks - use... 
- all functions inside of Component as Closures
- no ref types this. there is not merging with states❗️

# useState for state in function components,    

```  useState();   will return Array with 2 values
const App = () => {

    // Declaring a State Variable  “array destructuring”. - 1 - state -  2 - function for change this  state 
    const [ count, setCount ]  = useState(0);
    
    // count = 0, setCount - 2 var - value will be different on each call App-Component
    return( );
}
```

change the state 

```
const App = () => {
    const [ count, setCount ]  = useState(0);
    const [ inputTest, setText ]  = useState(0);
    
    const increment = () =>{
        setCount(count + 1)
    }
     const setText = () =>{
        setCount(count + 1)
    }
    return( );
}
```

``` Class  
   this.state = { a: 0, b: 1, c:3 }
   this.setState({ a: 5, b: 6, c: 7 })
```



``` Hooks 
   const [todos, setTodos] = useState([]);

   const todo = {
        id: shortid.generate(),
        text,
    };


```

Example 


```
   const [todos, setTodos] = useState([ ]);      
   // const [todos, setTodos] = useState([ { id: '', text: '' } ]);

   const [todoText, setTodoText] = useState('');    

     const onChangeTodoText = e => {
        setTodoText(e.target.value);
    };
      const addTodo = text => {

        const todo = {
            id: shortid.generate(),
            text,
        };
         // setTodos([...todos, todo]) - fun Closures, always will take from init state
        setTodos(prevTodos => [...prevTodos, todo]);
    };

    const submitHandler = e => {
        e.preventDefault();

          setTodos(prevTodos => [...prevTodos, todo])
          setTodoText('');
    };

     const deleteTodo = todoId => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== todoId)); // for filter take new state "prevTodos" 
    };
```


❗️
```
const App = () => {
    const [ count, setCount ]  = useState(); ✅ we can call in fun Conponents

    if()
    {
        useState(); ❌ in if, fun, ir custom fun begings on useName 
    }
    
    this.state = {
        count:0,
        inputValue,
    }

    const increment = () =>{
        setCount(count + 1)
    }
    return( );
}

```


```
export const useCounter = (initialState = 0, step = 1) => {
    const [ count, setCount ] = useState(initialState);

    const decrement = () => setCount((prevCount) => prevCount - step);
    const reset = () => setCount(0);
    const increment = () => setCount((prevCount) => prevCount + step);

    return {  count, decrement, reset, increment, };
};

- setCount -(  arg what we want see in a new State ) - 
```
# useState

```
/**
 * Хук useState возвращает массив из двух элементов.
 * Первый элемент содержит значение данной ячейки состояния.
 * Второй элемент содержит функция для изменения значения данной ячейки состояния.
 *
 * При вызове такой функции-апдейтера происходит обновление состояния компонента и его перерендер.
 * Если при вызове функции-апдейтера состояние не изменилось, то перерендера не будет.
 *
 * Аргумент useState(argument) — это изначальное значения для данной ячейки состояния.
 */
import React, { useState } from 'react';
import { render } from 'react-dom';

const Counter = () => {
    const [ count, setCount ] = useState(0);

    console.log('🖥 Рендер!', count);

    return (
        <section className = 'counter'>
            <h1>Счётчик: {count}</h1>
            <button onClick = { () => setCount(count - 1) }>-</button>
            <button onClick = { () => setCount(0) }>Обнулить</button>
            <button onClick = { () => setCount(count + 1) }>+</button>
        </section>
    );
};

render(<Counter />, document.getElementById('app'));
```



# useEffect   Similar to componentDidMount/ componentWillUpdate
- this effect, we set the document title
- data fetching or call some other imperative API.


#  useEffect (()=> { console.log('called during render!!!! ')}
#  useEffect (()=> {console.log('called on 1st render !!!  ')}), []}     //  ~ componentWillUpdate 


```
componentDidUpdate(prevProps){
    if(prevProps.todos.length !== this.props.todos.length){
      .. 
    }
  }

  Hooks
  useEffect (()=> {console.log('called on 1st render !!!  ')}), [todos]}  
```

-  if we want to call useEffect when state was  changed 
-  useEffect (()=> { console.log('called on 1st render !!!  ')}), [count] } 

 
Example


```
  // "Как будто аналог" didMount
  useEffect(() => {
    const persistedTodos = localStorage.getItem('todos');
    if (persistedTodos) {
      // setTodos(JSON.parse(persistedTodos));
      const todos = JSON.parse(persistedTodos);

      dispatch({
        type: ActionType.FETCH_TODOS,
        payload: { todos },
      });
    }
  }, []);

  // "Как будто аналог" didUpdate с проверкой todos
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

```

Example  useEffect(() => { .. return () => {}; }, []);

```
  useEffect(() => {
    // useEffect called ! 
    window.addEventListener('keydown', keyDownHandler);
    // Calling returned  function from useEffect callback before calling next useEffect
    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

```


#  new Hook useContext  (HOC/Consumer)



```
import React, { createContext, useState } from 'react';

export const authenticationContext = createContext();

export const AuthContextProvider = props => {
  const [authenticated, setAuthenticated] = useState(false);

  const logIn = () => {
    setAuthenticated(true);
  };

  const logOut = () => {
    setAuthenticated(false);
  };

  return (
    <authenticationContext.Provider value={{ authenticated, logIn, logOut }}>
      {props.children}
    </authenticationContext.Provider>
  );
```
-  in context will be "value={{ authenticated, logIn, logOut }}"

``` Context ( ~ Redux provider )
import { AuthContextProvider } from './contexts/authentication';
import { NotificationProvider } from './contexts/notification';

ReactDOM.render(
  <AuthContextProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </AuthContextProvider>,
  document.getElementById('root'),
);
```

```
import { notificationContext } from '../contexts/notification'; //  we called ref to(not component) -> .. authenticationContext = createContext();

const AuthManager = () => {
  const { authenticated, logIn, logOut } = useContext(authenticationContext);
  const notif = useContext(notificationContext);

  console.log(notif); // 

  const login = () => {
    logIn();
    notif.addMessage('Welcome!!!!');
  };

  const logout = () => {
    logOut();
    notif.addMessage('See you soon! :)');
  };

  return (
    <div>
      {authenticated ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <button onClick={login}>Log in</button>
      )}

      <Status>
        Status: <b>{authenticated ? 'Logged IN' : 'Logged OUT'}</b>
      </Status>
    </div>
  );
};


```



# useReducer ( = Redux)

```
/**
 * Для более комплексного управления состоянием компонента можно использовать хук useReducer.
 *
 * Механизм работы useReducer идентичен по отношению к Redux.
 * Если ты раньше использовал Redux, то считай, что механизм ты уже знаешь.
 *
 * 1-й аргумент useReducer — это функция-редьюсер;
 * 2-й аргумент useReducer — изначальное состояние для редьюсера.
 */

import { useReducer, useRef, useEffect } from 'react';

const stopwatchReducer = (state, action) => {
    switch (action.type) {
        case 'SET_LAPSE':
            return {
                ...state,
                lapse: action.payload.currentTime - action.payload.startTime,
            };
        case 'START_RUNNING':
            return {
                ...state,
                isRunning: true,
            };
        case 'STOP_RUNNING':
            return {
                ...state,
                isRunning: false,
            };
        case 'RESET':
            return {
                ...state,
                lapse:     0,
                isRunning: false,
            };
        default:
            return state;
    }
};

export const useStopwatch = () => {
    const [{ isRunning, lapse }, dispatch ] = useReducer(stopwatchReducer, {
        isRunning: false,
        lapse:     0,
    });
    const intervalRef = useRef(null);

    const toggleRun = () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
            dispatch({ type: 'STOP_RUNNING' });
        } else {
            const startTime = Date.now() - lapse;
            intervalRef.current = setInterval(() => {
                dispatch({
                    type:    'SET_LAPSE',
                    payload: { currentTime: Date.now(), startTime },
                });
            }, 0);
            dispatch({ type: 'START_RUNNING' });
        }
    };

    const clear = () => {
        clearInterval(intervalRef.current);
        dispatch({ type: 'RESET' });
    };

    useEffect(() => () => clearInterval(intervalRef.current), []);

    return { isRunning, lapse, toggleRun, clear };
};

```



Почему хуки — это быстро:

- Использование хуков не требует избыточной вычислительной мощности, которую требуют классы в виде создания их экземпляров, и привязки методов в конструкторе;
- До использования хуков вложенность древа компонентов приложения значительно росла за счёт компонентов высшего порядка, render-props и контекста. Если использовать хуки правильно, то вложенность приложения значительно уменьшится. Что в свою очередь улучшит производительность. Чем меньше древо компонентов — тем меньше работы нужно делать React;
- Хуки увеличили библиотеку React на 1.5 кб. (Всего 6.2 кб);
- Функции проще миницифировать.


Посмотреть:

[Плейлист React Conf 2018, Las Vegas](https://www.youtube.com/watch?v=V-QO-KO90iQ&list=PLPxbbTqCLbGE5AihOSExAa4wUM-P42EIJ)

[Awesome React Hooks](https://github.com/rehooks/awesome-react-hooks)

P.S.: хук useCallback нужно использовать с набором критериев, по которым React будет определять — делать рендер или нет. Этот набор критериев указывается вторым аргументов useCallback — массивом, как и в случае с useMemo. 😎
 