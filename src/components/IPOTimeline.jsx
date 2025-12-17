import { Check } from "lucide-react";

const timelineSteps = [
  { key: "biddingStarts", label: "Bidding starts" },
  { key: "biddingEnds", label: "Bidding ends" },
  { key: "allotmentFinalization", label: "Allotment finalization" },
  { key: "refundInitiation", label: "Refund initiation" },
  { key: "dematTransfer", label: "Demat transfer" },
  { key: "listingDate", label: "Listing date" },
];

const IPOTimeline = ({ timeline }) => {
  return (
    <div className="relative">
      {/* Timeline Container */}
      <div className="flex justify-between items-start">
        {timelineSteps.map((step, index) => (
          <div key={step.key} className="flex flex-col items-center flex-1">
            {/* Circle with checkmark */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                <Check className="w-5 h-5 text-success-foreground" />
              </div>
              {/* Connecting line */}
              {index < timelineSteps.length - 1 && (
                <div className="absolute top-1/2 left-full w-full h-0.5 bg-success -translate-y-1/2" 
                     style={{ width: 'calc(100% + 2rem)' }} />
              )}
            </div>
            {/* Labels */}
            <div className="mt-3 text-center">
              <p className="text-sm font-medium text-foreground">{step.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{timeline[step.key]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IPOTimeline;
