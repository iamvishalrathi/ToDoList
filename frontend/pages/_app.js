import '../styles/globals.css';
import Head from 'next/head';
import { ModalProvider } from '../components/ModalProvider';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <title>Todo List App</title>
      </Head>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </>
  );
}

export default MyApp;