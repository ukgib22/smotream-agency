import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://smotream.com"),
  title: "SMOTREAM Marketing Agency | Client Acquisition Systems",
  description:
    "Premium growth agency building acquisition systems that turn ads, content and automation into booked calls.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }]
  },
  openGraph: {
    title: "SMOTREAM Marketing Agency | Client Acquisition Systems",
    description:
      "Premium growth agency building acquisition systems that turn ads, content and automation into booked calls.",
    type: "website",
    url: "https://smotream.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SMOTREAM Marketing Agency client acquisition systems"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "SMOTREAM Marketing Agency | Client Acquisition Systems",
    description:
      "Premium growth agency building acquisition systems that turn ads, content and automation into booked calls.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Sora:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
