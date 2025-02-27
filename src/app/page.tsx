"use client";

import { useState, JSX } from "react";
import { JourneyContainer } from "@/components/journeySteps/JourneyContainer";
import { CustomerPainsContainer } from "@/components/customerPains/CustomerPainsContainer";
import { BusinessPainsContainer } from "@/components/businessPains/BusinessPainsContainer";
import { PersonasContainer } from "@/components/personas/PersonasContainer";
import { FeaturesContainer } from "@/components/features/FeaturesContainer";
import { EnablersContainer } from "@/components/enablers/EnablersContainer";
import { NavBar } from "@/components/ui/navBar";
import {
  JourneyStep,
  CustomerPainPointData,
  BusinessPainPointData,
  PersonaData,
  TARIFFS,
} from "@/lib/types";
import { useTokens } from "@/utils/useTokens";

export default function Home(): JSX.Element {
  const { Tokens, deductTokens, resetTokens } = useTokens();
  const [journeySteps, setJourneySteps] = useState<JourneyStep[]>([]);
  const [customerPains, setCustomerPains] = useState<CustomerPainPointData[]>(
    []
  );
  const [businessPains, setBusinessPains] = useState<BusinessPainPointData[]>(
    []
  );
  const [personaData, setPersonaData] = useState<PersonaData[]>([]);

  const handleJourneyGenerated = (steps: JourneyStep[]): void => {
    try {
      deductTokens(TARIFFS.journeySteps);
      setJourneySteps(steps);
    } catch (error) {
      console.error("Failed to generate journey:", error);
    }
  };

  const handleCustomerPainPointsGenerated = (
    pains: CustomerPainPointData[]
  ): void => {
    try {
      console.log("Received customer pains:", pains);
      setCustomerPains(pains);
      deductTokens(TARIFFS.customerPains);
    } catch (error) {
      console.error("Failed to handle customer pains:", error);
    }
  };

  const handleBusinessPainPointsGenerated = (
    pains: BusinessPainPointData[]
  ): void => {
    try {
      console.log("Received business pains:", pains);
      setBusinessPains(pains);
      deductTokens(TARIFFS.businessPains);
    } catch (error) {
      console.error("Failed to handle business pains:", error);
    }
  };

  const handlePersonasGenerated = (personas: PersonaData[]): void => {
    try {
      setPersonaData(personas); // Store personas in state
      deductTokens(TARIFFS.personas);
    } catch (error) {
      console.error("Failed to handle personas:", error);
    }
  };

  const handleFeaturesGenerated = (tariff: number): void => {
    try {
      deductTokens(tariff);
    } catch (error) {
      console.error("Failed to deduct Tokens:", error);
    }
  };

  const handleEnablersGenerated = (tariff: number): void => {
    try {
      deductTokens(tariff);
    } catch (error) {
      console.error("Failed to deduct Tokens:", error);
    }
  };

  return (
    <>
      <NavBar
        Tokens={Tokens.balance}
        error={Tokens.error}
        onReset={resetTokens}
      />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto space-y-8 py-8">
          <JourneyContainer
            journeySteps={journeySteps}
            onJourneyGenerated={handleJourneyGenerated}
          />
          <PersonasContainer
            journeySteps={journeySteps}
            onPersonasGenerated={handlePersonasGenerated}
          />
          <CustomerPainsContainer
            journeySteps={journeySteps}
            onCustomerPainPointsGenerated={handleCustomerPainPointsGenerated}
          />

          <BusinessPainsContainer
            journeySteps={journeySteps}
            onBusinessPainPointsGenerated={handleBusinessPainPointsGenerated}
          />
          <FeaturesContainer
            journeySteps={journeySteps}
            customerPains={customerPains}
            businessPains={businessPains}
            personaData={personaData} // Pass stored personas
            onFeaturesGenerated={() =>
              handleFeaturesGenerated(TARIFFS.features)
            }
          />
          <EnablersContainer
            journeySteps={journeySteps}
            customerPains={customerPains}
            businessPains={businessPains}
            personaData={personaData} // Pass stored personas
            onEnablersGenerated={() =>
              handleEnablersGenerated(TARIFFS.features)
            }
          />
        </div>
      </main>
    </>
  );
}
