import styled from "styled-components";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { Plugin } from "../../models/plugin";
import PluginView from "./PluginView";

interface Props {
  dragged?: Plugin;
  setDragged: Dispatch<SetStateAction<Plugin | undefined>>;
}

const Editor: FC<Props> = ({ dragged, setDragged }) => {
  const [pluginList, setPluginList] = useState<Plugin[]>([]);

  const editorRef = useRef(null);

  const onDragEnter = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback(
    (e) => {
      console.log(e);
      console.log(dragged);
      if (dragged) setPluginList((prev) => [...prev, dragged]);
    },
    [dragged]
  );

  return (
    <StyledEditor
      ref={editorRef}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      {pluginList.map((plugin) => (
        <PluginView plugin={plugin} key={`VIEW_${plugin.name}`} />
      ))}
    </StyledEditor>
  );
};

export default Editor;

const StyledEditor = styled.div`
  width: 100%;
  height: 100%;
`;
