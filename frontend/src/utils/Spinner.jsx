const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-5000 flex items-center justify-center backdrop-blur-md bg-white/10">
      <span className="loading loading-spinner text-neutral w-20"></span>
    </div>
  );
};

export default LoadingSpinner;
