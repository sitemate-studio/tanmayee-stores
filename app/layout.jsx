import "../src/index.css";
import Providers from "./providers";
import StoreLayout from "../src/components/store/StoreLayout";

export const metadata = {
  title: "Tanmayee Fancy Store",
  description: "Ethnic fashion, jewellery, and accessories from Tanmayee Fancy Store.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <StoreLayout>{children}</StoreLayout>
        </Providers>
      </body>
    </html>
  );
}
