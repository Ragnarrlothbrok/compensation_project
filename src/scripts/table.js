const table = document.getElementById("breakdown-table");
const showTable = document.getElementById("breakdown");

const close = document.getElementsByClassName("close")[0];

showTable.onclick = () => {
  table.style.display = "block";
};

close.onclick = () => {
  table.style.display = "none";
};

