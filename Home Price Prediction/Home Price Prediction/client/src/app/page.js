import Head from 'next/head';
import EstimatePriceForm from '../components/EstimatePriceForm';
import BackgroundEffect from '../components/BackgroundEffect';
// import '../public/app.css';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Bangalore Home Price Prediction</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <BackgroundEffect />

      <div className="form-container">
        {/* <EstimatePriceForm /> */}
      </div>
    </div>
  );
}