// src/pages/PriceListPage/PriceListPage.tsx
import React from "react";
import FraksjonTab from "./tabs/FraksjonTab";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/shadcn/tabs";

/**
 * PriceListPage
 * -------------------
 * Viser priser for Fraksjon, Leie, Gebyr osv. via faner.
 */
export default function PriceListPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Prisliste</h1>

      <Tabs defaultValue="fraksjon">
        <TabsList>
          <TabsTrigger value="fraksjon">Fraksjoner</TabsTrigger>
          {/* <TabsTrigger value="leie">Leie</TabsTrigger>
          <TabsTrigger value="gebyr">Gebyr</TabsTrigger> */}
        </TabsList>

        <TabsContent value="fraksjon">
          <FraksjonTab />
        </TabsContent>

        {/* <TabsContent value="leie">
          <LeieTab />
        </TabsContent>
        <TabsContent value="gebyr">
          <GebyrTab />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
