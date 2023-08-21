import type { AppProps } from 'next/app';
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
