import Footer from "@/components/top-level/footer";
import { Header } from "@/components/top-level/header";







export default function SubLayout(
    {
        children,
    }: {
        children: React.ReactNode
    }
) {
    return  (
        <section>
            <Header />
            {children}
            <Footer />
        </section>
    )
}