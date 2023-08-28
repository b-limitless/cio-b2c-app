import type { AppProps } from 'next/app';
import { Poppins } from '@next/font/google';
import '/styles/index.scss';
import Head from 'next/head';

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
    </>
    
  )
}

export default MyApp
