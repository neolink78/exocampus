import { appWithTranslation } from 'next-i18next'
import '@/styles/globals.css'
import { AppProps } from 'next/app';
import { Layout } from '@/components/layout';
import { ThemeProvider } from 'next-themes';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {

    return (
        <ThemeProvider attribute='class'>
            <Head>
                <title>Memory game</title>
            </Head>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    )
}

export default appWithTranslation(App)