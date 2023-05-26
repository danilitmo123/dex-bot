import React, {FC} from "react";
import PageHeader from "./Header";
import PageFooter from "./Footer";

const PageLayout: FC = ({children}) => {
  return (
    <div className="data">
      <PageHeader/>
      <div>{children}</div>
      <PageFooter/>
    </div>
  );
};

export default PageLayout;
