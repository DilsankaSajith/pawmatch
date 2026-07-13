import { DashboardPage } from "@/components/dashboard-page";
import HotspotMap from "./HotspotMap";

const page = async () => {
  return (
    <DashboardPage
      title="Hotspot Map"
      subtitle="Reported animal sightings and hotspot areas."
    >
      <HotspotMap />
    </DashboardPage>
  );
};

export default page;
