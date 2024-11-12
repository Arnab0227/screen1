const CustomPopup = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white w-1/3 rounded shadow-lg p-6 space-y-4">
        <p className="text-red-500 text-center text-lg font-medium">
          {message}
        </p>
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-teal-500 text-white rounded hover:bg-teal-600"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
