import React, { useState } from "react";

const ITEMS = [
  { id: "Admin", name: "Admin" },
  { id: "Librarian", name: "Librarian" },
  { id: "Staff", name: "Staff" },
  { id: "Student", name: "Student" },
];

const Access = () => {
  const [selected, setSelected] = useState([]);
  const onSave = () => {
    const data=JSON.stringify(selected,null,2);
    console.log(data)
  };
  const onCheck=(id)=>{
    selected.some((val) => val === id);
  }
  const handleChange = (event) => {
    const { checked, value } = event.currentTarget;

    console.log(checked);
    console.log(value);
    setSelected((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };
  return (
    <>
      <div className="row">
        <div className="col"></div>
        <div
          className="col"
          style={{
            marginTop: 50,
          }}
        >
          {ITEMS.map((item) => (
            <div>
              <label for={item.id} style={{ marginRight: 10 }}>
                {item.name}
              </label>
              <input
                id={item.id}
                value={item.id}
                type="checkbox"
                checked={selected.some((val) => val ===item.id)}
                // checked={onCheck(item.id)}
                onChange={handleChange}
              />
            </div>
          ))}
          <button onClick={onSave}>Save</button>
        </div>

        <div className="col"></div>
      </div>

      <div>
        <label htmlFor="">checked:</label>{JSON.stringify(selected,null)}
      </div>
    </>
  );
};
export default Access;
