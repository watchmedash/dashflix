document.getElementById("copyBtn").addEventListener("click", () => {
  const addr = document.getElementById("dAddr").textContent.trim();
  const btn  = document.getElementById("copyBtn");
  navigator.clipboard.writeText(addr).then(() => {
    btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
    btn.classList.add("copied");
    showToast('<i class="fas fa-check"></i> Address copied to clipboard');
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-copy"></i> Copy';
      btn.classList.remove("copied");
    }, 2500);
  }).catch(() => {
    showToast('<i class="fas fa-copy"></i> Copy failed — select and copy manually');
  });
});
