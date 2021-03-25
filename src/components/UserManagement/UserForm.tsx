import { FC, useCallback, useEffect } from "react";
import { Form, Input, Modal, Radio } from "antd";
import { User } from "../../models/user";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

interface Props {
  visible: boolean;
  item?: User;
  onSave: (data: User) => void;
  onCancel: () => void;
}

const DemoForm: FC<Props> = ({ visible, item, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["user", "common"]);

  useEffect(() => {
    if (visible && item && form) {
      form.setFieldsValue(item);
    }
  }, [visible, item, form]);

  const afterClose = useCallback(() => {
    form.resetFields();
  }, [form]);

  const onOk = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        const now = dayjs().valueOf();
        onSave({
          ...values,
          createDate: values.createDate || now,
          updateDate: now,
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
    >
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ offset: 1, span: 15 }}
      >
        <Form.Item label={t("name")} name="name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label={t("username")}
          name="username"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("major")} name="major" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          label={t("department")}
          name="department"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={t("position")}
          name="position"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("rule")} name="rule" rules={[{ required: true }]}>
          <Radio.Group>
            <Radio value={1}>{t("dict:rule.1")}</Radio>
            <Radio value={0}>{t("dict:rule.0")}</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="id" name="id" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DemoForm;
