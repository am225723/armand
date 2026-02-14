import "./globals.css";

export const metadata = {
  title: "Happy Birthday, Luke!",
  description: "A calligraphy birthday card synced to audio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
