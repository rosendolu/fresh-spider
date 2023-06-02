import { PageProps } from "$fresh/server.ts";

export default function Greet(props: PageProps) {
  return (
    <>
      <div>Hello {props.params.name}</div>
      {JSON.stringify(props, null, 2)}
    </>
  );
}
