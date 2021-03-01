import { FC } from "react";
import { useTranslation } from "react-i18next";
import YSSearchBar from "../YSSearchBar";

const DemoSearch: FC = () => {
  const {t} = useTranslation("demo")
  return (
    <YSSearchBar
      items={[
        { name: "name", label: t("search.name") },
        { name: "code", label: t("search.code") },
        { name: "date", label: t("search.date") },
      ]}
      onSearch={() => {}}
    />
  );
};

export default DemoSearch;
