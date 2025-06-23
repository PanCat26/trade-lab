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
        {children}
      </body>
    </html>
  );
}
