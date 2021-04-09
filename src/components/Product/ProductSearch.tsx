import { FC, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Select, Form, Row, Col, Button, Input } from "antd";
import useBaseData from "../../data/useBaseData";

interface Props {
  onSearch: (params?: Record<string, unknown>) => void;
}

const ProductSearch: FC<Props> = ({ onSearch }) => {
  const [form] = Form.useForm();
  const { t } = useTranslation(["product", "common"]);
  const { data: baseData } = useBaseData();
  const [sceneList, setSceneList] = useState<string[]>([]);

  const fieldList = useMemo(() => baseData?.fields || [], [baseData]);

  const handleSearch = useCallback(() => {
    onSearch(form.getFieldsValue());
  }, [onSearch, form]);

  const onReset = useCallback(() => {
    form.resetFields();
    onSearch();
  }, [onSearch, form]);

  return (
    <Form
      form={form}
      style={{
        padding: "24px",
        paddingBottom: 0,
      }}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
    >
      <Row style={{ borderBottom: "1px solid #f0f0f0" }}>
        <Col span={6}>
          <Form.Item label={t("modelName")} name="modelName">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={t("field")} name="field">
            <Select
              allowClear
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
        </Col>
        <Col span={6}>
          <Form.Item label={t("scenes")} name="scenes">
            <Select>
              {sceneList.map((f) => (
                <Select.Option key={f} value={f}>
                  {f}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col flex={1} style={{ marginBottom: "24px", textAlign: "right" }}>
          <Button
            type="primary"
            style={{ marginRight: "1rem" }}
            onClick={handleSearch}
            title={t("common:search")}
          >
            {t("common:search")}
          </Button>
          <Button onClick={onReset} title={t("common:reset")}>
            {t("common:reset")}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ProductSearch;
