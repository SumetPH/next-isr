import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const InitialState = {
   isAuth: false,
   isUser: false,
   username: '',
   logo: '/static/icons/isr4b.png'
}

export const actionTypes = {
   admin: 'admin',
   user: 'user',
   logo: 'logo'
}

// REDUCERS
export const reducer = (state = InitialState, action) => {
   switch (action.type) {
      case actionTypes.admin:
         return {
            ...state,
            isAuth: action.isAuth
         }
      case actionTypes.user:
         return {
            ...state,
            isUser: action.isUser,
            username: action.username
         }
      case actionTypes.logo:
         return {
            ...state,
            logo: action.logo
         }

      default:
         return state
   }
}

// ACTIONS
export const loginAdmin = () => dispatch => {
   localStorage.setItem('isAuth', true)
   dispatch({
      type: actionTypes.admin,
      isAuth: true
   })
}

export const logoutAdmin = () => dispatch => {
   localStorage.removeItem('isAuth')
   dispatch({
      type: actionTypes.admin,
      isAuth: false
   })
}

export const logoBlack = () => dispatch => {
   dispatch({
      type: actionTypes.logo,
      logo: '/static/icons/isr4b-black.png'
   })
}

export const logoWhite = () => dispatch => {
   dispatch({
      type: actionTypes.logo,
      logo: '/static/icons/isr4b.png'
   })
}

export const loginUser = ({ username }) => dispatch => {
   localStorage.setItem('isUser', true)
   localStorage.setItem('username', username)
   dispatch({
      type: actionTypes.user,
      isUser: true,
      username: username
   })
}

export const logoutUser = () => dispatch => {
   localStorage.removeItem('isUser')
   localStorage.removeItem('username')
   dispatch({
      type: actionTypes.user,
      isAuth: false
   })
}

export const initStore = initialState => {
   return createStore(
      reducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
   )
}
