import React from 'react'
import { Provider } from 'react-redux'
import App, { Container } from 'next/app'
import withRedux from 'next-redux-wrapper'
import { initStore, checkAdmin } from '../redux/store'
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
         if (localStorage.getItem('isAdmin')) {
            this.props.store.dispatch(checkAdmin('login'))
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
