export const ipoData = [
  {
    id: "go-air",
    name: "GO AIR",
    fullName: "Go Airlines (India) Limited",
    logo: "✈️",
    logoColor: "#FFD700",
    issueDate: "4th - 7th Oct 2022",
    issueSize: "₹3,600 Crores",
    priceRange: "₹50-60",
    minInvestment: "₹50,000",
    minQuantity: "100 Shares/5 Lots",
    status: "upcoming",
    timeline: {
      biddingStarts: "4 Oct 2022",
      biddingEnds: "7 Oct 2022",
      allotmentFinalization: "10 Oct 2022",
      refundInitiation: "11 Oct 2022",
      dematTransfer: "12 Oct 2022",
      listingDate: "13 Oct 2022",
    },
    listedOn: null,
    listedPrice: null,
    listingGains: null,
    about: "Go Airlines (India) Limited, operating as GoAir, is an Indian low-cost airline based in Mumbai. The airline was founded in 2005 and operates both domestic and international flights. GoAir is known for its affordable fares and punctual services across major Indian cities and select international destinations.",
  },
  {
    id: "bajaj-energy",
    name: "BAJAJ ENERGY",
    fullName: "Bajaj Energy Limited",
    logo: "⚡",
    logoColor: "#FF6B35",
    issueDate: "4th - 7th Oct 2022",
    issueSize: "₹3,600 Crores",
    priceRange: "₹50-60",
    minInvestment: "₹50,000",
    minQuantity: "100 Shares/5 Lots",
    status: "upcoming",
    timeline: {
      biddingStarts: "4 Oct 2022",
      biddingEnds: "7 Oct 2022",
      allotmentFinalization: "10 Oct 2022",
      refundInitiation: "11 Oct 2022",
      dematTransfer: "12 Oct 2022",
      listingDate: "13 Oct 2022",
    },
    listedOn: null,
    listedPrice: null,
    listingGains: null,
    about: "Bajaj Energy Limited is a thermal power generation company in India. The company operates coal-based thermal power plants with a combined installed capacity of over 2,000 MW. Bajaj Energy supplies electricity to Uttar Pradesh Power Corporation Limited under long-term power purchase agreements.",
  },
  {
    id: "oyo",
    name: "OYO",
    fullName: "OYO Private Limited",
    logo: "🏨",
    logoColor: "#EE2E24",
    issueDate: "12th - 15th Dec 2023",
    issueSize: "₹3,600 Crores",
    priceRange: "₹100-200",
    minInvestment: "₹50,000",
    minQuantity: "150 Shares/5 Lots",
    status: "listed",
    timeline: {
      biddingStarts: "12 Dec 2023",
      biddingEnds: "15 Dec 2023",
      allotmentFinalization: "18 Dec 2023",
      refundInitiation: "18 Dec 2023",
      dematTransfer: "18 Dec 2023",
      listingDate: "21 Dec 2023",
    },
    listedOn: "21 Dec 2023",
    listedPrice: "₹150",
    listingGains: { value: "₹10", percentage: "10.0%" },
    about: "OYO Private Limited is a hospitality company that operates a network of leased and franchised hotels, homes, and living spaces. Founded in 2013 by Ritesh Agarwal, OYO has grown to become one of the world's largest hospitality chains. The company operates in over 80 countries and has partnerships with thousands of property owners globally. OYO offers standardized accommodations at affordable prices through its technology-driven platform.",
  },
  {
    id: "tata-tech",
    name: "TATA TECH",
    fullName: "Tata Technologies Limited",
    logo: "🔧",
    logoColor: "#005BAC",
    issueDate: "22nd - 24th Nov 2023",
    issueSize: "₹3,042 Crores",
    priceRange: "₹475-500",
    minInvestment: "₹15,000",
    minQuantity: "30 Shares/1 Lot",
    status: "listed",
    timeline: {
      biddingStarts: "22 Nov 2023",
      biddingEnds: "24 Nov 2023",
      allotmentFinalization: "27 Nov 2023",
      refundInitiation: "28 Nov 2023",
      dematTransfer: "29 Nov 2023",
      listingDate: "30 Nov 2023",
    },
    listedOn: "30 Nov 2023",
    listedPrice: "₹1,200",
    listingGains: { value: "₹700", percentage: "140.0%" },
    about: "Tata Technologies Limited is a global engineering and product development digital services company. The company provides services to automotive OEMs, aerospace companies, and industrial machinery manufacturers. As part of the Tata Group, Tata Technologies has established itself as a leader in engineering research and development services.",
  },
];

export const getIPOById = (id) => {
  // Check default data first
  const defaultIPO = ipoData.find((ipo) => ipo.id === id);
  if (defaultIPO) return defaultIPO;
  
  // Check custom IPOs in localStorage
  const storedIPOs = localStorage.getItem("customIPOs");
  if (storedIPOs) {
    const customIPOs = JSON.parse(storedIPOs);
    return customIPOs.find((ipo) => ipo.id === id);
  }
  
  return null;
};
