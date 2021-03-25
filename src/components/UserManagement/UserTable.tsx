import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NumberBoolean, Rule } from "../../models/common";
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
  onToggleStatus: (item: User) => void;
  onResetPwd: (item: User) => void;
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
  const { t } = useTranslation(["user", "common", "dict"]);

  const columns = useMemo(
    () => [
      {
        title: t("name"),
        dataIndex: "name",
        width: "10%",
        sorter: (a: User, b: User) => a.name.localeCompare(b.name),
      },
      {
        title: t("username"),
        dataIndex: "username",
        width: "10%",
        sorter: (a: User, b: User) => a.username.localeCompare(b.username),
      },
      {
        title: t("major"),
        dataIndex: "major",
        width: "10%",
        sorter: (a: User, b: User) => a.major.localeCompare(b.major),
      },
      {
        title: t("department"),
        dataIndex: "department",
        width: "10%",
        sorter: (a: User, b: User) => a.department.localeCompare(b.department),
      },
      {
        title: t("position"),
        dataIndex: "position",
        width: "10%",
        sorter: (a: User, b: User) => a.position.localeCompare(b.position),
      },
      {
        title: t("rule"),
        dataIndex: "rule",
        width: "10%",
        render: (v: Rule) => t(`dict:rule.${v}`),
        sorter: (a: User, b: User) => (a.rule - b.rule),
      },
      {
        title: t("status"),
        dataIndex: "status",
        width: "10%",
        render: (v: NumberBoolean) => t(`dict:userStatus.${v}`),
        sorter: (a: User, b: User) => (a.status - b.status),
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
            <Button
              size="small"
              onClick={() => onToggleStatus(r)}
              title={r.status === 1 ? t("freeze") : t("unfreeze")}
              type="link"
            >
              {r.status === 1 ? t("freeze") : t("unfreeze")}
            </Button>
            <Button
              size="small"
              onClick={() => onResetPwd(r)}
              title={t("resetPwd")}
              type="link"
            >
              {t("resetPwd")}
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
