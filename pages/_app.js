import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
import { Layout } from '../components';
import { StateContext } from '../context/StateContext';


const MyApp = ({ Component, pageProps }) => {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}

export default MyApp
