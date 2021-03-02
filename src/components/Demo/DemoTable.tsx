import dayjs from "dayjs";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NumberBoolean } from "../../models/common";
import { IDemo } from "../../models/demo";
import { DictSex } from "../../constants/dict";
import YSTable from "../YSTable";
import { DateFormatString } from "../../constants/strings";
import { Button, Popconfirm } from "antd";

interface Props {
  data: IDemo[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (item: IDemo) => void;
  onDel: (item: IDemo) => void;
}

const DemoTable: FC<Props> = ({ data, loading, onAdd, onEdit, onDel }) => {
  const { t } = useTranslation(["demo", "common"]);

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
      {
        title: t("common:operations"),
        dataIndex: "OPERATIONS",
        render: (v: unknown, r: IDemo) => (
          <>
            <Button
              size="small"
              onClick={() => onEdit(r)}
              title={t("common:edit")}
              type="link"
            >
              {t("common:edit")}
            </Button>
            <Popconfirm
              onConfirm={() => onDel(r)}
              title={t("common:confirmDelete")}
            >
              <Button size="small" title={t("common:delete")} type="link">
                {t("common:delete")}
              </Button>
            </Popconfirm>
          </>
        ),
      },
    ],
    [t, onEdit, onDel]
  );

  return (
    <YSTable
      rowKey="id"
      dataSource={data}
      loading={loading}
      columns={columns}
      tableTitle={t("table.title")}
      onAdd={onAdd}
      onReload={() => {}}
    />
  );
};

export default DemoTable;
