import { Avatar, Button, Col, Row } from "antd";
import Footer from "../../../components/TrangChu/Footer/Footer";
import HeaderViewDoctor from "../../../components/TrangChu/Header/HeaderViewDoctor";
import "../LichHen/lichhen.scss";
import { IoHomeSharp } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import { MdAccessTimeFilled } from "react-icons/md";
import { BsCalendar2Date } from "react-icons/bs";
import { useEffect, useState } from "react";
import { fetchAllChuyenKhoa } from "../../../services/apiDoctor";
import { useNavigate } from "react-router-dom";

const ChuyenKhoa = () => {
    const [dataAllDoctor, setDataAllDoctor] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchListDoctor();
    }, []);

    const fetchListDoctor = async () => {
        let query = "";
        const res = await fetchAllChuyenKhoa(query);
        console.log("res all doctor: ", res);
        if (res && res.data) {
            setDataAllDoctor(res.data);
        }
    };

    const handleRedirectChuyenKhoa = (item) => {
        navigate(`/user/view-chuyen-khoa-kham?idChuyenKhoa=${item}`);
    };

    return (
        <>
            <HeaderViewDoctor />
            <Row>
                <Col span={18} className="col-body">
                    <Row>
                        <Col span={24}>
                            <p className="txt-title">
                                <IoHomeSharp /> / Chuyên khoa khám
                            </p>
                            {/* <Divider/> */}
                            {/* <hr style={{border: "1px solid rgb(243, 243, 243)"}} /> */}
                        </Col>
                        <Col span={24}>
                            <p className="title-lichhen"> Chuyên khoa khám</p>
                        </Col>

                        {dataAllDoctor?.length > 0 ? (
                            dataAllDoctor.map((item, index) => (
                                <Col
                                    key={index}
                                    span={24}
                                    style={{
                                        padding: "10px 15px 0",
                                        cursor: "pointer",
                                    }}
                                    onClick={() =>
                                        handleRedirectChuyenKhoa(item._id)
                                    }
                                >
                                    <Row>
                                        <Col span={3}>
                                            <Avatar
                                                style={{
                                                    border: "1px solid green",
                                                }}
                                                src={`${
                                                    import.meta.env
                                                        .VITE_BACKEND_URL
                                                }/uploads/${item?.image}`}
                                                shape="square"
                                                size={120}
                                                icon={<UserOutlined />}
                                            />
                                        </Col>
                                        <Col
                                            span={21}
                                            className="box-title-doctor"
                                        >
                                            <span className="txt-Title-doctor-noi-bat">
                                                {item.name}
                                            </span>{" "}
                                            <br />
                                        </Col>
                                    </Row>
                                    <hr
                                        style={{
                                            border: "1px solid rgb(243, 243, 243)",
                                        }}
                                    />
                                </Col>
                            ))
                        ) : (
                            <Col
                                span={24}
                                style={{ textAlign: "center", padding: "20px" }}
                            >
                                <p style={{ color: "gray", fontSize: "18px" }}>
                                    Chưa có chuyên khoa khám nào.
                                </p>
                            </Col>
                        )}
                    </Row>
                </Col>
            </Row>
            {/* <Footer/> */}
        </>
    );
};

export default ChuyenKhoa;
