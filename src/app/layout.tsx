import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevMailer",
  description:
    "Dev mailer is an authentic API service designed to help developers. Are you struggling to integrate the mail service into your application? Dev mailer is here to solve the problem. Want to send emails to your clients? You can count on Dev mailer to help you with that too. Dev mailer is a reliable API service that can help you integrate your mail.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="lofi">
      <body className={rubik.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
