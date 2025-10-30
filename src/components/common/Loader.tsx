interface ILoaderProps {
  show: boolean;
}

const Loader = ({ show }: ILoaderProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-t-greencolor border-gray-200 rounded-full animate-spin"></div>
        <p className="mt-4 text-white text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
