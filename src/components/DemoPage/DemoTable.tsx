/**
 * Demo表格
 */
import dayjs from "dayjs";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { IDemo } from "../../models/demo";
import { YSTable } from "../base";
import { DateFormatString } from "../../constants/strings";
import { Button, Popconfirm } from "antd";
import { Sex } from "../../models/dict";

interface Props {
  data: IDemo[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (item: IDemo) => void;
  onDel: (item: IDemo) => void;
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
  const { t } = useTranslation(["demo", "common", "dict"]);

  const columns = useMemo(
    () => [
      {
        title: t("name"),
        dataIndex: "name",
        sorter: (a: IDemo, b: IDemo) => a.name.localeCompare(b.name),
      },
      {
        title: t("sex"),
        dataIndex: "sex",
        render: (v: Sex) => t(`dict:sex.${v}`),
        sorter: (a: IDemo, b: IDemo) => a.sex - b.sex,
      },
      {
        title: t("createDate"),
        dataIndex: "createDate",
        render: (v: number) => dayjs(v).format(DateFormatString),
        sorter: (a: IDemo, b: IDemo) => a.createDate - b.createDate,
      },
      {
        title: t("updateDate"),
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
      onRefresh={onRefresh}
    />
  );
};

export default DemoTable;
