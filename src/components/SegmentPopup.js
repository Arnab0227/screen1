import React, { useState } from "react";
import CustomPopup from "./CustomPopup";
import { SCHEMA_OPTIONS } from "./SchemaOptions";
import axios from "axios";

const SegmentPopup = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState(SCHEMA_OPTIONS);
  const [selectedValue, setSelectedValue] = useState("");
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  
  // I used a serverless proxy via Netlify, otherwise getting a CORS error.

  const apiUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8888/.netlify/functions/proxy"
      : "https://reliable-pony-3c8f4c.netlify.app/.netlify/functions/proxy";

  const handleAddSchema = () => {
    if (!segmentName) {
      setShowErrorPopup(true);
      return;
    }

    const selectedOption = availableSchemas.find(
      (option) => option.value === selectedValue
    );

    if (selectedOption) {
      setSelectedSchemas([...selectedSchemas, selectedOption]);
      setAvailableSchemas(
        availableSchemas.filter((option) => option.value !== selectedValue)
      );
      setSelectedValue("");
    }
  };

  const handleReset = () => {
    setSelectedSchemas([]);
    setAvailableSchemas(SCHEMA_OPTIONS);
    setSelectedValue("");
  };

  const handleRemoveSchema = (valueToRemove) => {
    setSelectedSchemas(
      selectedSchemas.filter((schema) => schema.value !== valueToRemove)
    );
    setAvailableSchemas([
      ...availableSchemas,
      selectedSchemas.find((schema) => schema.value === valueToRemove),
    ]);
  };

  const handleSave = async () => {
    if (!segmentName) {
      setShowErrorPopup(true);
      return;
    }

    const payload = {
      segment_name: segmentName,
      schema: selectedSchemas.map(({ label, value }) => ({ [value]: label })),
    };

    try {
      await axios.post(apiUrl, payload);
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Error saving segment:", error);
    }
  };
  const handleClosePopup = () => {
    setShowErrorPopup(false);
    if (showSuccessPopup) {
      setShowSuccessPopup(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex justify-end bg-gray-800 bg-opacity-50">
      <div className="w-1/3 h-full bg-white flex flex-col shadow-lg">
        <div className="bg-teal-500 text-white p-5 flex items-center">
          <button className="text-xl mr-4" onClick={onClose}>
            &#60;
          </button>
          <h2 className="text-lg font-semibold">Saving Segment</h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Enter the Name of the Segment
            </label>
            <input
              type="text"
              placeholder="Name of the segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="text-gray-600">
            To Save your segment, you need to add the schemas, <br /> to build
            the query.
          </div>
          <div className="flex justify-end space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
              <div>-User Traits</div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
              <div>-Group Traits</div>
            </div>
          </div>
          <div className="space-y-2">
            {selectedSchemas.map((schema, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div
                  className={`w-2.5 h-2.5 ${
                    schema.isSelected ? "bg-red-500" : "bg-green-500"
                  } rounded-full`}
                />
                <select
                  className="flex-1 p-2 border border-gray-300 rounded"
                  value={schema.value}
                  onChange={(e) =>
                    setSelectedSchemas(
                      selectedSchemas.map((s) =>
                        s.value === schema.value
                          ? {
                              ...s,
                              value: e.target.value,
                              label:
                                e.target.options[e.target.selectedIndex].text,
                              isSelected: true,
                            }
                          : s
                      )
                    )
                  }
                >
                  {SCHEMA_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => handleRemoveSchema(schema.value)}
                  className="py-1.5 px-2 text-red-500 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-200"
                >
                  DEL
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="flex items-center space-x-4">
                <div className="w-2.5 h-2.5 bg-gray-500 rounded-full" />
                <select
                  value={selectedValue}
                  onChange={(e) => setSelectedValue(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="" disabled>
                    Add schema to segment
                  </option>
                  {availableSchemas.map((schema) => (
                    <option key={schema.value} value={schema.value}>
                      {schema.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="py-1.5 px-2 text-red-500 bg-white border border-gray-300 rounded cursor-pointer hover:bg-gray-200"
            >
              RES
            </button>
          </div>

          <div className="flex justify-start">
            <button
              onClick={handleAddSchema}
              className="text-green-500 underline border-none bg-transparent hover:text-green-600"
            >
              + Add new Schema
            </button>
          </div>
        </div>

        <div className="p-5 bg-gray-100 flex justify-start space-x-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save the Segment
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white rounded text-red-500 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>

        {showErrorPopup && (
          <CustomPopup
            message="Please provide a name for the segment before adding schemas!"
            onClose={handleClosePopup}
          />
        )}
        {showSuccessPopup && (
          <CustomPopup
            message="Segment saved successfully!"
            onClose={handleClosePopup}
          />
        )}
      </div>
    </div>
  );
};

export default SegmentPopup;
