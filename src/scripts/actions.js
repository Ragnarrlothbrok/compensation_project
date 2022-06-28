const initialData = {
  year1: {
    benefits: 20400,
    "target-bonus": 1700,
    "sign-bonus": 10000,
    equity: 77500,
    base: 100000,
  },
  year2: {
    benefits: 20400,
    "target-bonus": 1700,
    "sign-bonus": 0,
    equity: 77500,
    base: 105085,
  },
  year3: {
    benefits: 20400,
    "target-bonus": 1700,
    "sign-bonus": 0,
    equity: 77500,
    base: 110000,
  },
  year4: {
    benefits: 20400,
    "target-bonus": 1700,
    "sign-bonus": 0,
    equity: 77500,
    base: 118500,
  },
};

let duration = "year1";

const initialTotal = (key) => {
  return Object.values(initialData[key]).reduce((sum, a) => sum + a, 0);
};

let total = {
  year1: initialTotal("year1"),
  year2: initialTotal("year2"),
  year3: initialTotal("year3"),
  year4: initialTotal("year4"),
};

const totalCopy = {...total};

const setTotal = (opTime, add, salElement) => {
  if (opTime === "all") {
    const iterations = Object.keys(initialData);
    iterations.forEach((year) => {
      const opAmount = salElement === "" ? 0 : initialData[year][salElement];
      total[year] = add ? total[year] + opAmount : total[year] - opAmount;
      document.getElementById(`${year}-amount`).innerHTML = total[year];
    });
  } else {
    const opAmount = initialData[duration][salElement];
    total[opTime] = add ? total[opTime] + opAmount : total[opTime] - opAmount;
    document.getElementById(`${opTime}-amount`).innerHTML = total[opTime];
  }
};

const setInitialHeight = (displayAll = false) => {
  console.log("Initial data running");
  const iterations = Object.keys(initialData);
  iterations.forEach((year) => {
    const elements = [...document.getElementById(year).children];
    const yearVal = initialData[year];
    elements.forEach((element) => {
      const height = yearVal[element.className.substring(4)] * 0.00225;
      element.style.height = `${height}px`;
      displayAll ? element.style.display = "flex" : null;
    });
  });
};

const setControlAmounts = (opTime) => {
  if (opTime === "all") {
    return null;
  } else {
    const salElements = [
      "benefits",
      "target-bonus",
      "sign-bonus",
      "equity",
      "base",
    ];
    salElements.forEach((item) => {
      const targetEl = document.getElementById(`element-${item}`);
      targetEl.innerHTML = initialData[opTime][item];
    });
  }
};

const resetToggleState = () => {
  let togglebtns = document.querySelectorAll(".toggle");
  togglebtns.forEach((element) => {
    if (!element.classList.contains("toggle-onn"))
      element.classList.add("toggle-on");
  });
};

//Initial Dynamic value setting calls.

setInitialHeight();

setTotal("all", true, "");

setControlAmounts(duration);

//button click actions

let yearSelect = document.getElementById("year-control");

yearSelect.addEventListener("change", (e) => {
  duration = e.target.value;
  setControlAmounts(duration);
  total = totalCopy;
  resetToggleState();
  setInitialHeight(true);
  setTotal("all", true, "");
});

let togglebtns = [...document.getElementsByClassName("switch")];

const toggleForAll = (edit, element) => {
  const iterations = Object.keys(initialData);
  if (edit) {
    iterations.forEach((year) => {
      const targetElement = document.getElementById(`${year}-${element}`);
      targetElement.style.display = "flex";
    });
  } else {
    iterations.forEach((year) => {
      const targetElement = document.getElementById(`${year}-${element}`);
      targetElement.style.display = "none";
    });
  }
};

togglebtns.forEach((toggler) => {
  toggler.addEventListener("click", () => {
    if (toggler.children[0].classList.contains("toggle-on")) {
      toggler.children[0].classList.remove("toggle-on");
      const targetelement = toggler.children[0].classList[1];
      setTotal(duration, false, targetelement);
      if (duration === "all") {
        toggleForAll(false, targetelement);
      } else {
        const targetdiv = document.getElementById(
          `${duration}-${targetelement}`
        );
        targetdiv.style.display = "none";
      }
    } else {
      toggler.children[0].classList.add("toggle-on");
      const targetelement = toggler.children[0].classList[1];
      setTotal(duration, true, targetelement);
      if (duration === "all") {
        toggleForAll(true, targetelement);
      } else {
        const targetdiv = document.getElementById(
          `${duration}-${targetelement}`
        );
        targetdiv.style.display = "flex";
      }
    }
  });
});

//creating table

const headerCreator = (headRow) => {
  let arr = [
    "Year",
    "Benefits",
    "Target-bonus",
    "Sign-on-bonus",
    "Equity",
    "Base",
  ];
  arr.forEach((el) => {
    let heading = document.createElement("th");
    heading.innerHTML = el;
    headRow.appendChild(heading);
  });
};

//function to have flexibility of adding just the data and not having to rewrite table code.
const dataRowCreator = (bodyEl) => {
  const iterations = Object.keys(initialData);
  iterations.forEach((year) => {
    let row = document.createElement("tr");
    let yearName = document.createElement("td");
    yearName.innerHTML = year;
    row.appendChild(yearName);
    let data = initialData[year];
    Object.values(data).forEach((val) => {
      let tr = document.createElement("td");
      tr.innerHTML = val;
      row.appendChild(tr);
    });
    bodyEl.appendChild(row);
  });
};

let breakdownTable = document.createElement("table");
breakdownTable.classList.add("breakdown-data");
let thead = document.createElement("thead");
let tbody = document.createElement("tbody");
tbody.classList.add("table-data");

document.getElementById("table-body").appendChild(breakdownTable);

let headingRow = document.createElement("tr");

headerCreator(headingRow);
thead.appendChild(headingRow);
dataRowCreator(tbody);

breakdownTable.appendChild(thead);
breakdownTable.appendChild(tbody);
