import { FC, useCallback, useEffect } from "react";
import { Col, Form, Input, Modal, Row, Select } from "antd";
import { Instrument } from "../../models/instrument";
import { useTranslation } from "react-i18next";
import { DatePicker } from "../YSDatePicker";
import { DictInstrumentStatus } from "../../constants/dict";
import dayjs from "dayjs";
import useStandards from "../../data/useStandards";

interface Props {
  visible: boolean;
  item?: Instrument;
  onSave: (data: Instrument) => void;
  onCancel: () => void;
}

const DemoForm: FC<Props> = ({ visible, item, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["instrument", "common", "dict"]);
  const { data: standardList } = useStandards();

  useEffect(() => {
    if (visible && item && form) {
      form.setFieldsValue({
        ...item,
        lastTraceDate: item.lastTraceDate ? dayjs(item.lastTraceDate) : null,
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
          lastTraceDate: values.lastTraceDate
            ? values.lastTraceDate.valueOf()
            : null,
          validDate: values.validDate.valueOf(),
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [form, onSave]);

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
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={t("standard")}
              name="standard"
              rules={[{ required: true }]}
            >
              <Select showSearch optionFilterProp="children">
                {standardList.map((s) => (
                  <Select.Option key={s.name} value={s.name}>
                    {s.name}
                  </Select.Option>
                ))}
              </Select>
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
              label={t("status")}
              name="status"
              rules={[{ required: true }]}
            >
              <Select>
                {DictInstrumentStatus.map((d) => (
                  <Select.Option key={d} value={d}>
                    {t(`dict:instrumentStatus.${d}`)}
                  </Select.Option>
                ))}
              </Select>
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
            <Form.Item label={t("lastTraceUnit")} name="lastTraceUnit">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("lastTraceDate")} name="lastTraceDate">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={t("lastTraceCode")} name="lastTraceCode">
              <Input />
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
