// src/pages/ArticlesPage/ArticlesPage.tsx
import FraksjonTab from "../ArticlesPage/tabs/FraksjonTab";
import LeieTab from "../ArticlesPage/tabs/LeieTab";
import SalgsvareTab from "./tabs/SalgsvareTab";
import GebyrTab from "./tabs/GebyrTab";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/shadcn/tabs";

export default function ArticlesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Artikler</h1>
      <Tabs defaultValue="fraksjon">
        <TabsList>
          <TabsTrigger value="fraksjon">Fraksjoner</TabsTrigger>
          <TabsTrigger value="leie">Leie</TabsTrigger>
          <TabsTrigger value="salgsvare">Salgsvare</TabsTrigger>
          <TabsTrigger value="gebyr">Gebyrer</TabsTrigger>
          {/* Add more tabs as needed */}
          {/* <TabsTrigger value="leie">Leie</TabsTrigger> */}
        </TabsList>

        <TabsContent value="fraksjon">
          <FraksjonTab />
        </TabsContent>

        <TabsContent value="leie">
          <LeieTab />
        </TabsContent>

        <TabsContent value="salgsvare">
          <SalgsvareTab />
        </TabsContent>

        <TabsContent value="gebyr">
          <GebyrTab />
        </TabsContent>

        {/* <TabsContent value="leie">
          <LeieTab />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
