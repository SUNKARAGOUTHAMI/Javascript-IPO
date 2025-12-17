import { useParams, Link } from "react-router-dom";
import { getIPOById } from "../data/ipoData.js";
import { ChevronLeft, ChevronRight, Download, Check } from "lucide-react";
import IPOTimeline from "../components/IPOTimeline.jsx";
import IPOTimelineMobile from "../components/IPOTimelineMobile.jsx";
import { useToast } from "@/hooks/use-toast";

const IPODetails = () => {
  const { id } = useParams();
  const ipo = getIPOById(id);
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Download Successful",
      description: "IPO document has been downloaded successfully.",
    });
  };

  const handleApply = () => {
    toast({
      title: "Application Submitted",
      description: "Your IPO application has been submitted successfully.",
    });
  };

  if (!ipo) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-2">IPO Not Found</h1>
          <Link to="/" className="text-primary hover:underline">
            Back to IPO List
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb - Desktop */}
      <div className="hidden md:block border-b border-border bg-card">
        <div className="container py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
            <span className="text-foreground">Market watch</span>
          </nav>
        </div>
      </div>

      {/* Header - Desktop */}
      <div className="hidden md:block border-b border-border bg-card">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </Link>
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                style={{ backgroundColor: `${ipo.logoColor}20` }}
              >
                {ipo.logo}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">{ipo.name}</h1>
                <p className="text-sm text-muted-foreground">{ipo.fullName}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={handleDownload}
                className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition-colors"
              >
                <Download className="w-5 h-5 text-foreground" />
              </button>
              <button 
                onClick={handleApply}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Apply now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Header - Mobile */}
      <div className="md:hidden border-b border-border bg-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <Link
            to="/"
            className="w-8 h-8 rounded-lg border border-border flex items-center justify-center"
          >
            <ChevronLeft className="w-4 h-4 text-foreground" />
          </Link>
          <span className="text-sm font-medium text-foreground">IPO details</span>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
            style={{ backgroundColor: `${ipo.logoColor}20` }}
          >
            {ipo.logo}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">{ipo.name}</h1>
            <p className="text-sm text-muted-foreground">{ipo.fullName}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container py-6 space-y-6">
        {/* IPO Details Card */}
        <section className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">IPO details</h2>

          {/* Desktop Grid */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-6 pb-4 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Issue size</p>
                <p className="font-semibold text-foreground">₹3,600 - 3,700 Cr.</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price range</p>
                <p className="font-semibold text-foreground">{ipo.priceRange}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Minimum amount</p>
                <p className="font-semibold text-foreground">{ipo.minInvestment}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Lot size</p>
                <p className="font-semibold text-foreground">{ipo.minQuantity}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-6 pt-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Issue dates</p>
                <p className="font-semibold text-foreground">{ipo.issueDate}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Listed on</p>
                <p className="font-semibold text-foreground">{ipo.listedOn || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Listed price</p>
                <p className="font-semibold text-foreground">{ipo.listedPrice || "-"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Listing gains</p>
                {ipo.listingGains ? (
                  <p className="font-semibold">
                    <span className="text-foreground">{ipo.listingGains.value}</span>
                    <span className="text-success ml-1">({ipo.listingGains.percentage})</span>
                  </p>
                ) : (
                  <p className="font-semibold text-foreground">-</p>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Grid */}
          <div className="md:hidden space-y-4">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Issue size</p>
                <p className="font-semibold text-foreground">₹2,877 - 3,028 Cr.</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Price range</p>
                <p className="font-semibold text-foreground">₹1,026 - 1,080</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Min. Amount</p>
                <p className="font-semibold text-foreground">{ipo.minInvestment}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Min. Quantity</p>
                <p className="font-semibold text-foreground">150 shares</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Issue dates</p>
              <p className="font-semibold text-foreground">{ipo.issueDate}</p>
            </div>
          </div>
        </section>

        {/* IPO Timeline */}
        <section className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">IPO timeline</h2>
          
          {/* Desktop Timeline */}
          <div className="hidden md:block">
            <IPOTimeline timeline={ipo.timeline} />
          </div>

          {/* Mobile Timeline */}
          <div className="md:hidden">
            <IPOTimelineMobile timeline={ipo.timeline} />
          </div>
        </section>

        {/* About the Company */}
        <section className="bg-card rounded-lg border border-border p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">About the company</h2>
          <div className="text-muted-foreground leading-relaxed space-y-4">
            <p>{ipo.about}</p>
            <p>
              Lorem ipsum dolor sit amet. Ea reprehenderit quia cum consequuntur deleniti rem odio enim sit corporis galisum est quisquam magni ea sequi maxime. Aut incidunt adipisci in fuga necessitatibus aut inventore enim.
            </p>
            <button className="text-primary font-medium hover:underline md:hidden">
              Read more
            </button>
          </div>
        </section>

        {/* Mobile Apply Button */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
          <button 
            onClick={handleApply}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Apply now
          </button>
        </div>
      </main>
    </div>
  );
};

export default IPODetails;
