import { Form, Input, TreeSelect, Modal } from "antd";
import log from "loglevel";
import { FC, useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import useStandards from "../../data/useStandards";
import { Category } from "../../models/category";

interface Props {
  item?: Category;
  visible: boolean;
  onSave: (item: Category) => void;
  onClose: () => void;
  categoryList: Category[];
  selectedId?: string;
}

const getTreeData = (dataSource: Category[]) => {
  return [
    ...dataSource.map((d) => ({
      ...d,
      pId: d.pid,
      title: d.name,
      value: d.id,
    })),
  ];
};

const CategoryForm: FC<Props> = ({
  item,
  visible,
  onSave,
  onClose,
  categoryList,
  selectedId,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["category", "common"]);
  const { data: standardList } = useStandards();

  useEffect(() => {
    if (visible && form) {
      form.setFieldsValue({
        ...item,
        pid: item?.pid || selectedId,
      });
    }
  }, [item, visible, form, selectedId]);

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

  const treeData = useMemo(
    () =>
      getTreeData([
        ...categoryList,
        ...standardList.map((s) => ({ ...s, pid: null } as Category)),
      ]),
    [categoryList, standardList]
  );

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      onOk={onOk}
      afterClose={onCancel}
      maskClosable={false}
      title={item ? t("common:edit") : t("common:add")}
    >
      <Form
        form={form}
        wrapperCol={{ offset: 1, span: 16 }}
        labelCol={{ span: 6 }}
      >
        <Form.Item name="pid" label={t("pid")} rules={[{ required: true }]}>
          <TreeSelect
            treeData={treeData}
            style={{ width: "100%" }}
            treeDataSimpleMode
          />
        </Form.Item>
        <Form.Item name="name" label={t("name")} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="id" label="ID" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CategoryForm;
