/** 上方标题栏 */
import Avatar from "antd/lib/avatar/avatar";
import { FC, useCallback } from "react";
import styled from "styled-components";
import pkg from "../../../package.json";
import icon from "../../assets/icon.png";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, message } from "antd";

const Header: FC = () => {
  const onLogout = useCallback(() => {
    // TODO: 退出登录
    message.info("退出登录");
  }, []);

  const userOverlay = (
    <Menu>
      <Menu.Item>
        <Button type="text" size="small">
          修改密码
        </Button>
      </Menu.Item>
      <Menu.Item>
        <Button type="text" size="small" onClick={onLogout}>
          退出登录
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader>
      <StyledHeaderIcon />
      <StyledHeaderTitle>{pkg.description}</StyledHeaderTitle>
      <Dropdown overlay={userOverlay}>
        <StyledHeaderUser>
          <Avatar
            icon={<UserOutlined />}
            size="small"
            style={{ marginRight: ".5rem", backgroundColor: "blue" }}
          />
          {"管理员 "}
          <DownOutlined />
        </StyledHeaderUser>
      </Dropdown>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.div`
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  padding: 0 1rem;
  border-bottom: 1px solid grey;
  background-color: #320001;
  color: white;
  display: flex;
  flex-direction: row;
`;

const StyledHeaderIcon = styled.div`
  width: 2rem;
  height: 2rem;
  margin-top: 0.5rem;
  background: url(${icon}) center/cover no-repeat;
  margin-right: 1rem;
`;

const StyledHeaderTitle = styled.div`
  flex: 1;
  font-weight: 600;
  font-size: 1.2rem;
`;

const StyledHeaderUser = styled.div`
  width: 8rem;
  text-align: right;
`;
