/**
 * 产品建模
 * @author donghui
 */

import { Drawer, Tabs } from "antd";
import { FC, useCallback } from "react";
import { ProductModel } from "../../models/product";

const { TabPane } = Tabs;

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (data: ProductModel) => void;
}

const ProductModelConfig: FC<Props> = ({ visible, onClose, onSave }) => {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      maskClosable={false}
      visible={visible}
      onClose={handleClose}
      width="50vw"
      forceRender
      style={{ paddingTop: "4rem" }}
    >
      <Tabs defaultActiveKey="attributes">
        <TabPane tab="属性" key="attributes">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="事件" key="events">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="服务" key="services">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="规则" key="rules">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </Drawer>
  );
};

export default ProductModelConfig;
