import { FC } from "react";
import { useTranslation } from "react-i18next";
import YSSearchBar from "../YSSearchBar";
import { Select } from "antd";
import { DictSex } from "../../constants/dict";

interface Props {
  onSearch: (params?: Record<string, unknown>) => void;
}

const DeviceSearch: FC<Props> = ({ onSearch }) => {
  const {t} = useTranslation(["device", "dict"])
  return (
    <YSSearchBar
      items={[
        { name: "name", label: t("name") },
        { name: "major", label: t("major") },
        { name: "status", label: t("status"), render: (
          <Select allowClear placeholder={t("selectStatus")}>
            {DictSex.map(d => (
              <Select.Option key={d} value={d}>{t(`dict:deviceStatus.${d}`)}</Select.Option>
            ))}
          </Select>
        ) },
        { name: "rule", label: t("rule"), render: (
          <Select allowClear placeholder={t("selectRule")}>
            {DictSex.map(d => (
              <Select.Option key={d} value={d}>{t(`dict:rule.${d}`)}</Select.Option>
            ))}
          </Select>
        ) },
        { name: "devicename", label: t("devicename") },
        { name: "department", label: t("department") },
        { name: "position", label: t("position") },
      ]}
      onSearch={onSearch}
      name="USER"
    />
  );
};

export default DeviceSearch;
