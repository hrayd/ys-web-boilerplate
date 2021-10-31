import { useState, useCallback } from "react";

interface FormState<T> {
  data?: T;
  setData: (data?: T) => void;
  visible: boolean;
  open: (data?: T) => void;
  close: () => void;
}

const useFormState: <T = any>(initData?: T) => FormState<T> = (initData) => {
  type T = typeof initData;
  const [data, setData] = useState<T>(initData);
  const [visible, setVisible] = useState(false);

  const open = useCallback((formData?: T) => {
    setVisible(true);
    setData(formData);
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setData(undefined);
  }, []);

  return {
    data,
    visible,
    open,
    close,
    setData,
  };
};

export default useFormState;
