import "./globals.css";
import { IBM_Plex_Mono } from 'next/font/google';

const ibmMonoSemiBold = IBM_Plex_Mono({
  weight: ['600'],
  subsets: ['latin'],
  variable: '--font-ibm-mono-semi-bold',
});

export const metadata = {};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={ibmMonoSemiBold.variable}>
        <header>
          <button id="logo">TradeLab</button>
        </header>
        {children}
      </body>
    </html>
  );
}
