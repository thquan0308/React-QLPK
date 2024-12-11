import {
    Avatar,
    Col,
    message,
    Pagination,
    Popconfirm,
    Row,
    Space,
    Switch,
    Table,
    Tag,
} from "antd";
import AdminLayout from "../AdminLayout";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, UserOutlined } from "@ant-design/icons";
import { deleteAccKH, fetchAllAccKH, khoaAccKH } from "../../../services/api";
const { Column, ColumnGroup } = Table;

const QuanLyBenhNhan = () => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [dataKH, setDataKH] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalKHs, setTotalKHs] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const [openCreateKH, setOpenCreateKH] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState("");

    // dùng để search
    const [tenKH, setTenKH] = useState("");

    useEffect(() => {
        fetchTatCaKH();
    }, [currentPage, pageSize, tenKH]);

    const fetchTatCaKH = async () => {
        let query = `page=${currentPage}&limit=${pageSize}`;

        // Thêm tham số tìm kiếm vào query nếu có
        if (tenKH) {
            query += `&tenKH=${encodeURIComponent(tenKH)}`;
        }

        setLoadingTable(true);
        const res = await fetchAllAccKH(query);
        if (res && res.data) {
            setDataKH(res.data);
            setTotalKHs(res.totalKH); // Lưu tổng số kh
        }
        setLoadingTable(false);
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "stt",
            key: "stt",
            render: (_, record, index) => {
                //   console.log("index: ", index+1);
                return <>{index + 1 + (currentPage - 1) * pageSize}</>;
            },
            width: 80,
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            render: (text) => <a>{text}</a>,
            // width: 180,
        },
        {
            title: "Họ Và Tên",
            dataIndex: "firstName",
            key: "firstName",
            render: (text, record) => (
                <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar
                            src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${
                                record.image
                            }`}
                            size={50}
                            icon={<UserOutlined />}
                        />
                        <p style={{ padding: "10px 20px" }}>
                            {record.firstName} {record.lastName} <br />
                            địa chỉ: {record.address}
                        </p>
                    </div>
                </>
            ),
            // width: 200,
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
            render: (text) => <a>{text}</a>,
            // width: 100,
        },
        {
            title: "Trạng thái",
            dataIndex: "isActive",
            key: "isActive",
            render: (text) => (
                <a>
                    {text ? (
                        <Tag color="success">Đang hoạt động</Tag>
                    ) : (
                        <Tag color="error">Đang khóa</Tag>
                    )}
                </a>
            ),
            // width: 100
        },
        {
            title: "Chức năng",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title={`Xóa tài khoản`}
                        description="Bạn có chắc chắn muốn Xóa?"
                        onConfirm={() => handleDeleteAccKH(record._id)}
                        onCancel={() => message.error("hủy xóa")}
                        okText="Xác nhận xoá"
                        cancelText="Không Xoá"
                    >
                        <DeleteOutlined
                            style={{ color: "red", fontSize: "20px" }}
                        />
                    </Popconfirm>

                    <Switch
                        checked={record.isActive} // Giả sử là `isActive` trong dữ liệu tài khoản
                        onChange={(checked) => onChange(checked, record)}
                        checkedChildren="ON"
                        unCheckedChildren="OFF"
                    />
                </Space>
            ),
            width: 200,
        },
    ];

    const onChange = async (checked, record) => {
        const updatedStatus = checked ? true : false; // true nếu bật (mở tài khoản), false nếu tắt (khóa tài khoản)

        try {
            // Gửi yêu cầu cập nhật trạng thái tài khoản đến server (ví dụ, sử dụng fetch hoặc axios)
            const response = await khoaAccKH(record._id, updatedStatus);
            if (response.data) {
                // Cập nhật trạng thái thành công, bạn cần cập nhật lại state của `isActive`
                // Ví dụ: cập nhật trạng thái trong data table của bạn
                setDataKH((prevData) => {
                    return prevData.map((acc) =>
                        acc._id === record._id
                            ? { ...acc, isActive: updatedStatus }
                            : acc
                    );
                });
                message.success("Cập nhật trạng thái thành công!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            message.error("Cập nhật trạng thái thất bại!");
        }
    };

    const onChangePagination = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize); // Cập nhật pageSize nếu cần
    };

    const handleDeleteAccKH = async (id) => {
        let dlt = await deleteAccKH(id);
        if (dlt && dlt.data) {
            message.success(dlt.message);
            await fetchTatCaKH();
        } else {
            message.error(dlt.message);
        }
    };

    return (
        <>
            <AdminLayout
                pageTitle="Quản lý tài khoản bệnh nhân"
                setTenKH={setTenKH}
                placeholder={"Tìm kiếm tài bệnh nhân ở đây..."}
            >
                <Row>
                    <Col
                        span={24}
                        style={{ padding: "0 0 20px", fontSize: "18px" }}
                    >
                        <span style={{ fontWeight: "500", color: "navy" }}>
                            THÔNG TIN KHÁCH HÀNG
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col xs={24} sm={12} md={24} span={24}>
                        <Table
                            pagination={false}
                            loading={loadingTable}
                            dataSource={dataKH}
                            columns={columns}
                        />
                        <Pagination
                            style={{
                                fontSize: "17px",
                                display: "flex",
                                justifyContent: "center",
                                margin: "10px 0 20px 0",
                            }}
                            current={currentPage}
                            pageSize={pageSize}
                            total={totalKHs}
                            onChange={(page, pageSize) =>
                                onChangePagination(page, pageSize)
                            } // Gọi hàm onChangePagination khi thay đổi trang
                            showSizeChanger={true}
                            showQuickJumper={true}
                            showTotal={(total, range) => (
                                <div>
                                    {range[0]}-{range[1]} trên {total} tài khoản
                                </div>
                            )}
                            locale={{
                                items_per_page: "dòng / trang", // Điều chỉnh "items per page"
                                jump_to: "Đến trang số", // Điều chỉnh "Go to"
                                jump_to_confirm: "Xác nhận", // Điều chỉnh "Go"
                                page: "", // Bỏ hoặc thay đổi chữ "Page" nếu cần
                            }}
                        />
                    </Col>
                </Row>
            </AdminLayout>
        </>
    );
};
export default QuanLyBenhNhan;
