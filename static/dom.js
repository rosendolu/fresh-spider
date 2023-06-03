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

  //
  const openBtn = document.querySelector("#openDetail");
  openBtn.addEventListener("click", () => {
    const detailsElements = document.querySelectorAll("#details");
    for (const el of detailsElements) {
      el.open = !el.open;
    }
  });
});
