import { Head } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";
import SearchBox from "../islands/SearchBox.tsx";

export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    return ctx.render();
  },
  // async POST(req: Request, ctx: HandlerContext) {
  //   const form = await req.formData();
  //   console.log("post", req, ctx, form);
  //   const url = new URL(req.url);
  //   const query = url.searchParams.get("q") || "";
  //   return ctx.render();
  // },
};

export default function Home(props: PageProps) {
  // console.log(props);

  const { data } = props;
  return (
    <>
      <Head>
        <title>Zhou`s TOOLKIT</title>
      </Head>
      <div class="p-4 text-center">
        <h1 class="text-2xl font-bold">行政处罚记录</h1>
        <SearchBox></SearchBox>
      </div>
    </>
  );
}
