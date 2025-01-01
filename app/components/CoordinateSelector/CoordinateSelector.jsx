import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons"; // Import swap icon

export function CoordinateSelector({
  handleFromChange,
  handleToChange,
  selectedFrom,
  selectedTo,
  list,
}) {
  return (
    <div className="w-full h-[200px] border border-slate-700 mt-[50px] flex items-center justify-center gap-[50px]">
      <select
        onChange={handleFromChange}
        value={selectedFrom.selectedFrom}
        className="h-[50px]"
      >
        <option value="">Select From</option>
        {list.length > 0 &&
          list.map((city, index) => {
            return (
              <option key={index} value={city.Name}>
                {city.Name}
              </option>
            );
          })}
      </select>

      <button className="w-[50px] h-[50px]">
        <FontAwesomeIcon icon={faExchangeAlt} className="w-[50px] h-[30px]" />
      </button>

      <select
        onChange={handleToChange}
        value={selectedTo.selectedTo}
        className="h-[50px]"
      >
        <option value="">Select To</option>
        {list.length > 0 &&
          list.map((city, index) => {
            return (
              <option key={index} value={city.Name}>
                {city.Name}
              </option>
            );
          })}
      </select>
    </div>
  );
}
