import { useState } from "react";

function Dropdown() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="p-4">
      <label htmlFor="dropdown" className="block mb-2 text-sm font-medium">
        Translate to:
      </label>
      <select
        id="dropdown"
        value={selectedOption}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-2"
      >
        <option value="">-- Select --</option>
        <option value="option1">IN Hindi</option>
        <option value="option2">ES Spanish</option>
        <option value="option3">CN Chinese</option>
        <option value="option3">FR French</option>
        <option value="option3">DE German</option>
        <option value="option3">IT Italian</option>
        <option value="option3">RU Russian</option>
      </select>

      {selectedOption && (
        <p className="mt-3 text-sm text-green-600">
          You selected: <strong>{selectedOption}</strong>
        </p>
      )}
    </div>
  );
}

export default Dropdown;
