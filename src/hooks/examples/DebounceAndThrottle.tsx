/**
 * 截流、防抖 Hook 演示
 */
import { useState } from "react";
import useDebounce from "../useDebounce";
import useThrottle from "../useThrottle";
import { Button, Divider, Input } from "../../components/base";

const DemoUseDeBounce = () => {
  const [textWithDebounce, setTextWithDebounce] = useState(0);
  const [textWithThrottle, setTextWithThrottle] = useState("");

  const clickWithDebounce = useDebounce(() => {
    setTextWithDebounce((prev) => prev + 1);
  });

  const clickWithThrottle = useThrottle((e) => {
    setTextWithThrottle(e.target.value);
  });

  return (
    <div style={{ textAlign: "center" }}>
      <fieldset>
        <legend>防抖效果展示</legend>
        <Button type="primary" onClick={clickWithDebounce}>
          有防抖的按钮
        </Button>
        <span
          style={{ marginLeft: "1rem" }}
        >{`触发了 ${textWithDebounce} 次`}</span>
      </fieldset>
      <Divider />
      <fieldset>
        <legend>截流效果展示</legend>
        <Input
          onChange={clickWithThrottle}
          style={{ width: "40%" }}
          allowClear
        />
        <div>{textWithThrottle}</div>
      </fieldset>
    </div>
  );
};

export default DemoUseDeBounce;
