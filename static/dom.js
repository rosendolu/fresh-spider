window.addEventListener("load", () => {
  // autoToggleDetails();
  const searchParams = new URLSearchParams(location.href.split("?")[1] || "");
  // toggleDetail();
  const detailsElement = document.querySelectorAll("#details");
  for (const el of detailsElement) {
    el.addEventListener("toggle", () => {
      if (el.open) {
        const queryText = searchParams.get("text") || "";
        const content = el.innerText;
        const textArr = content.split(
          new RegExp(`(${queryText})`, "i"),
        );
        const newContent = textArr.map((str) => {
          if (str == queryText) {
            return `<span style="background:yellow;font-size:16px;font-weight:bold;">${str}</span>`;
          }
          return `<span>${str}</span>`;
        }).join("");
        // new RegExp(`/(.{0,50})(${queryText})(.{0,50})/`),
        // 高亮匹配的文本
        el.innerHTML = newContent;
      }
    });
  }

  let open = false;
  const openBtn = document.querySelector("#openDetail");
  openBtn?.addEventListener("click", () => {
    const detailsElements = document.querySelectorAll("#details");
    for (const el of detailsElements) {
      open = !open;
      el.open = open;
    }
  });
});

function autoToggleDetails() {
  const searchParams = new URLSearchParams(location.href.split("?")[1] || "");
  const queryText = searchParams.get("text") || "";
  const detailsElement = document.querySelectorAll("#details");
  if (!queryText || queryText == "") return;
  for (const el of detailsElement) {
    el.open = true;
    setTimeout(() => {
      const content = el.innerText;
      if (new RegExp(queryText, "i").test(content)) {
        const textArr = content.split(
          new RegExp(`(${queryText})`, "i"),
        );
        console.log(
          queryText,
          textArr.length,
          new RegExp(`(${queryText}\)`, "i").toString(),
        );
        const newContent = textArr.map((str) => {
          if (str == queryText) {
            return `<span class='text-lg' style="background:yellow;font-size:16px;">${str}</span>`;
          }
          return `<span>${str}</span>`;
        }).join("");
        // new RegExp(`/(.{0,50})(${queryText})(.{0,50})/`),
        // 高亮匹配的文本
        el.innerHTML = newContent;
      } else {
        el.open = false;
      }
    }, 0);
  }
}
