import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NumberBoolean } from "../../models/common";
import { Instrument } from "../../models/instrument";
import YSTable from "../YSTable";
import { Button, Popconfirm } from "antd";
import dayjs from "dayjs";
import { DateFormatString } from "../../constants/strings";

interface Props {
  data: Instrument[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (item: Instrument) => void;
  onDel: (item: Instrument) => void;
  onRefresh: () => void;
}

const DemoTable: FC<Props> = ({
  data,
  loading,
  onAdd,
  onEdit,
  onDel,
  onRefresh,
}) => {
  const { t } = useTranslation(["instrument", "common", "dict"]);

  const columns = useMemo(
    () => [
      {
        title: t("standard"),
        dataIndex: "standard",
        width: "10%",
      },
      {
        title: t("name"),
        dataIndex: "name",
        width: "10%",
      },
      {
        title: t("code"),
        dataIndex: "code",
        width: "12%",
      },
      {
        title: t("model"),
        dataIndex: "model",
        width: "12%",
      },
      {
        title: t("status"),
        dataIndex: "status",
        width: "8%",
        render: (v: NumberBoolean) => t(`dict:instrumentStatus.${v}`),
      },
      {
        title: t("lastTraceUnit"),
        dataIndex: "lastTraceUnit",
        width: "12%",
      },
      {
        title: t("lastTraceDate"),
        dataIndex: "lastTraceDate",
        width: "12%",
        render: (v: number) => dayjs(v).format(DateFormatString),
      },
      {
        title: t("common:operations"),
        dataIndex: "OPERATIONS",
        render: (v: unknown, r: Instrument) => (
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
      tableTitle={t("tableTitle")}
      onAdd={onAdd}
      onRefresh={onRefresh}
    />
  );
};

export default DemoTable;
