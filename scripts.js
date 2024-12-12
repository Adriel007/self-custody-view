// await window.api.setData(newSettings);
// await window.api.getData();
(async function () {
  const h1 = document.querySelector("h1");
  const data = await window.api.getData();

  h1.classList.add("text-white");
  setTimeout(() => {
    h1.classList.remove("text-white");
    setTimeout(() => {
      if (data.firstLogin) {
        window.location.href = "setup/setup.html";
      } else {
        window.location.href = "home/home.html";
      }
    }, 3000);
  }, 4000);
})();
