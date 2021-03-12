import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { StyledContainer } from "../StyledComponents";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";
import { User } from "../../models/user";
import {
  asyncDelUser,
  asyncGetUserData,
  asyncPostUser,
  asyncPutUser,
  asyncResetUserPwd,
  asyncToggleUserStatus,
  filterUser,
} from "./user.services";
import UserForm from "./UserForm";
import { message } from "antd";

const UserManagement: FC = () => {
  const [list, setList] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState<User>();
  const [formVisible, setFormVisible] = useState(false);
  const [params, setParams] = useState<Record<string, unknown>>();

  const loadData = useCallback(() => {
    setLoading(true);
    asyncGetUserData((res) => {
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

  const onEdit = useCallback((editItem: User) => {
    setItem(editItem);
    setFormVisible(true);
  }, []);

  const onClose = useCallback(() => {
    setItem(undefined);
    setFormVisible(false);
  }, []);

  const onDel = useCallback((data: User) => {
    asyncDelUser(data, (res) => {
      if (res.isOk) {
        message.success("删除成功");
        setList((prev) => prev.filter((p) => p.id !== data.id));
      }
    });
  }, []);

  const onSave = useCallback(
    (data: User) => {
      setLoading(true);
      if (data.id) {
        asyncPutUser(data, (res) => {
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
        asyncPostUser(data, (res) => {
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

  const onToggleStatus = useCallback((data: User) => {
    setLoading(true);
    asyncToggleUserStatus(data, (res) => {
      setLoading(false);
      if (res.isOk) {
        message.success("操作成功");
        setList((prev) =>
          prev.map((p) => {
            if (p.id === data.id) {
              return res.data;
            }
            return p;
          })
        );
      }
    });
  }, []);

  const onResetPwd = useCallback((data: User) => {
    setLoading(true);
    asyncResetUserPwd(data, (res) => {
      setLoading(false);
      if (res.isOk) {
        message.success("密码重置成功，新密码与用户名相同", 3);
      }
    });
  }, []);

  const filteredList = useMemo(() => {
    if (!params || !Object.keys(params).length) {
      return list;
    }
    return filterUser(list, params);
  }, [params, list]);

  return (
    <StyledContainer>
      <UserSearch onSearch={onSearch} />
      <UserTable
        data={filteredList}
        loading={loading}
        onAdd={onAdd}
        onEdit={onEdit}
        onDel={onDel}
        onRefresh={onRefresh}
        onToggleStatus={onToggleStatus}
        onResetPwd={onResetPwd}
      />
      <UserForm
        visible={formVisible}
        item={item}
        onSave={onSave}
        onCancel={onClose}
      />
    </StyledContainer>
  );
};

export default UserManagement;
