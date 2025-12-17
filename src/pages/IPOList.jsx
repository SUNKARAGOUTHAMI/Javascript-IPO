import { Link } from "react-router-dom";
import { ipoData } from "../data/ipoData.js";

const IPOList = () => {
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
        <h2 className="text-lg font-semibold text-foreground mb-4">Upcoming & Recent IPOs</h2>
        
        {/* Desktop Table */}
        <div className="hidden md:block bg-card rounded-lg border border-border overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-table-header px-6 py-3 text-sm font-medium text-muted-foreground">
            <div>Company / Issue date</div>
            <div className="text-center">Issue size</div>
            <div className="text-center">Price range</div>
            <div className="text-right">Min invest/qty</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {ipoData.map((ipo) => (
              <Link
                key={ipo.id}
                to={`/ipo/${ipo.id}`}
                className="grid grid-cols-4 px-6 py-4 items-center hover:bg-secondary/50 transition-colors"
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

                {/* Min Investment */}
                <div className="text-right">
                  <p className="font-semibold text-foreground">{ipo.minInvestment}</p>
                  <p className="text-sm text-muted-foreground">{ipo.minQuantity}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4">
          {ipoData.map((ipo) => (
            <Link
              key={ipo.id}
              to={`/ipo/${ipo.id}`}
              className="block bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
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
          ))}
        </div>
      </main>
    </div>
  );
};

export default IPOList;
