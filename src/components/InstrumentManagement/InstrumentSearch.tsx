import { FC } from "react";
import { useTranslation } from "react-i18next";
import YSSearchBar from "../YSSearchBar";
import { Select } from "antd";
import { DictInstrumentStatus } from "../../constants/dict";
import { DatePicker } from "../YSDatePicker";

interface Props {
  onSearch: (params?: Record<string, unknown>) => void;
}

const InstrumentSearch: FC<Props> = ({ onSearch }) => {
  const { t } = useTranslation(["instrument", "dict"]);
  return (
    <YSSearchBar
      items={[
        { name: "name", label: t("name") },
        { name: "code", label: t("code") },
        { name: "model", label: t("model") },
        { name: "manufacturer", label: t("manufacturer") },
        { name: "unit", label: t("unit") },
        { name: "person", label: t("person") },
        {
          name: "lastDate",
          label: t("lastDate"),
          render: <DatePicker.RangePicker style={{ width: "100%" }} />,
        },
        {
          name: "validDate",
          label: t("validDate"),
          render: <DatePicker.RangePicker style={{ width: "100%" }} />,
        },
        {
          name: "status",
          label: t("status"),
          render: (
            <Select allowClear placeholder={t("selectStatus")}>
              {DictInstrumentStatus.map((d) => (
                <Select.Option key={d} value={d}>
                  {t(`dict:instrumentStatus.${d}`)}
                </Select.Option>
              ))}
            </Select>
          ),
        },
      ]}
      onSearch={onSearch}
      name="USER"
    />
  );
};

export default InstrumentSearch;
