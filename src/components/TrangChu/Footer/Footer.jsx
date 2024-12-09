import "./Footer.scss";
const Footer = () => {
    return (
        <>
            <div className="footer" style={{ height: "1px" }}></div>

            <div className="section-share section-about">
                <div className="section-about-header">
                    Truyền thông nói về Bookingcare.vn
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        {/* kích thước video */}
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/FyDQljKtWnI"
                            title="[Nhóm 4] KTPM- Tìm hiểu và demo về công cụ SELENIUM"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                    <div className="content-right">
                        <div>
                            <strong>Giới thiệu về BookingCare:</strong>
                            <br />
                            BookingCare là một nền tảng y tế toàn diện giúp bệnh
                            nhân dễ dàng chọn lựa dịch vụ y tế từ mạng lưới bác
                            sĩ chuyên khoa và các phòng khám/bệnh viện uy tín.
                            Thông tin được xác thực và bệnh nhân có thể đặt lịch
                            khám nhanh chóng và thuận tiện.
                            <br />
                            <br />
                            <strong>Các chức năng chính:</strong>
                            <li>Tìm kiếm bệnh viện</li>
                            <li>Tìm kiếm bác sĩ</li>
                            <li>Tìm kiếm chuyên khoa khám bệnh</li>
                            <li>Đặt lịch khám bệnh</li>
                            <li>Theo dõi lịch sử khám bệnh</li>
                            <li>Theo dõi lịch khám</li>
                        </div>
                    </div>
                </div>
                <div className="home-footer">
                    <p>
                        &copy; 2024 Trần Hoàng Quân . More information, please
                        visit my youtube channel.
                        <a target="_blank" href="https://github.com/thquan0308">
                            &#8594; Click here &#8592;
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
};
export default Footer;
