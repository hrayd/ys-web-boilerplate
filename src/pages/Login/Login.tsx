/** 登陆页 */
import { Button, Form, Input, message } from "antd";
import { FC, useCallback } from "react";
import styled from "styled-components";
import { LoginOutlined } from "@ant-design/icons";
import { setToken } from "../../utils/tokenUtils";
import { requestLogin } from "./login.service";

const Login: FC = () => {
  const [form] = Form.useForm();

  const onLogin = useCallback(() => {
    form.validateFields().then((values) => {
      requestLogin(values).then((res) => {
        setToken(res.data);
        message.success("登录成功, 欢迎您");
      });
    });
  }, [form]);

  return (
    <StyledLoginContainer>
      <StyledLoginForm>
        <StyledLoginTitle>系统登录</StyledLoginTitle>
        <Form
          form={form}
          labelCol={{ span: 5 }}
          wrapperCol={{ offset: 1, span: 16 }}
          size="large"
          style={{ flex: 1, paddingTop: "2rem" }}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true }]}
          >
            <Input autoFocus onPressEnter={onLogin} />
          </Form.Item>
          <Form.Item label="密码" name="password" rules={[{ required: true }]}>
            <Input type="password" onPressEnter={onLogin} />
          </Form.Item>
        </Form>
        <StyledLoginBtn>
          <Button type="primary" icon={<LoginOutlined />} onClick={onLogin}>
            登录
          </Button>
        </StyledLoginBtn>
      </StyledLoginForm>
    </StyledLoginContainer>
  );
};

export default Login;

const StyledLoginContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const StyledLoginForm = styled.div`
  width: 30rem;
  height: 20rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: calc(50vh - 10rem);
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const StyledLoginTitle = styled.div`
  height: 2.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;

const StyledLoginBtn = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  text-align: right;
  padding-top: 1rem;
  padding-right: 1rem;
`;
