import { HeaderComponent } from "../../../components/Marketplace/Header"

export default function MarketplaceLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
      <section>
        <HeaderComponent />
        {children}
      </section>
    )
  }