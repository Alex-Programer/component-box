function Typed(selector, { text, speed }) {
  this.container = document.getElementById(selector);
  this.text = text;
  this.speed = speed;
  render.call(this);
}

function renderText() {
  for (let i = 0; i < this.text.length; i++) {
    const item = this.text[i];
    const span = document.createElement("span");
    span.style.cssText = "display: inline-block; width: 0; overflow: hidden;";
    span.innerText = item;
    this.container.append(span);
  }
}

function renderLine() {
  this.container.style.cssText = `
  display: inline-flex;
  align-items: center;
  padding-right: 2px;
  border-right: 2px solid #000;
  overflow: hidden;
`;
}

function drawText() {
  const wait = () => new Promise((resolve) => setTimeout(resolve, this.speed));

  async function draw() {
    for await (item of [...this.container.children]) {
      const isValid = Boolean(item.textContent.trim());
      isValid && (await wait());
      item.style.width = isValid ? "auto" : "4px";
    }
  }

  setTimeout(async () => {
    this.container.classList.add("stop");
    await draw.call(this);
    this.container.classList.remove("stop");
  }, 1000);
}

function render() {
  renderText.call(this);
  renderLine.call(this);
  drawText.call(this);
}

const id = "typing";
new Typed(id, { text: "Hello World", speed: 200 });

// helper
window.typingRefresh = () => {
  document.getElementById(id).innerHTML = "";
  new Typed(id, { text: "Hello World", speed: 200 });
};
