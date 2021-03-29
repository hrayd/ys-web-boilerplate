import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NumberBoolean } from "../../models/common";
import { Device } from "../../models/device";
import YSTable from "../YSTable";
import { Button, Popconfirm } from "antd";
import dayjs from "dayjs";
import { DateFormatString } from "../../constants/strings";

interface Props {
  data: Device[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (item: Device) => void;
  onDel: (item: Device) => void;
  onRefresh: () => void;
  onToggleStatus: (item: Device) => void;
  onResetPwd: (item: Device) => void;
}

const DemoTable: FC<Props> = ({
  data,
  loading,
  onAdd,
  onEdit,
  onDel,
  onRefresh,
  onToggleStatus,
  onResetPwd,
}) => {
  const { t } = useTranslation(["device", "common", "dict"]);

  const columns = useMemo(
    () => [
      {
        title: t("name"),
        dataIndex: "name",
        width: "10%",
        sorter: (a: Device, b: Device) => a.name.localeCompare(b.name),
      },
      {
        title: t("model"),
        dataIndex: "model",
        width: "10%",
        sorter: (a: Device, b: Device) => a.model.localeCompare(b.model),
      },
      {
        title: t("status"),
        dataIndex: "status",
        width: "8%",
        render: (v: NumberBoolean) => t(`dict:deviceStatus.${v}`),
        sorter: (a: Device, b: Device) => (a.status - b.status),
      },
      {
        title: t("lastDate"),
        dataIndex: "lastDate",
        width: "12%",
        render: (v: number) => dayjs(v).format(DateFormatString),
        sorter: (a: Device, b: Device) => (a.lastDate-b.lastDate),
      },
      {
        title: t("unit"),
        dataIndex: "unit",
        width: "10%",
        sorter: (a: Device, b: Device) => a.unit.localeCompare(b.unit),
      },
      {
        title: t("person"),
        dataIndex: "person",
        width: "10%",
        sorter: (a: Device, b: Device) => a.person.localeCompare(b.person),
      },
      {
        title: t("common:operations"),
        dataIndex: "OPERATIONS",
        render: (v: unknown, r: Device) => (
          <>
            <Button
              size="small"
              onClick={() => onEdit(r)}
              title={t("common:edit")}
              type="link"
            >
              {t("common:edit")}
            </Button>
            <Button
              size="small"
              onClick={() => onEdit(r)}
              title={t("common:detail")}
              type="link"
            >
              {t("common:detail")}
            </Button>
            <Button
              size="small"
              onClick={() => onEdit(r)}
              title={t("inspectRecord")}
              type="link"
            >
              {t("inspectRecord")}
            </Button>
            <Popconfirm
              onConfirm={() => onDel(r)}
              title={t("common:confirmDelete")}
            >
              <Button size="small" title={t("common:delete")} type="link">
                {t("common:delete")}
              </Button>
            </Popconfirm>
            <Button
              size="small"
              onClick={() => onEdit(r)}
              title={t("printTag")}
              type="link"
            >
              {t("printTag")}
            </Button>
          </>
        ),
      },
    ],
    [t, onEdit, onDel, onResetPwd, onToggleStatus]
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
