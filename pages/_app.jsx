import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore, loginAdmin, loginUser } from '../redux/store'
import { ToastContainer } from 'react-toastify'
import withNProgress from 'next-nprogress'
import NProgressStyles from 'next-nprogress/styles'

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
            this.props.store.dispatch(loginAdmin())
         }
         if (localStorage.getItem('isUser')) {
            const username = localStorage.getItem('username')
            this.props.store.dispatch(loginUser({ username: username }))
         }
      }

      render() {
         const { Component, pageProps, store } = this.props

         return (
            <Container>
               <Provider store={store}>
                  <div>
                     <NProgressStyles color="#fdcb6e" spinner={false} />
                     <ToastContainer autoClose={2000} position="bottom-left" />
                     <Component {...pageProps} />
                  </div>
               </Provider>
            </Container>
         )
      }
   }
)
