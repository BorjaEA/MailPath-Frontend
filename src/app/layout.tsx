import '../styles/globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'MailForge',
  description: 'Minimalistic Mail Dashboard',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        {children}
      </body>
    </html>
  );
}
