import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import MobileHeader from '@/components/layout/MobileHeader';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rent Collection",
  description: "Property Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <MobileHeader />
            <main className="pt-16 pb-8 px-4">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
