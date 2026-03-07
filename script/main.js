const loadCards = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayCards(data.data));
};

const displayCards = (cards) => {
  const cardContainer = document.getElementById("card-container");

  cards.forEach((card) => {

    const allCards = document.createElement("div");
    allCards.innerHTML = `
    
    <div class="card w-80 bg-white shadow-md border-t-4 border-[#00A96E]">
      <div class="card-body">
        <div class="flex justify-between items-center">
          <div
            class="w-10 h-10 rounded-full bg-[#CBFADB] flex items-center justify-center text-[#00A96E]"
          >
            ${card.status}
          </div>

          <div
            class="badge px-5 py-3 text-base rounded-full text-[#EF4444] bg-[#FEECEC] uppercase"
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

        <div class="flex gap-2 mt-2">
          <span class="badge px-4 py-3 text-[#EF4444] bg-[#FEECEC] rounded-full">${word.labels[0]}</span>
          <span class="badge badge-warning badge-outline">HELP WANTED</span>
        </div>
      </div>

      <div class="border-t px-6 py-3 text-sm text-gray-500">
        <p>#1 by john_doe</p>
        <p>1/15/2024</p>
      </div>
    </div>
    `;

    cardContainer.append(allCards);
  });
};

loadCards();
