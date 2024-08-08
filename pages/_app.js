/* eslint-disable react/prop-types */
import '../styles/globals.css';
import NavBar from '../components/NavBar';

export default function MyApp({ Component, pageProps }) {
  return (
    <><NavBar /><Component {...pageProps} /></>
  );
}
