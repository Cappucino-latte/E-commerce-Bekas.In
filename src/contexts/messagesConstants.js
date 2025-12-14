// Mock conversation data for messages context
export const mockConversations = [
  {
    id: 1,
    productId: 1,
    productTitle: "iPhone 13 Pro 256GB Sierra Blue",
    seller: "Gadget Store ID",
    buyer: "John Doe",
    lastMessage: "Barang masih tersedia?",
    timestamp: new Date().toISOString(),
    unreadCount: 2,
    messages: [
      {
        id: 1,
        sender: "John Doe",
        message: "Halo, apakah iPhone 13 Pro ini masih tersedia?",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isRead: true
      },
      {
        id: 2,
        sender: "Gadget Store ID",
        message: "Halo! Ya masih tersedia. Kondisi bagus banget, masih mulus.",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        isRead: true
      },
      {
        id: 3,
        sender: "John Doe",
        message: "Barang masih tersedia?",
        timestamp: new Date().toISOString(),
        isRead: false
      }
    ]
  },
  {
    id: 2,
    productId: 3,
    productTitle: "Sony WH-1000XM4 Noise Cancelling",
    seller: "Audio Pro",
    buyer: "Jane Smith",
    lastMessage: "Bisa kirim ke Bandung?",
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    unreadCount: 1,
    messages: [
      {
        id: 1,
        sender: "Jane Smith",
        message: "Halo, headphone ini masih ada?",
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        isRead: true
      },
      {
        id: 2,
        sender: "Audio Pro",
        message: "Ya masih ada! Bisa kirim ke Bandung juga.",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        isRead: true
      },
      {
        id: 3,
        sender: "Jane Smith",
        message: "Bisa kirim ke Bandung?",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        isRead: false
      }
    ]
  }
];
