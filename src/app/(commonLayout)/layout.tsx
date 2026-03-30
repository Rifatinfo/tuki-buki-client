import { Footer } from "@/components/shared/Footer/Footer";
import { Header } from "@/components/shared/Navbar/Header";


const CommonLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <> 
           <Header />
            {children}
            <Footer/>
        </>
    );
};

export default CommonLayout;

