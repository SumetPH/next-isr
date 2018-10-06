import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const InitialState = {
   isAdmin: false
}

export const actionTypes = {
   isAdmin: 'isAdmin'
}

// REDUCERS
export const reducer = (state = InitialState, action) => {
   switch (action.type) {
      case actionTypes.isAdmin:
         return {
            ...state,
            isAdmin: action.isAdmin
         }
      default:
         return state
   }
}

// ACTIONS
export const checkAdmin = status => dispatch => {
   if (status === 'login') {
      localStorage.setItem('isAdmin', true)
      dispatch({
         type: actionTypes.isAdmin,
         isAdmin: true
      })
   }

   if (status === 'logout') {
      localStorage.removeItem('isAdmin')
      dispatch({
         type: actionTypes.isAdmin,
         isAdmin: false
      })
   }
}

export const initStore = initialState => {
   return createStore(
      reducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
   )
}
