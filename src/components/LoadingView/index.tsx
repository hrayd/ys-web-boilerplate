/** 全局Loading组件 */
import { Spin } from "antd";
import { Component } from "react";

class LoadingView extends Component<{}, { visible: boolean }> {
  static show: () => void;
  static close: () => void;

  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
    };

    LoadingView.show = this.show.bind(this);
    LoadingView.close = this.close.bind(this);
  }

  show() {
    this.setState({ visible: true });
  }

  close() {
    this.setState({ visible: false });
  }

  render() {
    if (this.state.visible) {
      return (
        <div
          style={{
            zIndex: 2000,
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <Spin
            spinning={true}
            size="large"
            style={{ position: "absolute", left: "50%", top: "50%" }}
          />
        </div>
      );
    }
    return null;
  }
}

export default LoadingView;
