import { Form, Input } from "antd";
import Modal from "antd/lib/modal/Modal";
import log from "loglevel";
import { FC, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Category } from "../../models/category";

interface Props {
  item?: Category;
  visible: boolean;
  onSave: (item: Category) => void;
  onClose: () => void;
}

const CategoryForm: FC<Props> = ({ item, visible, onSave, onClose }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["category", "common"]);

  useEffect(() => {
    if (visible && form) {
      form.setFieldsValue(item);
    }
  }, [item, visible, form]);

  const onOk = useCallback(() => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
      })
      .catch((e) => {
        log.error(e);
      });
  }, [onSave, form]);

  const onCancel = useCallback(() => {
    onClose();
    form.resetFields();
  }, [onClose, form]);

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      afterClose={onCancel}
      maskClosable={false}
      title={item ? t("common:edit") : t("common:add")}
    >
      <Form form={form} wrapperCol={{ offset: 1, span: 16 }} labelCol={{ span: 6 }}>
        <Form.Item name="name" label={t("name")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="id" label="ID" hidden>
          <Input />
        </Form.Item>
        <Form.Item name="pid" label="PID" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;
