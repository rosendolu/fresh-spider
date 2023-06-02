export default function Menu(props: { state: any; onChange: any }) {
  const { state, onChange } = props;
  return (
    <div class="">
      <div>
        <h3>选择搜索范围:</h3>
        <input
          type="checkbox"
          onChange={(e) => console.log("checkbox", e.returnValue, state)}
          id={"1"}
          name={"id"}
          checked={state["all"]}
        />

        {
          /* <div>
          <input
            onClick={(e) => console.log(e)}
            type="checkbox"
            id="0"
            name="总局机关"
            checked={true}
          />
          <label for="scales">总局机关</label>
        </div>

        <div>
          <input type="checkbox" id="1" name="horns" />
          <label for="horns">省局（计划单列市局）本级</label>
        </div>
        <div>
          <input type="checkbox" id="2" name="horns" />
          <label for="horns">分局本级</label>
        </div> */
        }
      </div>
    </div>
  );
}
