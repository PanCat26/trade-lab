import "./globals.css";
import { IBM_Plex_Mono } from 'next/font/google';

const ibmMono = IBM_Plex_Mono({
  weight: ['200', '400', '600'],
  subsets: ['latin'],
  variable: '--font-ibm-mono',
});

export const metadata = {};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`${ibmMono.variable}`}>
        <header>
          <button className="logo">TradeLab</button>
        </header>
        <main>
          <nav className="sidebar">
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" height="56px" viewBox="0 0 24 24" width="68px" fill="#e6e6e6"><path d="M0 0h24v24H0z" fill="none"/><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
            </button>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
