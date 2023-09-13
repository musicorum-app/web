import { Theme } from "@radix-ui/themes"
import { Poppins } from "next/font/google"
import "@radix-ui/themes/styles.css"
import "$shared/styles/theme.css"
import StyledComponentsRegistry from "$shared/styles/StyledComponentsRegistry"

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
})

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Theme
          appearance="dark"
          grayColor="gray"
          className={`${poppins.className} musicorum-theme`}
        >
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </Theme>
      </body>
    </html>
  )
}
