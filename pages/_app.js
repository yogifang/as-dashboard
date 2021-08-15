import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import '../css/style.css';
import { AppWrapper } from '../components/AppContext'; // import based on where you put it

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </AppWrapper>
    
  );
}

export default MyApp;
