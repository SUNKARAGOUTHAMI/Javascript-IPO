import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, Plus, X } from "lucide-react";
import { ipoData as defaultIpoData } from "../data/ipoData.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const IPOList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [ipoList, setIpoList] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newIPO, setNewIPO] = useState({
    name: "",
    fullName: "",
    issueDate: "",
    issueSize: "",
    priceRange: "",
    minInvestment: "",
    minQuantity: "",
    status: "upcoming",
    about: "",
  });

  // Load IPOs from localStorage + default data
  useEffect(() => {
    const storedIPOs = localStorage.getItem("customIPOs");
    const customIPOs = storedIPOs ? JSON.parse(storedIPOs) : [];
    setIpoList([...defaultIpoData, ...customIPOs]);
  }, []);

  // Calculate status based on listing date
  const getCalculatedStatusForFilter = (ipo) => {
    if (!ipo.timeline?.listingDate || ipo.timeline.listingDate === "TBA") {
      return ipo.status || "upcoming";
    }
    const listingDate = new Date(ipo.timeline.listingDate);
    const currentDate = new Date();
    return listingDate <= currentDate ? "listed" : "upcoming";
  };

  // Filter IPOs based on search and status
  const filteredIPOs = ipoList.filter((ipo) => {
    const matchesSearch = ipo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ipo.fullName?.toLowerCase().includes(searchQuery.toLowerCase());
    const calculatedStatus = getCalculatedStatusForFilter(ipo);
    const matchesStatus = statusFilter === "all" || calculatedStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Generate random emoji for logo
  const getRandomEmoji = () => {
    const emojis = ["🚀", "💼", "📈", "🏢", "💰", "🎯", "⭐", "🔥", "💎", "🌟"];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  // Generate random color
  const getRandomColor = () => {
    const colors = ["#FF6B35", "#FFD700", "#005BAC", "#EE2E24", "#28A745", "#6C5CE7"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Handle adding new IPO
  const handleAddIPO = () => {
    if (!newIPO.name || !newIPO.issueSize || !newIPO.priceRange) return;

    const ipoToAdd = {
      ...newIPO,
      id: newIPO.name.toLowerCase().replace(/\s+/g, "-"),
      logo: getRandomEmoji(),
      logoColor: getRandomColor(),
      timeline: {
        biddingStarts: "TBA",
        biddingEnds: "TBA",
        allotmentFinalization: "TBA",
        refundInitiation: "TBA",
        dematTransfer: "TBA",
        listingDate: "TBA",
      },
    };

    // Save to localStorage
    const storedIPOs = localStorage.getItem("customIPOs");
    const customIPOs = storedIPOs ? JSON.parse(storedIPOs) : [];
    customIPOs.push(ipoToAdd);
    localStorage.setItem("customIPOs", JSON.stringify(customIPOs));

    // Update state
    setIpoList([...ipoList, ipoToAdd]);
    setNewIPO({
      name: "",
      fullName: "",
      issueDate: "",
      issueSize: "",
      priceRange: "",
      minInvestment: "",
      minQuantity: "",
      status: "upcoming",
      about: "",
    });
    setIsAddDialogOpen(false);
  };

  // Calculate status based on listing date
  const getCalculatedStatus = (ipo) => {
    if (!ipo.timeline?.listingDate || ipo.timeline.listingDate === "TBA") {
      return ipo.status || "upcoming";
    }
    
    const listingDate = new Date(ipo.timeline.listingDate);
    const currentDate = new Date();
    
    if (listingDate <= currentDate) {
      return "listed";
    } else {
      return "upcoming";
    }
  };

  const getStatusBadge = (ipo) => {
    const status = getCalculatedStatus(ipo);
    const styles = {
      upcoming: "bg-primary/10 text-primary",
      announced: "bg-warning/10 text-warning",
      listed: "bg-success/10 text-success",
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status] || styles.upcoming}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container py-4">
          <h1 className="text-xl font-semibold text-foreground">IPO Market Watch</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-foreground">Upcoming & Recent IPOs</h2>
          
          {/* Search, Filter & Add */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search IPO..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-full sm:w-64"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="announced">Announced</SelectItem>
                <SelectItem value="listed">Listed</SelectItem>
              </SelectContent>
            </Select>

            {/* Add IPO Button */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add IPO
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New IPO</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Company Name *</label>
                      <Input
                        placeholder="e.g., ZOMATO"
                        value={newIPO.name}
                        onChange={(e) => setNewIPO({ ...newIPO, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Full Name</label>
                      <Input
                        placeholder="e.g., Zomato Limited"
                        value={newIPO.fullName}
                        onChange={(e) => setNewIPO({ ...newIPO, fullName: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Issue Size *</label>
                      <Input
                        placeholder="e.g., ₹3,600 Crores"
                        value={newIPO.issueSize}
                        onChange={(e) => setNewIPO({ ...newIPO, issueSize: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Price Range *</label>
                      <Input
                        placeholder="e.g., ₹50-60"
                        value={newIPO.priceRange}
                        onChange={(e) => setNewIPO({ ...newIPO, priceRange: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Min Investment</label>
                      <Input
                        placeholder="e.g., ₹50,000"
                        value={newIPO.minInvestment}
                        onChange={(e) => setNewIPO({ ...newIPO, minInvestment: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Min Quantity</label>
                      <Input
                        placeholder="e.g., 100 Shares"
                        value={newIPO.minQuantity}
                        onChange={(e) => setNewIPO({ ...newIPO, minQuantity: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Issue Date</label>
                      <Input
                        placeholder="e.g., 4th - 7th Oct 2024"
                        value={newIPO.issueDate}
                        onChange={(e) => setNewIPO({ ...newIPO, issueDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Status</label>
                      <Select value={newIPO.status} onValueChange={(val) => setNewIPO({ ...newIPO, status: val })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="upcoming">Upcoming</SelectItem>
                          <SelectItem value="announced">Announced</SelectItem>
                          <SelectItem value="listed">Listed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">About</label>
                    <Input
                      placeholder="Brief description about the company..."
                      value={newIPO.about}
                      onChange={(e) => setNewIPO({ ...newIPO, about: e.target.value })}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddIPO}>Add IPO</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredIPOs.length} of {ipoList.length} IPOs
        </p>
        
        {/* Desktop Table */}
        <div className="hidden md:block bg-card rounded-lg border border-border overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-5 bg-table-header px-6 py-3 text-sm font-medium text-muted-foreground">
            <div>Company / Issue date</div>
            <div className="text-center">Issue size</div>
            <div className="text-center">Price range</div>
            <div className="text-center">Status</div>
            <div className="text-right">Min invest/qty</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {filteredIPOs.length === 0 ? (
              <div className="px-6 py-8 text-center text-muted-foreground">
                No IPOs found matching your criteria.
              </div>
            ) : (
              filteredIPOs.map((ipo) => (
                <Link
                  key={ipo.id}
                  to={`/ipo/${ipo.id}`}
                  className="grid grid-cols-5 px-6 py-4 items-center hover:bg-secondary/50 transition-colors"
                >
                  {/* Company Info */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                      style={{ backgroundColor: `${ipo.logoColor}20` }}
                    >
                      {ipo.logo}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{ipo.name}</p>
                      <p className="text-sm text-muted-foreground">{ipo.issueDate}</p>
                    </div>
                  </div>

                  {/* Issue Size */}
                  <div className="text-center">
                    <p className="font-semibold text-foreground">{ipo.issueSize}</p>
                  </div>

                  {/* Price Range */}
                  <div className="text-center">
                    <p className="font-semibold text-foreground">{ipo.priceRange}</p>
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    {getStatusBadge(ipo)}
                  </div>

                  {/* Min Investment */}
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{ipo.minInvestment}</p>
                    <p className="text-sm text-muted-foreground">{ipo.minQuantity}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {filteredIPOs.length === 0 ? (
            <div className="bg-card rounded-lg border border-border p-8 text-center text-muted-foreground">
              No IPOs found matching your criteria.
            </div>
          ) : (
            filteredIPOs.map((ipo) => (
              <Link
                key={ipo.id}
                to={`/ipo/${ipo.id}`}
                className="block bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                      style={{ backgroundColor: `${ipo.logoColor}20` }}
                    >
                      {ipo.logo}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{ipo.name}</p>
                      <p className="text-sm text-muted-foreground">{ipo.issueDate}</p>
                    </div>
                  </div>
                  {getStatusBadge(ipo)}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Issue size</p>
                    <p className="font-semibold text-foreground">{ipo.issueSize}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Price range</p>
                    <p className="font-semibold text-foreground">{ipo.priceRange}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Min. Amount</p>
                    <p className="font-semibold text-foreground">{ipo.minInvestment}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Min. Quantity</p>
                    <p className="font-semibold text-foreground">{ipo.minQuantity}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default IPOList;
