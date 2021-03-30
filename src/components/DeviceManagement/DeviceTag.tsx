import { Button, Descriptions, Modal } from "antd";
import { FC, useMemo, useRef } from "react";
import styled from "styled-components";
import { Device } from "../../models/device";
import QRCode from "qrcode.react";
import ReactToPrint from "react-to-print";

interface Props {
  device?: Device;
  visible?: boolean;
  onClose: () => void;
}

const DeviceTag: FC<Props> = ({ device, visible, onClose }) => {
  const tagRef = useRef(null);

  const footer = useMemo(
    () => (
      <>
        <Button onClick={onClose}>取消</Button>
        <ReactToPrint
          content={() => tagRef.current}
          trigger={() => <Button type="primary">打印</Button>}
          pageStyle="margin:0"
          documentTitle="设备标签"
        />
      </>
    ),
    [onClose]
  );

  return (
    <Modal
      visible={visible}
      onCancel={onClose}
      title="设备标签"
      footer={footer}
    >
      <StyledTag ref={tagRef}>
        <QRCode value="123" size={150} style={{ margin: 25 }} />
        <StyledInfo>
          <Descriptions
            column={1}
            labelStyle={{ fontSize: "1rem" }}
            contentStyle={{ fontSize: "1rem" }}
          >
            <Descriptions.Item label="设备名称">
              {device?.name}
            </Descriptions.Item>
            <Descriptions.Item label="规格型号">
              {device?.model}
            </Descriptions.Item>
            <Descriptions.Item label="出厂编号">
              {device?.code}
            </Descriptions.Item>
          </Descriptions>
        </StyledInfo>
      </StyledTag>
    </Modal>
  );
};

export default DeviceTag;

const StyledTag = styled.div`
  width: 470px;
  height: 200px;
  display: flex;
  flex-direction: row;
  border: 1px solid #b2b2b2;
`;

const StyledInfo = styled.div`
  flex: 1;
  padding: 2.5rem 0;
`;
