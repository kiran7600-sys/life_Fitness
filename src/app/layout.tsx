import type { Metadata } from "next";
import Script from "next/script";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fitness Pro | Premium Gym & Fitness Center in Pimpalgaon",
  description: "Pimpalgaon's premier cinematic fitness destination. State-of-the-art strength training, CrossFit, Zumba, yoga, personal training, and recovery. Free trials available.",
  keywords: ["gym in Pimpalgaon", "fitness center Pimpalgaon", "personal training Pimpalgaon", "CrossFit Pimpalgaon", "Fitness Pro", "best gym in Pimpalgaon", "yoga classes Pimpalgaon"],
  openGraph: {
    title: "Fitness Pro | Premium Gym in Pimpalgaon",
    description: "Experience state-of-the-art strength training, CrossFit, Zumba, and recovery. Sign up for a free trial class today.",
    type: "website",
    locale: "en_IN",
    url: "https://fitnesspro.com",
    siteName: "Fitness Pro",
  },
  alternates: {
    canonical: "https://fitnesspro.com",
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
    "name": "Fitness Pro",
    "image": "https://fitnesspro.com/images/gym-hero-poster.webp",
    "@id": "https://fitnesspro.com/#gym",
    "url": "https://fitnesspro.com",
    "telephone": "+919999999999",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Demo Street, Demo Block",
      "addressLocality": "Pimpalgaon",
      "addressRegion": "Maharashtra",
      "postalCode": "422209",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 20.1706,
      "longitude": 73.9845
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-black text-off-white font-sans">
        <SmoothScroll>{children}</SmoothScroll>
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
