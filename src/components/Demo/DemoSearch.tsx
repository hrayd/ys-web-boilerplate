import { FC } from "react";
import { useTranslation } from "react-i18next";
import YSSearchBar from "../YSSearchBar";
import { Select } from "antd";
import { DictSex } from "../../constants/dict";

interface Props {
  onSearch: (params?: Record<string, unknown>) => void;
}

const DemoSearch: FC<Props> = ({ onSearch }) => {
  const {t} = useTranslation("demo")
  return (
    <YSSearchBar
      items={[
        { name: "name", label: t("name") },
        { name: "sex", label: t("sex"), render: (
          <Select allowClear placeholder={t("selectSex")}>
            {DictSex.map(d => (
              <Select.Option key={d.id} value={d.id}>{d.name}</Select.Option>
            ))}
          </Select>
        ) },
      ]}
      onSearch={onSearch}
    />
  );
};

export default DemoSearch;
