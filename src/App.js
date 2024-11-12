import React, { useState } from "react";
import SegmentPopup from "./components/SegmentPopup";

const App = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSaveSegmentClick = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  // I used Tailwind CSS for the styling because styling isn't mentioned for this.

  return (
    <div className="h-screen flex flex-col">
      <div className="bg-teal-500 text-white p-5 flex items-center">
        <button className="text-xl mr-4">&#60;</button>
        <h2 className="text-lg font-semibold">View Audience</h2>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <button
          onClick={handleSaveSegmentClick}
          className="flex items-center justify-center text-center border border-gray-400 rounded p-4 hover:bg-gray-400"
        >
          Save segment
        </button>
      </div>

      {isPopupOpen && <SegmentPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default App;

// https://webhook.site/#!/view/af4867f0-15ff-4fbe-838a-e685d468c245  this is for the webhook.site