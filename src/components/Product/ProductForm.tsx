import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { Form, Input, Modal, Select } from "antd";
import { Product } from "../../models/product";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import log from "loglevel";
import useBaseData from "../../data/useBaseData";

interface Props {
  visible: boolean;
  item?: Product;
  onSave: (data: Product) => void;
  onCancel: () => void;
}

const ProductForm: FC<Props> = ({ visible, item, onSave, onCancel }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["product", "common"]);
  const { data: baseData } = useBaseData();
  const [sceneList, setSceneList] = useState<string[]>([]);

  const fieldList = useMemo(() => baseData?.fields || [], [baseData]);

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
        log.error(e);
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
        wrapperCol={{ offset: 1, span: 16 }}
      >
        <Form.Item
          label={t("modelName")}
          name="modelName"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={t("field")} name="field" rules={[{ required: true }]}>
          <Select
            onChange={(v) => {
              setSceneList(fieldList.find((f) => f.name === v)?.scenes || []);
              form.setFieldsValue({ scenes: null });
            }}
          >
            {fieldList.map((f) => (
              <Select.Option key={f.name} value={f.name}>
                {f.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label={t("scenes")} name="scenes">
          <Select>
            {sceneList.map((f) => (
              <Select.Option key={f} value={f}>
                {f}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="uid" name="uid" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductForm;
