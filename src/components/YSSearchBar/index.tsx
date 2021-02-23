/**
 * 搜索栏组件
 */
import {
  Component,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Col, Input, Row, Form, Button, FormItemProps } from "antd";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

interface SearchItem extends FormItemProps {
  render?: Component;
  name: string;
}

interface Props {
  items: SearchItem[];
  onSearch: (params?: Record<string, unknown>) => void;
  params?: Record<string, unknown>; // 受控搜索栏
}

const YSSearchBar: FC<Props> = ({ items, onSearch, params }) => {
  const [form] = Form.useForm();
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (params && form) {
      form.setFieldsValue(params);
    }
  }, [params, form]);

  const formItems = useMemo(() => {
    if (items.length < 4 || showMore) {
      return items.map((item) => {
        const { render, ...formItemProps } = item;
        return (
          <Col span={6} key={item.name}>
            <Form.Item {...formItemProps}>
              {render || <Input placeholder={`请输入${item.label}`} />}
            </Form.Item>
          </Col>
        );
      });
    }
    return items.slice(0, 3).map((item) => {
      const { render, ...formItemProps } = item;
      return (
        <Col span={6} key={item.name}>
          <Form.Item {...formItemProps}>
            {render || <Input placeholder={`请输入${item.label}`} />}
          </Form.Item>
        </Col>
      );
    });
  }, [items, showMore]);

  const onClickSearch = useCallback(() => onSearch(form.getFieldsValue()), [
    form,
    onSearch,
  ]);

  const onClickReset = useCallback(() => {
    form.resetFields();
    onSearch();
  }, [form, onSearch]);

  return (
    <Form
      form={form}
      style={{
        backgroundColor: "#FFF",
        marginBottom: "1rem",
        padding: "24px",
        paddingBottom: 0,
      }}
    >
      <Row gutter={24}>
        {formItems}
        <Col span={6} style={{ marginBottom: "24px" }}>
          <Button
            type="primary"
            style={{ marginRight: "1rem" }}
            onClick={onClickSearch}
            title="查询"
          >
            查询
          </Button>
          <Button onClick={onClickReset} title="重置">
            重置
          </Button>
          {items.length < 4 ? null : (
            <Button
              type="link"
              onClick={() => setShowMore((prev) => !prev)}
              title={showMore ? "收起" : "展开"}
            >
              {showMore ? (
                <>
                  收起 <UpOutlined />
                </>
              ) : (
                <>
                  展开 <DownOutlined />
                </>
              )}
            </Button>
          )}
        </Col>
      </Row>
    </Form>
  );
};

export default YSSearchBar;
