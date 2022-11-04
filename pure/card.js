const style = `
padding: 10px;
box-shadow: 0 0 10px #ddd;
border-radius: 10px;
overflow: auto;
`;

const insertTitle = (card) => {
  const title = document.createElement("h3");
  title.style.cssText = `margin: 0 0 10px 0;`;
  title.innerText = card.title || "缺少标题";
  card.insertBefore(title, card.firstElementChild);
};

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.style.cssText = style;
  insertTitle(card);
});
