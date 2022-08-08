import "../styles/index.scss";

import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import fetch from "node-fetch";

const repoName = "Prismic-int";
const endpoint = prismic.getEndpoint(repoName);
const client = prismic.createClient(endpoint, { fetch });

const init = async () => {
  const prismicDoc = await client.getAllByType("product_info");
  prismicDoc.forEach((item, i) => {
    SetFunc(item.data, i + 1);
  });
};

const SetFunc = (data, i) => {
  const { title, description, subinfo, infobtn, infoimage } = data;
  const titleHTML = prismicH.asText(title);
  const descriptionHTML = prismicH.asText(description);
  const subinfoHTML = prismicH.asText(subinfo);
  const infobtnHTML = prismicH.asHTML(infobtn);
  const infoimageHTML = prismicH.asImageSrc(infoimage);
  appendHtml(titleHTML, "title", i);
  appendHtml(descriptionHTML, "description", i);
  appendHtml(subinfoHTML, "info-description", i);
  appendHtml(infobtnHTML, "info-btn", i);
  appendHtml(infoimageHTML, "info-image", i, true);
};

const appendHtml = (info, id, number, image) => {
  if (image) {
    const element = document.getElementById(`${id}-${number}`);
    return (element.src = info);
  }
  const element = document.getElementById(`${id}-${number}`);
  if (info !== "") {
    element.innerHTML = info;
  } else {
    element.style.display = "none";
  }
};

init();
