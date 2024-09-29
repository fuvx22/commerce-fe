import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

type Props = {
  children: React.ReactNode;
};


const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto py-10 flex min-h-screen">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
