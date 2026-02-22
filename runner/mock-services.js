const mockDB = {
  books: [{ id: "book1", title: "어린왕자 (초판본)", price: 50000 }],
  shipments: []
};

const MockServices = {
  "global-books": {
    "/api/v1/search": (params) => {
      console.log(`[Mock Bookstore] 📚 '${params.query}' 검색 중...`);
      return mockDB.books.find(b => b.title.includes(params.query)) || { error: "Not Found" };
    }
  },
  "flash-ship": {
    "/api/v1/calc": (params) => {
      console.log(`[Mock FlashShip] 💰 배송비 계산 중... (무게: ${params.weight}kg, 거리: ${params.distance}km)`);
      return { fee: 5000, currency: "KRW" };
    },
    "/api/v1/ship": (params) => {
      console.log(`[Mock FlashShip] 🚚 배송 의뢰 수신! 송장 발급 중...`);
      const id = "TRACK-" + Math.random().toString(36).substr(2, 9).toUpperCase();
      mockDB.shipments.push({ id, status: "ordered", item: params.item });
      return { tracking_id: id, status: "success" };
    }
  }
};

module.exports = MockServices;
