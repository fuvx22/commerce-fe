import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
};


const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="container min-h-screen mx-auto max-w-5xl">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
