import { createContext, useReducer, useEffect } from "react";
import reducers from './Reducers'
import cookie from 'js-cookie'

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const initialState = { notify: {}, auth: {}, cart: [] }
    const [state, dispatch] = useReducer(reducers, initialState)
    const { cart } = state

    useEffect(() => {
        const whoU = cookie.get('whoU')
        const tokenAuth = cookie.get('tokenAuth');
        if (whoU && tokenAuth) {
            dispatch({ type: 'AUTH', payload: { tokenAuth, whoU } })
        }
        else {
            dispatch({ type: 'AUTH', payload: {} })
        }
    }, [])
    useEffect(() => {
	try{
		const cook = cookie.get('__next__cart01__harshv')
	        const __next__cart01__harshv = JSON.parse(cook)
	        if (__next__cart01__harshv) {
	            dispatch({ type: 'ADD_CART', payload: __next__cart01__harshv })
        	}
	}
	catch(err){
		console.log('GlobalState Error')
		dispatch({ type: 'ADD_CART', payload:[] })
	}
    }, [])
    useEffect(() => {
        cookie.set('__next__cart01__harshv', JSON.stringify(cart))
    }, [cart])

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}