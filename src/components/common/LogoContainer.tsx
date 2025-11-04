import { useNavigate } from "react-router-dom";

const LogoContainer = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed z-10 right-[0] left-[0] top-[0px] backdrop-blur-sm">
      <img
        onClick={() => navigate("/")}
        src="/logo.png"
        style={{ margin: "4px auto", cursor: "pointer" }}
        className="max-w-[80px] "
      />
    </div>
  );
};

export default LogoContainer;
