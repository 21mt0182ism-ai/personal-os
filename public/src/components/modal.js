export function showModal(title, contentHtml, onConfirm) {
  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = 0;
  modal.style.left = 0;
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.background = "rgba(0,0,0,0.5)";
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";

  modal.innerHTML = `
    <div style="background:#fff; padding:20px; min-width:300px;">
      <h3>${title}</h3>
      <div>${contentHtml}</div>
      <button id="confirm">Confirm</button>
      <button id="cancel">Cancel</button>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector("#cancel").onclick = () => modal.remove();
  modal.querySelector("#confirm").onclick = () => {
    onConfirm();
    modal.remove();
  };
}
