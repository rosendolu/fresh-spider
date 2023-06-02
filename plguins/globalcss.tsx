import { Plugin } from "$fresh/server.ts";
import { PluginRenderContext } from "https://deno.land/x/fresh@1.1.6/src/server/types.ts";

const plugin: Plugin = {
  name: "globalcss",
  render: (ctx: PluginRenderContext) => {
    if (ctx.path === "/global-styles") {
      ctx.response.headers.set("Content-Type", "text/css");
      ctx.response.body = `
        body {
          font-family: Arial, sans-serif;
          background-color: #f1f1f1;
          /* 添加其他全局样式属性 */
        }

        h1 {
          color: #333;
          /* 添加其他全局样式属性 */
        }

        /* 添加其他全局样式规则 */
      `;
    }
  },
};
export default plugin;
