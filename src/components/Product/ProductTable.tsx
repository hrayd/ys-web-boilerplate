/**
 * 产品表格
 * @author donghui
 */
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Product } from "../../models/product";
import YSTable from "../YSTable";
import { Button, Popconfirm } from "antd";

interface Props {
  data: Product[];
  loading: boolean;
  onAdd: () => void;
  onEdit: (item: Product) => void;
  onDel: (item: Product) => void;
  onRefresh: () => void;
  onModel: (item: Product) => void;
}

const ProductTable: FC<Props> = ({
  data,
  loading,
  onAdd,
  onEdit,
  onDel,
  onRefresh,
  onModel,
}) => {
  const { t } = useTranslation(["product", "common"]);

  const columns = useMemo(
    () => [
      {
        title: t("modelName"),
        dataIndex: "modelName",
        width: "20%",
        sorter: (a: Product, b: Product) =>
          a.modelName.localeCompare(b.modelName),
      },
      {
        title: t("uid"),
        dataIndex: "uid",
        width: "20%",
      },
      {
        title: t("field"),
        dataIndex: "field",
        width: "20%",
        sorter: (a: Product, b: Product) => a.field.localeCompare(b.field),
      },
      {
        title: t("scenes"),
        dataIndex: "scenes",
        width: "20%",
        sorter: (a: Product, b: Product) => a.scenes.localeCompare(b.scenes),
      },
      {
        title: t("common:operations"),
        dataIndex: "OPERATIONS",
        render: (v: unknown, r: Product) => (
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
              title={t("model")}
              type="link"
              onClick={() => onModel(r)}
            >
              {t("model")}
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
    [t, onEdit, onDel, onModel]
  );

  return (
    <YSTable
      rowKey="uid"
      dataSource={data}
      loading={loading}
      columns={columns}
      tableTitle={t("tableTitle")}
      onAdd={onAdd}
      onRefresh={onRefresh}
    />
  );
};

export default ProductTable;
