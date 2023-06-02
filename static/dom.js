// window.addEventListener("load", () => {
//   const detailsElement = document.querySelectorAll("#richText");
//   for (const el of detailsElement) {
//     const content = el.innerText;
//     el.innerHTML = content;
//   }
// });

const listenToggle = () => {
  el.addEventListener("toggle", function () {
    // const richTextList = document.querySelectorAll("#richText");
    const searchParams = new URLSearchParams(location.href);
    const text = searchParams.get("text");
    // for (const item of richTextList) {
    //   console.log(item.innerText);
    //   // item.textContent = item.innerText;
    // }
    if (el.open) {
      // const els = document.querySelectorAll("#details");
      //   for (const el of els) {
      //     if(detailsElement !== el) {
      //       els
      //     }
      //   }
      // 处理展开时的逻辑
      // 例如：修改样式、加载内容等
      // console.log(detailsElement.innerText);
      const content = el.innerText;
      // console.log("match", new RegExp(text, "i").test(content));
      // if (new RegExp(text, "i").test(content)) {
      //   const [_, pre, match, next] = content.match(
      //     new RegExp(`/(.{0,50})(${text})(.{0,50})/`, "i"),
      //   );
      //   console.log(match);
      //   const box = document.createElement("div");
      //   box.className = "text-sm";
      //   box.append(pre);
      //   const span = document.createElement("span");
      //   span.className = "bg-yellow-200 text-lg";
      //   span.innerHTML = match;
      //   box.appendChild(span);
      //   box.appendChild(next);
      //   detailsElement.innerHTML = JSON.stringify(box);
      // } else {
      // }
      el.innerHTML = content;
    } else {
      console.log("折叠内容已收起");
      // 处理收起时的逻辑
      // 例如：隐藏内容、清除数据等
    }
  });
};
