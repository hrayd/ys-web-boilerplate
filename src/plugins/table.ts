import { Table } from "antd";
import { Plugin } from "../models/plugin";

const TablePlugin: Plugin = {
  component: Table,
  attributes: [
    { name: "columns", label: "列项" },
    { name: "dataSource", label: "数据源" },
  ],
  minWidth: 2,
  minHeight: 2,
  name: "table",
};

export default TablePlugin;
