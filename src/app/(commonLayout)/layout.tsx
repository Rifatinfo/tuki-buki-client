import { Footer } from "@/components/shared/Footer/Footer";
import HeaderWrapper from "@/components/shared/Navbar/HeaderWrapper";



const CommonLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <>
            <HeaderWrapper />
            {children}
            <Footer />
        </>
    );
};

export default CommonLayout;

