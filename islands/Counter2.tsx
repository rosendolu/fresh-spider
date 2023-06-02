import { useState } from "preact/hooks";
export default function Counter2() {
  const [value, setValue] = useState(0);

  return (
    <>
      <div>Counter: {value}</div>
      <button
        class="mx-2 px-1 py-1 border(gray-100 2) hover:bg-gray-200"
        onClick={() => {
          console.log("Increment");

          setValue(value + 1);
        }}
      >
        Increment
      </button>
      <button
        class="mx-2 px-1"
        onClick={() => setValue(value - 1)}
      >
        Decrement
      </button>
    </>
  );
}
