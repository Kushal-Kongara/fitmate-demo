import './globals.css';

export const metadata = { 
  title: 'FitMate Coach - AI-Powered Personal Coaching', 
  description: 'Scale human coaching with AI assistance. Real coaches, AI efficiency.' 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
