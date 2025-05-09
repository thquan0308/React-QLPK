import {
    Avatar,
    Col,
    Divider,
    Drawer,
    Dropdown,
    Input,
    message,
    Row,
} from "antd";
import { IoMdMenu } from "react-icons/io";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxTimer } from "react-icons/rx";
import LoginPage from "../../../pages/TrangChu/Login/Login";
import { LuLogIn } from "react-icons/lu";
import { callLogoutBenhNhan } from "../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { doLogoutAction } from "../../../redux/account/accountSlice";
import { UserOutlined } from "@ant-design/icons";
import ModalDoiMK from "../ModalDoiMK/ModalDoiMK";
import "./HeaderViewDoctor.scss";
import { FaRegCircleQuestion } from "react-icons/fa6";
import ModalCauHoi from "../ModalDoiMK/ModalCauHoi";

const HeaderViewDoctor = () => {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [openModalDoiMK, setOpenModalDoiMK] = useState(false);
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [openModalCauHoi, setOpenModalCauHoi] = useState(false);
    const [placement, setPlacement] = useState("left");
    const [activeTxtMenu, setActiveTxtMenu] = useState("");
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(
        (state) => state.account.isAuthenticated
    );
    const acc = useSelector((state) => state.account.user);
    console.log("isAuthenticated: ", isAuthenticated);

    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    const handleClick = (section) => {
        setActiveTxtMenu(section);
        navigate(`${section}`);
    };

    const itemss = [
        {
            key: "loginn",
            label: (
                <label
                    style={{ display: "flex", cursor: "pointer" }}
                    onClick={() => setOpenModalLogin(true)}
                >
                    <LuLogIn size={20} /> &nbsp; Đăng nhập
                </label>
            ),
        },
        {
            key: "cauhoi",
            label: (
                <label
                    style={{ display: "flex", cursor: "pointer" }}
                    onClick={() => setOpenModalCauHoi(true)}
                >
                    <FaRegCircleQuestion size={20} /> &nbsp; Hỏi đáp
                </label>
            ),
        },
    ];
    const items = [
        {
            key: "1",
            label: (
                <label onClick={() => setOpenModalDoiMK(true)}>
                    Tài khoản của tôi
                </label>
            ),
        },
        {
            key: "2",
            label: (
                <label onClick={() => handleRedirectLichHen(acc._id)}>
                    Lịch hẹn
                </label>
            ),
        },
        {
            key: "cauhoi",
            label: (
                <label
                    style={{ display: "flex", cursor: "pointer" }}
                    onClick={() => setOpenModalCauHoi(true)}
                >
                    <FaRegCircleQuestion size={20} /> &nbsp; Hỏi đáp
                </label>
            ),
        },
        {
            key: "4",
            danger: true,
            label: <label onClick={() => handleLogout()}>Đăng xuất</label>,
        },
    ];
    const handleLogout = async () => {
        try {
            const res = await callLogoutBenhNhan();
            localStorage.removeItem("access_tokenBenhNhan");

            if (res) {
                message.success("Đăng xuất thành công!");
                dispatch(doLogoutAction());
                navigate("/");
            }
        } catch (error) {
            console.error("Có lỗi xảy ra khi đăng xuất", error);
            message.error("Đăng xuất không thành công!");
        }
    };
    const handleRedirectLichHen = (item) => {
        navigate(`/user/lich-hen?idKhachHang=${item}`);
    };

    const handleClickDoctor = () => {
        window.location.href =
            "https://react-qlpk-doctor.vercel.app/login-doctor"; // Chuyển hướng đến URL mới
    };

    return (
        <>
            <div className="header-top">
                <Row
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        textAlign: "center",
                        display: "inline-flex",
                        width: "80%",
                        backgroundColor: "rgb(226, 250, 242)",
                    }}
                >
                    <Col md={6} sm={20} className="col-top-logo">
                        <IoMdMenu
                            style={{
                                fontSize: "3vh",
                                cursor: "pointer",
                            }}
                            onClick={() => showDrawer()}
                        />
                        <img
                            style={{ cursor: "pointer", height: "5vh" }}
                            onClick={() => navigate("/")}
                            src="/bookingcare.svg"
                            alt=""
                        />
                    </Col>

                    <Col md={13} sm={24} xs={24} className="col-top">
                        <Navbar
                            className="navbar-custom"
                            style={{ textAlign: "start" }}
                        >
                            <Container>
                                <Nav className="me-auto nav-links">
                                    <Nav.Link
                                        onClick={() =>
                                            navigate("/user/chuyen-khoa-kham")
                                        }
                                        style={{
                                            textAlign: "start",
                                            lineHeight: "10px",
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Chuyên khoa
                                        </p>
                                        <p style={{ fontSize: "13px" }}>
                                            Tìm bác sĩ theo chuyên khoa
                                        </p>
                                    </Nav.Link>

                                    <Nav.Link
                                        onClick={() =>
                                            navigate("/user/bac-si-noi-bat")
                                        }
                                        style={{
                                            textAlign: "start",
                                            lineHeight: "10px",
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Bác sĩ
                                        </p>
                                        <p style={{ fontSize: "13px" }}>
                                            Chọn bác sĩ giỏi
                                        </p>
                                    </Nav.Link>

                                    <Nav.Link
                                        onClick={() =>
                                            navigate("/user/phong-kham")
                                        }
                                        style={{
                                            textAlign: "start",
                                            lineHeight: "10px",
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Cơ sở y tế
                                        </p>
                                        <p style={{ fontSize: "13px" }}>
                                            Chọn bệnh viện phòng khám
                                        </p>
                                    </Nav.Link>
                                    <Nav.Link
                                        onClick={() => navigate("/")}
                                        style={{
                                            textAlign: "start",
                                            lineHeight: "10px",
                                        }}
                                    >
                                        <p
                                            style={{
                                                fontSize: "16px",
                                                fontWeight: "bold",
                                            }}
                                        >
                                            Gói khám
                                        </p>
                                        <p style={{ fontSize: "13px" }}>
                                            Khám sức khỏe tổng quát
                                        </p>
                                    </Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>
                    </Col>

                    <Col
                        md={5}
                        sm={3}
                        xs={3}
                        className="col-top icon-container"
                        style={{ position: "relative", right: "-10vh" }}
                    >
                        <div
                            style={{
                                cursor: "pointer",
                                color: "rgb(69, 195, 210)",
                            }}
                        >
                            {isAuthenticated ? (
                                <>
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                    >
                                        <Avatar
                                            src={`${
                                                import.meta.env.VITE_BACKEND_URL
                                            }/uploads/${acc.image}`}
                                            style={{ cursor: "pointer" }}
                                            size={50}
                                            icon={<UserOutlined />}
                                        />
                                    </Dropdown>
                                </>
                            ) : (
                                <>
                                    {/* <LuLogIn
                                        onClick={() => setOpenModalLogin(true)}
                                        size={"5vh"}
                                        title="Login"
                                        style={{
                                            cursor: "pointer",
                                            color: "rgb(69, 195, 210)",
                                        }}
                                    /> */}
                                    <Dropdown
                                        menu={{
                                            items: itemss || [],
                                        }}
                                    >
                                        <LuLogIn size={"5vh"} />
                                    </Dropdown>
                                </>
                            )}
                        </div>
                    </Col>
                </Row>

                {/* <Drawer
                    title="MENU"
                    placement={placement}
                    closable={false}
                    onClose={onClose}
                    open={open}
                    key={placement}
                >
                    <p
                        className={`txt-menu ${
                            activeTxtMenu === "/" ? "active-txt-menu" : ""
                        }`}
                        onClick={() => handleClick("/")}
                    >
                        Trang chủ
                    </p>
                    <Divider />
                    <p
                        className={`txt-menu ${
                            activeTxtMenu === "#camnang"
                                ? "active-txt-menu"
                                : ""
                        }`}
                        onClick={() => handleClick("#camnang")}
                    >
                        Cẩm nang
                    </p>
                    <Divider />
                    <p
                        className={`txt-menu ${
                            activeTxtMenu === "#lien-he"
                                ? "active-txt-menu"
                                : ""
                        }`}
                        onClick={() => handleClick("#lien-he")}
                    >
                        Liên hệ hợp tác
                    </p>
                    <Divider />
                    <p
                        className={`txt-menu ${
                            activeTxtMenu === "#suc-khoe"
                                ? "active-txt-menu"
                                : ""
                        }`}
                        onClick={() => handleClick("#suc-khoe")}
                    >
                        Sức khỏe doanh nghiệp
                    </p>
                    <Divider />
                    <p
                        className={`txt-menu ${
                            activeTxtMenu === "#lien-he2"
                                ? "active-txt-menu"
                                : ""
                        }`}
                        onClick={() => handleClick("#lien-he2")}
                    >
                        Gói chuyển đổi số doanh nghiệp
                    </p>
                    <Divider />
                    <p
                        className={`txt-menu ${
                            activeTxtMenu === "#lien-he3"
                                ? "active-txt-menu"
                                : ""
                        }`}
                        onClick={() => handleClick("#lien-he3")}
                    >
                        Tuyển dụng
                    </p>
                    <Divider />
                    <p style={{ margin: "-20px 0 20px" }}>VỀ BOOKINGCARE</p>
                    <p
                        className={`txt-menu ${
                            activeTxtMenu === "#lien-he4"
                                ? "active-txt-menu"
                                : ""
                        }`}
                        onClick={() => handleClick("#lien-he4")}
                    >
                        Dành cho bệnh nhân
                    </p>
                    <Divider />
                    <p
                        className={`txt-menu ${
                            activeTxtMenu === "#lien-he5"
                                ? "active-txt-menu"
                                : ""
                        }`}
                        onClick={() => handleClick("#lien-he5")}
                    >
                        Dành cho bác sĩ
                    </p>
                    <Divider />
                    <p
                        className={`txt-menu ${
                            activeTxtMenu === "#lien-he6"
                                ? "active-txt-menu"
                                : ""
                        }`}
                        onClick={() => handleClick("#lien-he6")}
                    >
                        Vai trò của BookingCare
                    </p>
                    <Divider />
                </Drawer> */}
                <Drawer
                    title="MENU"
                    placement={placement}
                    closable={false}
                    onClose={onClose}
                    open={open}
                    key={placement}
                >
                    <p
                        className={`txt-menu ${
                            activeTxtMenu === "/" ? "active-txt-menu" : ""
                        }`}
                        onClick={() => handleClick("/")}
                    >
                        Trang chủ
                    </p>
                    <Divider />
                    <p
                        className={`txt-menu ${
                            activeTxtMenu === "#camnang"
                                ? "active-txt-menu"
                                : ""
                        }`}
                        onClick={() => handleClick("/admin/login-admin")}
                    >
                        Trang quản lý hệ thống
                    </p>
                    <Divider />
                    <p
                        className={`txt-menu ${
                            activeTxtMenu === "#lien-he"
                                ? "active-txt-menu"
                                : ""
                        }`}
                        onClick={handleClickDoctor}
                    >
                        Trang quản lý bác sĩ
                    </p>
                </Drawer>
                <LoginPage
                    openModalLogin={openModalLogin}
                    setOpenModalLogin={setOpenModalLogin}
                />
                <ModalCauHoi
                    openModalCauHoi={openModalCauHoi}
                    setOpenModalCauHoi={setOpenModalCauHoi}
                />
                <ModalDoiMK
                    openModalDoiMK={openModalDoiMK}
                    setOpenModalDoiMK={setOpenModalDoiMK}
                />
            </div>
        </>
    );
};

export default HeaderViewDoctor;
