import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Life Fitness Pro | Premium Gym & Fitness Center in Prahladnagar, Ahmedabad",
  description: "Ahmedabad's premier cinematic fitness destination in Prahladnagar. State-of-the-art strength training, CrossFit, Zumba, yoga, personal training, and recovery. Free trials available.",
  keywords: ["gym in Ahmedabad", "fitness center Prahladnagar", "personal training Ahmedabad", "CrossFit Prahladnagar", "Life Fitness Pro", "best gym in Ahmedabad", "yoga classes Ahmedabad"],
  openGraph: {
    title: "Life Fitness Pro | Premium Gym in Prahladnagar, Ahmedabad",
    description: "Experience state-of-the-art strength training, CrossFit, Zumba, and recovery. Sign up for a free trial class today.",
    type: "website",
    locale: "en_IN",
    url: "https://lifetfitnesspro.com",
    siteName: "Life Fitness Pro",
  },
  alternates: {
    canonical: "https://lifetfitnesspro.com",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "name": "Life Fitness Pro",
    "image": "https://lifetfitnesspro.com/images/gym-hero-poster.webp",
    "@id": "https://lifetfitnesspro.com/#gym",
    "url": "https://lifetfitnesspro.com",
    "telephone": "+919898989898",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "105-107, 1st Floor, Ratnanjali Square, Prernatirth Derasar Rd, Jodhpur Village",
      "addressLocality": "Ahmedabad",
      "addressRegion": "Gujarat",
      "postalCode": "380015",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 23.0135,
      "longitude": 72.5126
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        "opens": "06:00",
        "closes": "22:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "07:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/lifefitnessproofficial"
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${montserrat.variable} ${inter.variable} antialiased bg-black text-off-white font-sans`}>
        {children}
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
