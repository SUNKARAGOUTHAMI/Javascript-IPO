import { Check } from "lucide-react";

const timelineSteps = [
  { key: "biddingStarts", label: "Bidding starts" },
  { key: "biddingEnds", label: "Bidding ends" },
  { key: "allotmentFinalization", label: "Allotment finalisation" },
  { key: "refundInitiation", label: "Refund initiation" },
  { key: "dematTransfer", label: "Demat transfer" },
  { key: "listingDate", label: "Listing date" },
];

const IPOTimelineMobile = ({ timeline }) => {
  return (
    <div className="relative">
      {timelineSteps.map((step, index) => (
        <div key={step.key} className="flex items-start gap-4 relative">
          {/* Circle and connecting line */}
          <div className="relative flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index === 0 ? 'bg-success' : 'bg-muted'
            }`}>
              {index === 0 ? (
                <Check className="w-4 h-4 text-success-foreground" />
              ) : (
                <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              )}
            </div>
            {/* Vertical line */}
            {index < timelineSteps.length - 1 && (
              <div className="w-0.5 h-12 bg-border" />
            )}
          </div>

          {/* Content */}
          <div className="pb-8">
            <p className="font-medium text-foreground">{step.label}</p>
            <p className="text-sm text-muted-foreground">{timeline[step.key]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IPOTimelineMobile;
