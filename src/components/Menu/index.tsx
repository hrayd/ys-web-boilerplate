/** 左侧组件列表 */
import { FC } from "react";
import styled from "styled-components";
import pluginList from "../../plugins";
import { Plugin } from "../../models/plugin";

const StyledMenu = styled.div`
  width: 15rem;
  height: 100%;
  border-right: 1px solid #f0f0f0;
  margin: 2rem 0;
`;

const StyledPlugin = styled.div`
  height: 1rem;
  margin: 5px;
`;

interface Props {
  setDragged: (plugin: Plugin) => void;
}

const Menu: FC<Props> = ({ setDragged }) => {
  return (
    <StyledMenu>
      {pluginList.map((plugin) => (
        <StyledPlugin
          key={plugin.name}
          draggable
          onDragStart={() => setDragged(plugin)}
        >{`${plugin.name}`}</StyledPlugin>
      ))}
    </StyledMenu>
  );
};

export default Menu;
