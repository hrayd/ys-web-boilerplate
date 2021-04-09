/**
 * 物模型中心/产品管理容器
 * @author donghui
 */
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../StyledComponents";
import ProductSearch from "./ProductSearch";
import ProductTable from "./ProductTable";
import { Product } from "../../models/product";
import {
  asyncDelProduct,
  asyncGetProductData,
  asyncPostProduct,
  asyncPutProduct,
} from "./product.services";
import ProductForm from "./ProductForm";
import { message } from "antd";

const ProductContainer: FC = () => {
  const [list, setList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<Product>();
  const [formVisible, setFormVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();

  const loadData = useCallback(() => {
    setLoading(true);
    asyncGetProductData((res) => {
      setLoading(false);
      if (res.isOk) {
        setList(res.data);
      }
    });
  }, []);

  useEffect(() => {
    loadData();
    return () => setList([]);
  }, [loadData]);

  const onAdd = useCallback(() => {
    setFormVisible(true);
  }, []);

  const onEdit = useCallback((editItem: Product) => {
    setItem(editItem);
    setFormVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setItem(undefined);
    setFormVisible(false);
  }, []);

  const onDel = useCallback((data: Product) => {
    asyncDelProduct(data, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        setList((prev) => prev.filter((p) => p.id !== data.id));
      }
    });
  }, []);

  const onSave = useCallback(
    (data: Product) => {
      setLoading(true);
      if (data.id) {
        asyncPutProduct(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            message.success("编辑成功");
            setList((prev) =>
              prev.map((p) => {
                if (p.id === data.id) {
                  return res.data;
                }
                return p;
              })
            );
            onClose();
          }
        });
      } else {
        asyncPostProduct(data, (res) => {
          setLoading(false);
          if (res.isOk) {
            message.success("新增成功");
            setList((prev) => [res.data, ...prev]);
            onClose();
          }
        });
      }
    },
    [onClose]
  );

  const onSearch = useCallback((newParams?: Record<string, unknown>) => {
    setParams(newParams);
  }, []);

  const onRefresh = useCallback(() => loadData(), [loadData]);

  const filteredList = useMemo(() => {
    if (!params) {
      return list;
    }
    let result = [...list];
    if (params.modelName) {
      result = result.filter((r) =>
        r.modelName.includes(params.modelName as string)
      );
    }
    if (params.field) {
      result = result.filter((r) => r.field === params.field);
    }
    if (params.scenes) {
      result = result.filter((r) => r.scenes === params.scenes);
    }
    return result;
  }, [params, list]);

  return (
    <StyledContainer>
      <ProductSearch onSearch={onSearch} />
      <ProductTable
        data={filteredList}
        loading={loading}
        onAdd={onAdd}
        onEdit={onEdit}
        onDel={onDel}
        onRefresh={onRefresh}
      />
      <ProductForm
        visible={formVisible}
        item={item}
        onSave={onSave}
        onCancel={onClose}
      />
    </StyledContainer>
  );
};

export default ProductContainer;
