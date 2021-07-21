import { ComponentClass, FC } from "react";

export interface Plugin {
  component: FC | ComponentClass;
  attributes?: PluginAttribute[];
  name: string;
  minWidth?: number;
  minHeight?: number;
}

interface PluginAttribute {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: any;
}
