(function () {
  const container = document.getElementById("container");
  const radios = document.querySelectorAll('input[name="lang"]');
  const labels = document.querySelectorAll("label");

  container.style.transform = "translateX(0)";

  radios.forEach((radio) => {
    radio.addEventListener("change", () => {
      const saveButton = document.getElementById("save");
      const lang = document.querySelector('input[name="lang"]:checked');

      labels.forEach((label) => {
        if (label.getAttribute("for") === lang.id) {
          label.classList.add("active");
          label.children[1].classList.add("text-primary");
        } else {
          label.classList.remove("active");
          label.children[1].classList.remove("text-primary");
        }
      });

      saveButton.disabled = false;

      saveButton.addEventListener("click", () => {
        container.style.transform = "translateX(-100%)";

        setTimeout(() => {
          window.api.setData({
            language: lang.value,
            firstLogin: false,
          });

          window.location.href = "home/home.html";
        }, 450);
      });
    });
  });
})();
