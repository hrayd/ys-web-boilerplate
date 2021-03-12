import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NumberBoolean, RuleValue } from "../../models/common";
import { User } from "../../models/user";
import YSTable from "../YSTable";
import { Button, Popconfirm } from "antd";

interface Props {
  data: User[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (item: User) => void;
  onDel: (item: User) => void;
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
  const { t } = useTranslation(["user", "common", "dict"]);

  const columns = useMemo(
    () => [
      {
        title: t("name"),
        dataIndex: "name",
        sorter: (a: User, b: User) => a.name.localeCompare(b.name),
      },
      {
        title: t("username"),
        dataIndex: "username",
      },
      {
        title: t("major"),
        dataIndex: "major",
      },
      {
        title: t("department"),
        dataIndex: "department",
      },
      {
        title: t("position"),
        dataIndex: "position",
      },
      {
        title: t("rule"),
        dataIndex: "rule",
        render: (v: RuleValue) => t(`dict:rule.${v}`),
      },
      {
        title: t("status"),
        dataIndex: "status",
        render: (v: NumberBoolean) => t(`dict:userStatus.${v}`),
      },
      {
        title: t("common:operations"),
        dataIndex: "OPERATIONS",
        render: (v: unknown, r: User) => (
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
