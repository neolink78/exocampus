import { appWithTranslation } from 'next-i18next'
import '@/styles/globals.css'
import { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
    return (
        <div className='min-h-screen bg-gradient-to-r from-[#FFE6C9] to-[#FFD0A3]'>
            <Component {...pageProps} />
        </div>
    )
}

export default appWithTranslation(App)