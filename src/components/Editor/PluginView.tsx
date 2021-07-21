import { Plugin } from "../../models/plugin";
import { FC, useMemo } from "react";

interface Props {
  plugin: Plugin;
}

const PluginView: FC<Props> = ({ plugin }) => {
  const pluginProps = useMemo<Record<string, any>>(() => {
    const p: Record<string, any> = {};
    plugin.attributes?.forEach((a) => (p[a.name] = a.defaultValue));
    return p;
  }, [plugin]);

  if (!plugin) return null;

  return <plugin.component {...pluginProps} />;
};

export default PluginView;
