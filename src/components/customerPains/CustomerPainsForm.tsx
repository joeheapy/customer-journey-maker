import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { TARIFFS } from "@/lib/types";
import { TariffRoundel } from "@/components/ui/tarrifRoundal";

interface CustomerPainsFormProps {
  onGenerate: () => Promise<void>;
  loading: boolean;
  disabled: boolean;
}

export function CustomerPainsForm({
  onGenerate,
  loading,
  disabled,
}: CustomerPainsFormProps) {
  return (
    <Card
      className={`w-full p-6 ${
        disabled ? "bg-gray-100 dark:bg-gray-800" : "gradient-blue-dark"
      } border-none`}
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Customer Pain Points</h2>
            <p className="text-base text-foreground">
              {disabled
                ? "Create a service story first to identify pain points."
                : "Identify likely customer pain points at each journey step."}
            </p>
          </div>
          <div>
            <TariffRoundel cost={TARIFFS.customerPains} variant="small" />
          </div>
        </div>
        <Button
          type="submit"
          onClick={onGenerate}
          disabled={loading || disabled}
          className={`hover:opacity-70 transition-opacity ${
            disabled ? "opacity-60" : ""
          }`}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loading ? "Saving you time..." : "Identify Customer Pain Points"}
        </Button>
      </div>
    </Card>
  );
}
