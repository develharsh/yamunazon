import '../styles/globals.css'
import Layout from '../components/Layout'
import { DataProvider } from '../store/GlobalState'
import Router from 'next/router'
import NProgress from 'nprogress'

function MyApp({ Component, pageProps }) {
  NProgress.configure({ showSpinner: false });
  Router.events.on('routeChangeStart',
    (url) => {
      NProgress.start();
    })
  Router.events.on('routeChangeComplete',
    (url) => {
      NProgress.done();
    })
  return (
    <DataProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </DataProvider>
  )
}

export default MyApp