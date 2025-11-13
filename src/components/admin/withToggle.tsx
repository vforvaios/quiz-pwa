import { useState } from "react";

const withToggle = (Component: any) => (props: any) => {
  const [toggleValue, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const setToggleValue = (anchor: any, open: any) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...toggleValue, [anchor]: open });
  };

  return (
    <Component
      {...props}
      toggleValue={toggleValue}
      setToggleValue={setToggleValue}
    />
  );
};

export default withToggle;
