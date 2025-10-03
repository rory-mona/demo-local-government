import "./globals.css";

export const metadata = {
  title: "Residents Online Registration",
  icons: {
    icon: '/coat.png',
    shortcut: '/coat.png',
    apple: '/coat.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-hatch">{children}</body>
    </html>
  );
}
