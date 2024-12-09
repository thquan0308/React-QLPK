import {
    Button,
    Col,
    message,
    Pagination,
    Row,
    Space,
    Table,
    Input,
    Popconfirm,
    notification,
} from "antd";
import { useEffect, useState } from "react";
import AdminLayout from "../AdminLayout";
import { IoAddOutline } from "react-icons/io5";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
    deleteChuyenKhoa,
    fetchAllChuyenKhoa,
} from "../../../services/apiDoctor";
import CreateCK from "./CreateChuyenKhoa";
import UpdateCK from "./UpdateChuyenKhoa";
const { Search } = Input;
const { Column, ColumnGroup } = Table;

const QuanLyChuyenKhoa = () => {
    const [loadingTable, setLoadingTable] = useState(false);
    const [dataChuyenKhoa, setDataChuyenKhoa] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [totalChuyenKhoas, setTotalChuyenKhoas] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [openCreateChuyenKhoa, setOpenCreateChuyenKhoa] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [dataUpdate, setDataUpdate] = useState("");

    // dùng để search
    const [tenCK, setTenCK] = useState("");

    useEffect(() => {
        fetchListCK();
    }, [currentPage, pageSize, tenCK]);

    const fetchListCK = async () => {
        let query = `page=${currentPage}&limit=${pageSize}`;

        // Thêm tham số tìm kiếm vào query nếu có
        if (tenCK) {
            query += `&name=${encodeURIComponent(tenCK)}`;
        }

        setLoadingTable(true);
        const res = await fetchAllChuyenKhoa(query);
        if (res && res.data) {
            setDataChuyenKhoa(res.data);
            setTotalChuyenKhoas(res.totalChuyenKhoa); // Lưu tổng số bác sĩ
        }
        setLoadingTable(false);
    };

    const handleDeleteCK = async (id) => {
        const res = await deleteChuyenKhoa(id);
        if (res) {
            notification.success({
                message: "Xóa thông tin chuyên khoa",
                description: "Bạn đã xoá thành công",
            });
            await fetchListCK();
        } else {
            notification.error({
                message: "Xoá chuyên khoa",
                description: JSON.stringify(res.message),
            });
        }
    };

    const onChangePagination = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize); // Cập nhật pageSize nếu cần
    };
    const cancelXoa = (e) => {
        console.log(e);
        message.error("Huỷ xoá");
    };

    return (
        <AdminLayout
            pageTitle="Quản lý chuyên khoa"
            setTenCK={setTenCK}
            placeholder={"Tìm kiếm chuyên khoa ở đây..."}
        >
            <Row>
                <Col
                    span={24}
                    style={{ padding: "0 0 20px", fontSize: "18px" }}
                >
                    <span style={{ fontWeight: "500", color: "navy" }}>
                        THÔNG TIN CHUYÊN KHOA
                    </span>
                    <Space size={10} style={{ float: "right" }}>
                        <Button
                            type="primary"
                            style={{
                                lineHeight: "15px",
                            }}
                            icon={<IoAddOutline size={20} />}
                            className="custom-row"
                            onClick={() => {
                                setOpenCreateChuyenKhoa(true);
                            }}
                        >
                            Thêm thông tin chuyên khoa
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col xs={24} sm={12} md={24} span={24}>
                    <Table
                        dataSource={dataChuyenKhoa}
                        loading={loadingTable}
                        pagination={false} // Tắt phân trang mặc định của Table
                        scroll={{ x: "max-content" }}
                        rowClassName="custom-row" // Thêm lớp cho hàng
                        headerClassName="custom-header" // Lớp cho tiêu đề
                        rowKey="_id" // Hoặc key tương ứng
                    >
                        <Column
                            title={<p className="title-col-style">STT</p>}
                            dataIndex="stt"
                            key="stt"
                            render={(_, record, index) => {
                                //   console.log("index: ", index+1);
                                return (
                                    <>
                                        {index +
                                            1 +
                                            (currentPage - 1) * pageSize}
                                    </>
                                );
                            }}
                        />

                        <Column
                            title={<p className="title-col-style">Image</p>}
                            dataIndex="image"
                            key="image"
                            render={(text) => {
                                const imageUrl = `${
                                    import.meta.env.VITE_BACKEND_URL
                                }/uploads/${text}`;
                                console.log("Image URL:", imageUrl); // In ra URL để kiểm tra
                                return (
                                    <img
                                        src={imageUrl}
                                        alt={`chuyen khoa ${text}`}
                                        style={{
                                            width: 100,
                                            height: 100,
                                            objectFit: "cover",
                                            borderRadius: "10px",
                                            border: "1px solid red",
                                        }}
                                    />
                                );
                            }}
                        />
                        <Column
                            title={
                                <p className="title-col-style">
                                    Tên chuyên khoa
                                </p>
                            }
                            dataIndex="name"
                            key="name"
                        />
                        <Column
                            title={<p className="title-col-style">Mô tả</p>}
                            dataIndex="description"
                            key="description"
                            width={500}
                            render={(text) => {
                                if (!text) {
                                    return <div></div>; // Trả về một div trống nếu text là undefined hoặc falsy
                                }

                                return (
                                    <div
                                        className="truncate"
                                        dangerouslySetInnerHTML={{
                                            __html: text,
                                        }}
                                        style={{
                                            display: "-webkit-box",
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            WebkitLineClamp: 2, // Giới hạn số dòng là 2
                                            whiteSpace: "normal", // Đảm bảo dòng được gói đúng cách
                                        }}
                                    />
                                ); // Hiển thị nội dung HTML
                            }}
                        />

                        <Column
                            title={<p className="title-col-style">Chức năng</p>}
                            key="action"
                            render={(_, record) => (
                                <Space size="middle">
                                    <EyeOutlined
                                        style={{
                                            color: "green",
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            console.log("record: ", record);
                                            message.info(
                                                "xem tạm bên ngoài đi"
                                            );
                                            // setOpenDrawerDetail(true)
                                            // setDataDetail(record)
                                        }}
                                    />

                                    <EditOutlined
                                        style={{ color: "orange" }}
                                        onClick={() => {
                                            console.log(
                                                "record update: ",
                                                record
                                            );
                                            setOpenModalUpdate(true);
                                            setDataUpdate(record);
                                        }}
                                    />

                                    <Popconfirm
                                        title={`xóa chuyên khoa`}
                                        description="Bạn có chắc chắn muốn xoá?"
                                        onConfirm={() =>
                                            handleDeleteCK(record._id)
                                        }
                                        onCancel={cancelXoa}
                                        okText="Xác nhận xoá"
                                        cancelText="Không Xoá"
                                    >
                                        <DeleteOutlined
                                            style={{ color: "red" }}
                                        />
                                    </Popconfirm>
                                </Space>
                            )}
                        />
                    </Table>

                    <Pagination
                        style={{
                            fontSize: "17px",
                            display: "flex",
                            justifyContent: "center",
                            margin: "10px 0 20px 0",
                        }}
                        current={currentPage}
                        pageSize={pageSize}
                        total={totalChuyenKhoas}
                        onChange={(page, pageSize) =>
                            onChangePagination(page, pageSize)
                        } // Gọi hàm onChangePagination khi thay đổi trang
                        showSizeChanger={true}
                        showQuickJumper={true}
                        showTotal={(total, range) => (
                            <div>
                                {range[0]}-{range[1]} trên {total} chuyên khoa
                            </div>
                        )}
                        locale={{
                            items_per_page: "dòng / trang", // Điều chỉnh "items per page"
                            jump_to: "Đến trang số", // Điều chỉnh "Go to"
                            jump_to_confirm: "Xác nhận", // Điều chỉnh "Go"
                            page: "", // Bỏ hoặc thay đổi chữ "Page" nếu cần
                        }}
                    />

                    <CreateCK
                        openCreateChuyenKhoa={openCreateChuyenKhoa}
                        setOpenCreateChuyenKhoa={setOpenCreateChuyenKhoa}
                        fetchListCK={fetchListCK}
                    />

                    <UpdateCK
                        fetchListCK={fetchListCK}
                        setOpenModalUpdate={setOpenModalUpdate}
                        dataUpdate={dataUpdate}
                        openModalUpdate={openModalUpdate}
                    />
                </Col>
            </Row>
        </AdminLayout>
    );
};
export default QuanLyChuyenKhoa;
