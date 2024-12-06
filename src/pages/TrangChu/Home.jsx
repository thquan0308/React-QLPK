// import Footer from "../../components/TrangChu/Footer/Footer"
// import Header from "../../components/TrangChu/Header/Header"
// import '../TrangChu/home.scss'
// import BodyHomePage from "./BodyHomePage/BodyHomePage"
// const Home = () => {

//     return (
//         <>
//             <div className='layout-app'>
//                 <Header />
//                 <BodyHomePage />
//                 <Footer />
//             </div>
//         </>
//     )
// }
// export default Home

import { useEffect, useState } from "react";
import Footer from "../../components/TrangChu/Footer/Footer";
import Header from "../../components/TrangChu/Header/Header";
import "../TrangChu/home.scss";
import BodyHomePage from "./BodyHomePage/BodyHomePage";

const Home = () => {
    const [showNotification, setShowNotification] = useState(true); // State điều khiển thông báo

    useEffect(() => {
        // Tải script Coze Web SDK
        const script = document.createElement("script");
        script.src =
            "https://sf-cdn.coze.com/obj/unpkg-va/flow-platform/chat-app-sdk/1.0.0-beta.4/libs/oversea/index.js";
        script.async = true;
        script.onload = () => {
            // Khởi tạo chatbot sau khi script đã được tải
            new CozeWebSDK.WebChatClient({
                config: {
                    bot_id: "7445199790524809224",
                },
                componentProps: {
                    title: "Coze",
                },
            });
        };
        document.body.appendChild(script);

        // Cleanup script nếu component bị unmount
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    // Ẩn thông báo sau 5 giây
    useEffect(() => {
        const timer = setTimeout(() => setShowNotification(false), 500000);
        return () => clearTimeout(timer); // Dọn dẹp khi unmount
    }, []);

    return (
        <>
            <div className="layout-app">
                <Header />
                <BodyHomePage />
                <Footer />

                {/* Thông báo trợ lý AI */}
                {showNotification && (
                    <div className="ai-notification">
                        Đây là trợ lý HealthCare Buddy,
                        <br />
                        sẵn sàng hỗ trợ bạn!
                        <button
                            onClick={() => setShowNotification(false)}
                            className="close-btn"
                        >
                            ×
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
