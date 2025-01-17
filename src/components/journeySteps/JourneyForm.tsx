import { useState, FormEvent } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { JourneyFormData } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { TARIFFS } from "@/lib/types";
import { TariffRoundel } from "@/components/ui/tarrifRoundal";

interface JourneyFormProps {
  onSubmit: (formData: JourneyFormData) => Promise<void>;
  isLoading?: boolean;
}

export function JourneyForm({ onSubmit, isLoading = false }: JourneyFormProps) {
  const [formData, setFormData] = useState<JourneyFormData>({
    target_customers: "",
    persona_name: "",
    business_proposition: "",
    customer_scenario: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Get current Tokens from localStorage
    const currentTokens = Number(localStorage.getItem("userTokens") ?? "100");

    // Check if enough Tokens
    if (currentTokens < TARIFFS.journeySteps) {
      alert("Insufficient Tokens to generate journey steps");
      return;
    }

    try {
      await onSubmit(formData);
      // Deduct Tokens after successful generation
      const newBalance = currentTokens - TARIFFS.journeySteps;
      localStorage.setItem("userTokens", String(newBalance));
    } catch (error) {
      console.error("Failed to generate journey:", error);
      alert("Failed to generate journey steps");
    }
  };

  const handleInputChange =
    (field: keyof JourneyFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <Card className="w-full p-4 gradient-teal-lime border-none">
      <div className="space-y-6 mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">Service Story Generator</h2>
            <p className="text-base text-foreground ">
              Tell us about the customer journey you are working on.
            </p>
          </div>
          <TariffRoundel cost={TARIFFS.journeySteps} variant="small" />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="business_proposition">
              Business Proposition (add a brand name if you wish).
            </Label>
            <Input
              className="bg-destructive-foreground"
              id="business_proposition"
              placeholder="Roadside recovery for electric vehicles"
              value={formData.business_proposition}
              onChange={handleInputChange("business_proposition")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer_scenario">Customer Scenario</Label>
            <Input
              className="bg-destructive-foreground"
              id="customer_scenario"
              placeholder="Broken down on a motorway in an electric vehicle"
              value={formData.customer_scenario}
              onChange={handleInputChange("customer_scenario")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target_customers">Target Customers</Label>
            <Input
              className="bg-destructive-foreground"
              id="target_customers"
              placeholder="Motorists with electric vehicles"
              value={formData.target_customers}
              onChange={handleInputChange("target_customers")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="persona_name">
              Give the character in your service story a name.
            </Label>
            <Input
              className="bg-destructive-foreground"
              id="persona_name"
              placeholder="Larry"
              value={formData.persona_name}
              onChange={handleInputChange("persona_name")}
            />
          </div>
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            disabled={isLoading}
            className="hover:opacity-70 transition-opacity"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Saving you time..." : "Generate a Service Story"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
