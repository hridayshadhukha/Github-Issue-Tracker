const loadCards = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayCards(data.data));
};

const displayCards = (cards) => {
  const cardContainer = document.getElementById("card-container");

  cardContainer.innerHTML = "";

  cards.forEach((card) => {
    let statusImage = "";

    if (card.priority == "high" || card.priority == "medium") {
      statusImage = `<img src="./assets/Open-Status.png" class="w-6 h-6 object-contain"/>`;
    } else {
      statusImage = `<img src="./assets/Closed- Status .png" class="w-6 h-6 object-contain"/>`;
    }

    let priority = card.priority;

    let badgeColor = "";

    if (priority === "high") {
      badgeColor = "text-[#EF4444] bg-[#FEECEC]";
    } else if (priority === "medium") {
      badgeColor = "text-[#F59E0B] bg-[#FFF6D1]";
    } else {
      badgeColor = "text-[#9CA3AF] bg-[#EEEFF2]";
    }

    const labels = card.labels
      .map(
        (label) =>
          `<span class="text-sm px-2 py-1 bg-gray-200 rounded-full">${label}</span>`,
      )
      .join(" ");



    const allCards = document.createElement("div");
    allCards.innerHTML = `
    
    <div class=" card w-72 h-[340px] bg-white shadow-md border-t-4 border-[#00A96E]">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <div
          >
            ${statusImage}
          </div>

          <div
            class="badge px-5 py-3 text-base rounded-full uppercase ${badgeColor}"
          >
            ${card.priority}
          </div>
        </div>

        <h2 class="card-title text-base text-[#1F2937] font-semibold">
          ${card.title}
        </h2>

        <p class="text-[#64748B] text-sm">
          ${card.description}
        </p>

        <div class="flex gap-2">
          ${labels}
        </div>

      </div>

      <div class="border-t px-6 py-3 text-sm text-[#64748B]">
        <p>#${card.id} by ${card.author}</p>
        <p>${new Date(card.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
      </div>

    `;

    cardContainer.append(allCards);
  });
};

loadCards();
