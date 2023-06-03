import { asset } from "$fresh/runtime.ts";
import { HandlerContext, Handlers, PageProps } from "$fresh/server.ts";

const config = {
  total: {
    itemId: 4113,
    label: "总局",
  },
  province: {
    itemId: 4114,
    label: "省局",
  },
  branch: {
    itemId: 4115,
    label: "分局",
  },
};
export const handler: Handlers = {
  async GET(req: Request, ctx: HandlerContext) {
    const urlObj = new URL(req.url);
    const queryArr = [...urlObj.searchParams.entries()];
    const query = queryArr.reduce(
      (acc, [key, val]) => {
        acc[key] = val;
        return acc;
      },
      {},
    );
    let { text, total, province, branch } = query;
    const pageSize = 18, pageIndex = 1, requestCount = 50;
    total = parseInt(total);
    province = parseInt(province);
    branch = parseInt(branch);

    // 貌似链接是会变动的
    const listURL = (itemId, pageIndex) =>
      `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectDocByItemIdAndChild/data_itemId=${itemId},pageIndex=${pageIndex},pageSize=18.json`;
    // const listURL =
    //   "http://www.cbirc.gov.cn/cbircweb/DocInfo/SelectDocByItemIdAndChild";

    let list = [["total", total], ["province", province], ["branch", branch]]
      .map(
        ([key, val]) => {
          if (!parseInt(val)) return [];
          return Promise.all(
            new Array(((requestCount / pageSize) >> 0) + 1).fill(0).map(
              (_, i) => {
                // if (1 > 0) {
                //   return `${listURL(config[key]["itemId"], i + 1)}`;
                // }
                return fetch(
                  `${listURL(config[key]["itemId"], i + 1)}`,
                ).then((res) => res.json()).catch((err) => null);
              },
            ),
          );
        },
      );

    list = await Promise.all(list);
    list = list.map((arr) => arr.map((data) => data.data.rows).flat());
    const detailURL = (docId) =>
      `http://www.cbirc.gov.cn/cn/static/data/DocInfo/SelectByDocId/data_docId=${docId}.json`;
    list = await Promise.all(list.map((arr) =>
      Promise.all(arr.map((item) => {
        return fetch(`${detailURL(item.docId)}`).then((res) => res.json())
          .catch(() => null);
      }))
    ));
    list = list.map((arr) => arr.map((data) => data.data).flat());
    const ctxData = {
      total: list[0],
      province: list[1],
      branch: list[2],
    };
    // return new Response(JSON.stringify(ctxData), {
    //   headers: { "Content-Type": "application/json" },
    // });
    return ctx.render(ctxData);
  },
  async POST(req: Request, ctx: HandlerContext) {
    // const form = await req.formData();
    // const text = form.get('text')
    console.log("post", req, ctx);
    const urlObj = new URL(req.url);
    const query = urlObj.searchParams.get("q") || "";

    const itemId = 4113, pageSize = 20, pageIndex = 1;
    const data = await fetch("");

    return ctx.render();
  },
};

export default function Index(props: PageProps) {
  // const [open, setOpenState] = useState(false);
  const { data } = props;
  const list = ["total", "province", "branch"];

  if (!data) {
    return (
      <div>
        <div class="text-4xl font-bold text-center">结果为空</div>
        {/* <code>{JSON.stringify(data, null, 2)}</code> */}
      </div>
    );
  }

  // const { total, province, branch } = data;
  return (
    <div class="p-4">
      <div class="p-2 text-center">
        {
          /* <input
          class="p-2 bg-blue-400 font-bold text-2xl hover:shadow-sm hover:outline-1 rounded-md"
          type="radio"
          name="openDetail"
          id="openDetail"
        />
        <label htmlFor="openDetail">展开正文</label> */
        }
        <button
          id="openDetail"
          class="p-2 bg-blue-400 font-bold text-2xl hover:shadow-sm hover:outline-1 rounded-md" // onClick={() => setOpenState(!open)}
        >
          展开正文
          {/* {open ? "" : "折叠正文"} */}
        </button>
      </div>
      {list.map((key) => {
        return (data[key] && data[key]?.length)
          ? (
            <div key={key}>
              <h2 class="text-center text-3xl font-bold py-2">
                {config[key]["label"]}
              </h2>
              <table class="table-fixed border-collapse border border-slate-400 m-auto">
                <thead>
                  <tr class="hover:border-slate-600 bg-slate-400">
                    <th class="border border-slate-300 p-2">编号</th>
                    <th class="border border-slate-300 p-2">标题</th>
                    <th class="border border-slate-300 p-2">时间</th>
                    <th class="border border-slate-300 p-2">正文</th>
                  </tr>
                </thead>
                <tbody>
                  {data[key].map((item, i) => (
                    <tr key={item.docId} class="hover:border-slate-600">
                      <td class="border border-slate-300 p-1 text-center">
                        {i + 1}
                      </td>
                      <td class="border border-slate-300 p-1 text-sm">
                        {item.docTitle}
                      </td>
                      <td class="border border-slate-300 p-1 text-sm">
                        {item.publishDate}
                      </td>
                      <td class="border border-slate-300 p-1 text-sm w-[600px] overflow-auto">
                        <details id={"details"}>
                          <summary>{item.docSubtitle}</summary>
                          <div
                            class="text-sm font-norm"
                            id={"richText"}
                            dangerouslySetInnerHTML={{ __html: item.docClob }}
                          >
                            {/* {item.docClob} */}
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <hr class="py-2"></hr>
            </div>
          )
          : null;
      })}
      <script src={asset("/dom.js")}>
      </script>
    </div>
  );
}