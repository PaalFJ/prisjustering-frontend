// src/pages/MasterDataPage.tsx

import { useState } from "react";
import { useMasterData } from "@/hooks/useMasterData";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/shadcn/tabs";

import FraksjonsgruppeTab from "../MasterDataPage/tabs/FraksjonsgruppeTab";
import EnhetTab from "./tabs/EnhetTab";
import MottakTab from "./tabs/MottakTab";
import LeverandorTab from "./tabs/LeverandorTab";
import TransportorTab from "./tabs/TransportorTab";
import ContainerTypeTab from "./tabs/ContainerTypeTab";
import BehandlingsmetodeTab from "./tabs/BehandlingsmetodeTab";
import ContainerTab from "./tabs/ContainerTab";

type TabKey =
  | "fraksjonsgrupper"
  | "enheter"
  | "leverandorer"
  | "transportorer"
  | "containerTyper"
  | "mottak"
  | "behandlingsmetoder"
  | "containere";

const tabConfig: { key: TabKey; title: string }[] = [
  { key: "fraksjonsgrupper", title: "Fraksjonsgrupper" },
  { key: "enheter", title: "Enheter" },
  { key: "leverandorer", title: "Leverandører" },
  { key: "transportorer", title: "Transportører" },
  { key: "containerTyper", title: "Containertyper" },
  { key: "mottak", title: "Mottak" },
  { key: "behandlingsmetoder", title: "Behandlingsmetoder" },
  { key: "containere", title: "Containere" },
];

export default function MasterDataPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("fraksjonsgrupper");
  const { isLoading, error } = useMasterData();

  if (isLoading) return <p>Vent litt, laster grunndata… Mr.Incredible</p>;
  if (error) return <p style={{ color: "red" }}>Feil: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Grunndata</h1>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabKey)}>
        <TabsList>
          {tabConfig.map(({ key, title }) => (
            <TabsTrigger key={key} value={key}>
              {title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="fraksjonsgrupper">
          <FraksjonsgruppeTab />
        </TabsContent>

        <TabsContent value="enheter">
          <EnhetTab />
        </TabsContent>

        <TabsContent value="mottak">
          <MottakTab />
        </TabsContent>

        <TabsContent value="leverandorer">
          <LeverandorTab />
        </TabsContent>

        <TabsContent value="transportorer">
          <TransportorTab />
        </TabsContent>

        <TabsContent value="containerTyper">
          <ContainerTypeTab />
        </TabsContent>

        <TabsContent value="behandlingsmetoder">
          <BehandlingsmetodeTab />
        </TabsContent>

        <TabsContent value="containere">
          <ContainerTab />
        </TabsContent>

        {/* For fremtidige moduler */}
        {/* <TabsContent value="enheter"><EnhetTab /></TabsContent>
        <TabsContent value="leverandorer"><LeverandorTab /></TabsContent> */}
      </Tabs>
    </div>
  );
}
