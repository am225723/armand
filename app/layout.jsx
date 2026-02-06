export const metadata = {
  title: "Happy Birthday, Luke!",
  description: "A calligraphy birthday card synced to audio.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
