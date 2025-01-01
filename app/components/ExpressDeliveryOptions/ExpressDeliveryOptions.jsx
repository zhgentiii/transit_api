import { useState } from "react";

export function ExpressDeliveryOptions() {
  const [values, setValues] = useState({ input1: "", input2: "", input3: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="w-full h-[100px] flex flex-row gap-[40px] justify-center mt-[25px]">
      <label>
        ВЕС ГРУЗА (КГ)
        <input
          name="input1"
          value={values.input1}
          onChange={handleChange}
          placeholder="Enter value 1"
          className="border p-2"
        />
      </label>
      <label>
        ОБЬЕМ ГРУЗА (М3)
        <input
          name="input2"
          value={values.input2}
          onChange={handleChange}
          placeholder="Enter value 2"
          className="border p-2"
        />
      </label>
      <label>
        ЦЕННОСТЬ ГРУЗА (РУБ).
        <input
          name="input3"
          value={values.input3}
          onChange={handleChange}
          placeholder="Enter value 3"
          className="border p-2"
        />
      </label>
    </div>
  );
}
