import React from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { useHistory } from "react-router-dom";

import "./CardHeader.scss";

const CardHeader = props => {
  const { handleSave, hasPreviewButton, children, ...rest } = props;
  const history = useHistory();

  const navToPreview = () => {
    history.push({ pathname: "/preview" });
  };
  return (
    <div className={`CardHeader`} {...rest}>
      <div className="left-section">
        {children}
        <IconButton disableRipple>
          <InfoOutlinedIcon />
        </IconButton>
      </div>
      <div className="d-flex">
        {hasPreviewButton && (
          <Button variant="text" className="btn-preview" onClick={navToPreview}>
            Go to Preview
          </Button>
        )}
        {handleSave && (
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        )}
      </div>
    </div>
  );
};

export { CardHeader };
