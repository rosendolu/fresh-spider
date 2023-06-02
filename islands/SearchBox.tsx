import { useReducer } from "preact/hooks";

export default function SearchBox(props: any) {
  const [state, dispatch] = useReducer(
    (state, action) => {
      const { type, value } = action;
      return { ...state, [type]: { ...state[type], state: value } };
    },
    {
      text: "",
      total: {
        state: 1,
        label: "总局",
      },
      province: {
        state: 1,
        label: "省局",
      },
      branch: {
        state: 1,
        label: "分局",
      },
    },
  );

  const checkList = ["total", "province", "branch"];
  return (
    <div class="p-2">
      <form method={"get"} action="/api/bank">
        <div class="flex justify-center items-center">
          <input
            class="hover:shadow-sm p-1 border font-normal min-w-[300px]"
            type="text"
            name="text"
            placeholder={"关键词"}
            value={state["text"]}
            onChange={(e) => dispatch({ type: "text", value: e.target.value })}
          />
          {checkList.map((key) => {
            return (
              <div key={key} class="flex justify-center items-center">
                <input
                  class="mx-2 p-2 font-bold text-lg"
                  name={key}
                  onChange={(e) => {
                    dispatch({ type: key, value: !state[key]["state"] });
                  }}
                  value={state[key]["state"]}
                  type="checkbox"
                  checked={state[key]["state"]}
                />
                <label htmlFor={key}>
                  {state[key]["label"]}
                </label>
              </div>
            );
          })}
          <div class="text-center ml-5">
            <button
              class="p-2 m-2 hover:shadow-md bg-blue-300 rounded-sm"
              type="submit"
            >
              搜索
            </button>
            <button
              type="reset"
              class="p-2 m-2 hover:shadow-md bg-blue-300 rounded-sm"
            >
              清空
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
