window.addEventListener("load", () => {
  // toggleDetail();
  const detailsElement = document.querySelectorAll("#details");
  for (const el of detailsElement) {
    el.addEventListener("toggle", () => {
      if (el.open) {
        const content = el.innerText;
        el.innerHTML = content;
      }
    });
  }

  let open = false;
  const openBtn = document.querySelector("#openDetail");
  openBtn.addEventListener("click", () => {
    const detailsElements = document.querySelectorAll("#details");
    for (const el of detailsElements) {
      open = !open;
      el.open = open;
    }
  });
});
