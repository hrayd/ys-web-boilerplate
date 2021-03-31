import { FC, useCallback, useEffect } from "react";
import { Col, Form, Input, Modal, Row, Select, TreeSelect } from "antd";
import { Device } from "../../models/device";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../YSDatePicker";
import { DictDeviceStatus } from "../../constants/dict";
import dayjs from "dayjs";
import useCategoryTreeData from "../../data/useCategoryTreeData";

interface Props {
  visible: boolean;
  item?: Device;
  onSave: (data: Device) => void;
  onCancel: () => void;
}

const DemoForm: FC<Props> = ({ visible, item, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["device", "common", "dict"]);
  const { data: categoryTreeData } = useCategoryTreeData();

  useEffect(() => {
    if (visible && item && form) {
      form.setFieldsValue({
        ...item,
        lastDate: item.lastDate ? dayjs(item.lastDate) : null,
        validDate: dayjs(item.validDate),
      });
    }
  }, [visible, item, form]);

  const afterClose = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onOk = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        onSave({
          ...values,
          lastDate: values.lastDate ? values.lastDate.valueOf() : null,
          validDate: values.validDate.valueOf(),
          name: categoryTreeData.find((c) => c.id === values.name)?.name,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [form, onSave, categoryTreeData]);

  return (
    <Modal
      visible={visible}
      afterClose={afterClose}
      onOk={onOk}
      onCancel={onCancel}
      maskClosable={false}
      forceRender
      title={item ? t("common:edit") : t("common:add")}
      width={1000}
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ offset: 1, span: 15 }}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label={t("name")}
              name="name"
              rules={[{ required: true }]}
            >
              <TreeSelect
                treeDataSimpleMode
                treeData={categoryTreeData}
                treeDefaultExpandAll
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("code")}
              name="code"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("model")}
              name="model"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("manufacturer")}
              name="manufacturer"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("unit")}
              name="unit"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("person")}
              name="person"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("lastDate")} name="lastDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("validDate")}
              name="validDate"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("inspector")}
              name="inspector"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("status")}
              name="status"
              rules={[{ required: true }]}
            >
              <Select>
                {DictDeviceStatus.map((d) => (
                  <Select.Option key={d} value={d}>
                    {t(`dict:deviceStatus.${d}`)}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("remark")} name="remark">
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="id" name="id" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DemoForm;
