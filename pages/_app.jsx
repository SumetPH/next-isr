import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore, login } from '../redux/store'
import { ToastContainer } from 'react-toastify'

export default withRedux(initStore)(
   class MyApp extends App {
      static async getInitialProps({ Component, ctx }) {
         return {
            pageProps: Component.getInitialProps
               ? await Component.getInitialProps(ctx)
               : {}
         }
      }

      componentDidMount = () => {
         if (localStorage.getItem('isAuth')) {
            this.props.store.dispatch(login())
         }
      }

      render() {
         const { Component, pageProps, store } = this.props

         return (
            <Container>
               <Provider store={store}>
                  <div>
                     <ToastContainer autoClose={2000} />
                     <Component {...pageProps} />
                  </div>
               </Provider>
            </Container>
         )
      }
   }
)
