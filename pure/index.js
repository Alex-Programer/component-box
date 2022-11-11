const baseFeature = () => {
  const style = `
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    border-radius: 10px;
    overflow: auto;
  `;

  const insertTitle = (card) => {
    const title = document.createElement("h3");
    title.style.cssText = `margin: 0 0 10px 0;`;
    title.innerText = card.getAttribute("name") || "缺少标题";
    card.insertBefore(title, card.firstElementChild);
  };

  const bundleRefreshEvent = (card) => {
    const needRefresh = card.getAttribute("refresh") === "";
    if (!needRefresh) return;
    card.style.cursor = "pointer";

    card.onclick = () => {
      const fn = `${card.lastElementChild.id}Refresh`;

      try {
        window[fn]();
      } catch (error) {
        if (error.message.indexOf("is not a function") === -1) {
          console.error(error);
        } else {
          console.error(fn + " is not a function");
        }
      }
    };
  };

  const cards = document.querySelectorAll("#demo > div");

  cards.forEach((card) => {
    card.style.cssText = style;
    insertTitle(card);
    bundleRefreshEvent(card);
  });
};

baseFeature();

const insertAssets = (assets) => {
  assets.forEach(({ css, script }) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = css;
    document.head.append(link);

    if (script) {
      const js = document.createElement("script");
      js.src = script;
      document.body.append(js);
    }
  });
};
