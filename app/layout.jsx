import { Nav, Provider } from '@components';
import '@styles/globals.css';
import Head from 'next/head';

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <head>
            <link rel="icon" href="/assets/icons/prompt.png" />
        </head>
        <body>
            <Provider>
                <div className="main">
                    <div className="gradient" />
                </div>

                <div className="app">
                    <Nav />
                    {children}
                </div>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;