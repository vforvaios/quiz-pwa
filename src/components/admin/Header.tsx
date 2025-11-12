interface HeaderProps {
  isMobile: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Header = ({ isMobile, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="p-4 bg-white shadow flex items-center justify-between">
      {/* Κουμπί ανοίγματος ΜΟΝΟ σε mobile */}
      {isMobile && (
        <button onClick={() => setSidebarOpen(true)} className=" transition">
          <i className="icon-menu" />
        </button>
      )}
      <h1 className="text-lg font-semibold">Πίνακας Ελέγχου</h1>
    </header>
  );
};

export default Header;
