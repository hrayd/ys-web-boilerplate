import { Button } from "antd";
import { Plugin } from "../models/plugin";

export default {
  component: Button,
  name: "button",
  attributes: [{ name: "children", label: "文字", defaultValue: "BTN" }],
} as Plugin;
