import { Col, Modal, Row } from "antd";

const ModalLichHen = (props) => {
    const { isModalOpen, setIsModalOpen, item } = props;

    console.log("isModalOpen: ", isModalOpen);
    console.log("setIsModalOpen: ", setIsModalOpen);
    console.log("item: ", item);

    return (
        <>
            <Modal
                key={item?.id}
                style={{ marginTop: "100px" }}
                width={700}
                title={`Bệnh án chi tiết của ${item?.patientName}`}
                footer={null}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
            >
                <Row>
                    <Col span={24} md={24}>
                        {item?.benhAn}
                    </Col>
                </Row>
            </Modal>
        </>
    );
};
export default ModalLichHen;
