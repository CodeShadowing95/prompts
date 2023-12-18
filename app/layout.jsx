import { Nav, Provider } from '@components';
import '@styles/globals.css';

export const metadata = {
    title: "Promptopia",
    description: "Discover & Share AI Prompts",
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
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