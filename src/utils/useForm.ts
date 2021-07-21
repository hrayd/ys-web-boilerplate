/** Form Hooks
 * 维护表单显隐状态与数据填充
 */
import { useCallback, useState } from "react";

const useForm = <T>() => {
  const [formVisible, setFormVisible] = useState(false);
  const [formItem, setFormItem] = useState<T>();

  const openForm = useCallback((data?: T) => {
    setFormVisible(true);
    setFormItem(data);
  }, []);

  const closeForm = useCallback(() => {
    setFormVisible(false);
    // 在后台清理状态,避免表单数据抖动
    setTimeout(() => setFormItem(undefined), 1000);
  }, []);

  return {
    formVisible,
    formItem,
    openForm,
    closeForm,
  };
};

export default useForm;
