const filterButtons = document.querySelectorAll(".filter");
const jobCards = document.querySelectorAll(".job-card");
const loginForm = document.querySelector("#loginForm");
const formMessage = document.querySelector("#formMessage");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    jobCards.forEach((card) => {
      const matches = selected === "all" || card.dataset.stream === selected;
      card.classList.toggle("is-hidden", !matches);
    });
  });
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const role = new FormData(loginForm).get("role");
  formMessage.textContent = `${role} demo dashboard opened successfully.`;
});
