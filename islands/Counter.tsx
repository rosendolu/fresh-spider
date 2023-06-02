import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  console.log("Counter", props);

  const [count, setCount] = useState(props.start);
  return (
    <div class="flex gap-2 w-full">
      <p class="flex-grow-1 font-bold text-xl">{count}</p>
      <Button
        onClick={() => {
          console.log("count", count);

          setCount(count - 1);
        }}
      >
        -1
      </Button>
      <Button onClick={() => setCount(count + 1)}>+1</Button>
    </div>
  );
}
