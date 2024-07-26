import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Providers } from "./providers";
import { auth } from "@clerk/nextjs/server";
import getUser from "@/actions/get-user";
import Navabr from "@/components/navbar";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, redirectToSignIn } = auth();

  if (!userId) redirectToSignIn();

  const user = getUser(userId!);

  return (
    <Providers>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navabr />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
