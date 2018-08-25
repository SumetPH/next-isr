import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

const InitialState = {
   isAuth: false,
   questions: [],
   answers: [],
   images: [],
   image360s: []
}

export const actionTypes = {
   login: 'login',
   logout: 'logout',
   loadQuestions: 'loadQuestions',
   loadAnswers: 'loadAnswers',
   loadImages: 'loadImages',
   loadImage360s: 'loadImage360s'
}

// REDUCERS
export const reducer = (state = InitialState, action) => {
   switch (action.type) {
      case actionTypes.login:
         return {
            ...state,
            isAuth: action.isAuth
         }
      case actionTypes.logout:
         return {
            ...state,
            isAuth: action.isAuth
         }
      case actionTypes.loadQuestions:
         return {
            ...state,
            questions: action.questions
         }
      case actionTypes.loadAnswers:
         return {
            ...state,
            answers: action.answers
         }
      case actionTypes.loadImages:
         return {
            ...state,
            images: action.images
         }
      case actionTypes.loadImage360s:
         return {
            ...state,
            image360s: action.image360s
         }
      default:
         return state
   }
}

// ACTIONS
export const login = () => dispatch => {
   localStorage.setItem('isAuth', true)
   dispatch({
      type: actionTypes.login,
      isAuth: true
   })
}

export const logout = () => dispatch => {
   localStorage.removeItem('isAuth')
   dispatch({
      type: actionTypes.login,
      isAuth: false
   })
}

export const loadQuestions = () => dispatch => {
   axios.get(`${host}/api/question/all`).then(res => {
      dispatch({
         type: actionTypes.loadQuestions,
         questions: res.data.res
      })
   })
}

export const loadAnswers = id => dispatch => {
   axios.get(`/api/question/get/${id}`).then(res => {
      dispatch({
         type: actionTypes.loadAnswers,
         answers: res.data.res.answers
      })
   })
}

export const loadImages = () => dispatch => {
   axios.get('/api/image/all').then(res => {
      dispatch({
         type: actionTypes.loadImages,
         images: res.data.res
      })
   })
}

export const loadImage360s = () => dispatch => {
   axios.get('/api/image360/all').then(res => {
      dispatch({
         type: actionTypes.loadImage360s,
         image360s: res.data.res
      })
   })
}

export const initStore = initialState => {
   return createStore(
      reducer,
      initialState,
      composeWithDevTools(applyMiddleware(thunkMiddleware))
   )
}
