import dayjs from "dayjs";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NumberBoolean } from "../../models/common";
import { IDemo } from "../../models/demo";
import { DictSex } from "../../constants/dict";
import YSTable from "../YSTable";
import { DateFormatString } from "../../constants/strings";

interface Props {
  data: IDemo[];
  loading: boolean;
}

const DemoTable: FC<Props> = ({ data, loading }) => {
  const { t } = useTranslation("demo");

  const columns = useMemo(
    () => [
      {
        title: t("table.name"),
        dataIndex: "name",
        sorter: (a: IDemo, b: IDemo) => a.name.localeCompare(b.name),
      },
      {
        title: t("table.sex"),
        dataIndex: "sex",
        render: (v: NumberBoolean) => DictSex.find((d) => d.id === v)?.name,
        sorter: (a: IDemo, b: IDemo) => a.sex - b.sex,
      },
      {
        title: t("table.createDate"),
        dataIndex: "createDate",
        render: (v: number) => dayjs(v).format(DateFormatString),
        sorter: (a: IDemo, b: IDemo) => a.createDate - b.createDate,
      },
      {
        title: t("table.updateDate"),
        dataIndex: "updateDate",
        render: (v: number) => dayjs(v).format(DateFormatString),
        sorter: (a: IDemo, b: IDemo) => a.updateDate - b.updateDate,
      },
    ],
    [t]
  );

  return (
    <YSTable
      rowKey="id"
      dataSource={data}
      loading={loading}
      columns={columns}
      tableTitle={t("tableTitle")}
      onAdd={() => {}}
      onReload={() => {}}
    />
  );
};

export default DemoTable;
