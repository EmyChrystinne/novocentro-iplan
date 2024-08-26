const maps = [
  {
    title: "Proposta Mobilidade Urbana",
    imgSrc: "../img/mapamobilidademultimodal.png",
    titleId: "Multimodal",
  },
  {
    title: "Proposta Requalificação Peatonal",
    imgSrc: "../img/maparequalificaçãopeatonal.png",
    titleId: "Peatonal",
  },
  {
    title: "Proposta Rota das Igrejas e Paisagens",
    imgSrc: "../img/maparotadasigrejasepaisagens.png",
    titleId: "Rota",
  },
];

let currentMapIndex = 0;

const leftButton = document.getElementById("esquerda");
const rightButton = document.getElementById("direita");
const mapImg = document.querySelector(".mapeamento .mapa img");
const titleElems = document.querySelectorAll(".title-mapa-atual h1");

function updateMap() {
  mapImg.src = maps[currentMapIndex].imgSrc;

  titleElems.forEach((titleElem) => {
    titleElem.style.display =
      titleElem.id === maps[currentMapIndex].titleId ? "block" : "none";
  });
}

// Initialize the first map
updateMap();

leftButton.addEventListener("click", () => {
  currentMapIndex = (currentMapIndex - 1 + maps.length) % maps.length;
  updateMap();
});

rightButton.addEventListener("click", () => {
  currentMapIndex = (currentMapIndex + 1) % maps.length;
  updateMap();
});

document.addEventListener("DOMContentLoaded", (event) => {
  const mapPopup = document.getElementById("map-popup");
  const mapPopupImg = document.getElementById("map-popup-img");
  const closeMapPopup = document.getElementById("close-map-popup");

  // Função para abrir o popup com a imagem do mapa
  function openMapPopup(imgSrc) {
    mapPopupImg.src = imgSrc;
    mapPopup.style.display = "flex";
  }

  // Função para fechar o popup
  closeMapPopup.addEventListener("click", () => {
    mapPopup.style.display = "none";
  });

  // Adiciona evento de clique à imagem do mapa
  const mapImage = document.querySelector(".mapeamento .mapa img");
  if (mapImage) {
    mapImage.addEventListener("click", () => {
      openMapPopup(mapImage.src);
    });
  }
});
