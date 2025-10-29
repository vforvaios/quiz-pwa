const Header = () => {
  return (
    <div className="fixed shadow-md bg-whitecolor z-10 p-1 justify-between items-center h-[50px] top-[0px] w-full flex">
      <div>
        <img src="/logo.png" className="max-w-[40px]" />
      </div>
      <div>
        <i className="icon-menu text-2xl" style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};

export default Header;
