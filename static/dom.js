window.addEventListener("load", () => {
  toggleDetail();
  const openBtn = document.querySelector("#openDetail");
  openBtn.addEventListener("click", () => {
    const detailsElements = document.querySelectorAll("#details");
    for (const el of detailsElements) {
      el.open = !el.open;
    }
  });
});

function toggleDetail() {
  const detailsElement = document.querySelectorAll("#details");
  for (const el of detailsElement) {
    el.open = true;
    setTimeout(() => {
      const content = el.innerText;
      el.innerHTML = content;
      el.open = false;
    }, 0);
  }
}
