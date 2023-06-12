
import { useRouter } from "next/router";
import { useEffect } from "react";
import BackHeader from "../../components/BackHeader/header";
import BackFooter from "../../components/BackFooter/footer";
import SideMenu from "../../components/SideMenu/sidemenu";

const DashboardPage = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (!token) {
            router.push("/admin");
        }
    });



    return (
        <>
            <BackHeader />
            <div className="flex flex-1 justify-start items-start bg-opacity-5">
                <SideMenu />
                <div className="container mx-auto">
                    <div className="flex flex-row">
                        <div className="w-full mt-5 ml-5">
                            {children || <h1>Lütfen bir menü seçeneği seçin</h1>}
                        </div>
                    </div>
                </div>
            </div>
            <BackFooter />
        </>
    );
};

export default DashboardPage;

