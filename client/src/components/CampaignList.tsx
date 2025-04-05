import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import axios from "@/utils/axios";
import CampaignCard from "./CampaignCard";

interface Campaign {
  _id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "deleted";
  leads: string[];
  accountIDs: string[];
}

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/campaign");
      console.log(response);
      setCampaigns(response.data.campaigns);
    } catch {
      toast.error("Failed to fetch campaigns. Please try again.");
    }
    setLoading(false);
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await axios.patch(`/campaign/${id}`, {
        status: newStatus,
      });

      // updating campaigns state
      setCampaigns((preCampaigns) =>
        preCampaigns.map((localCampaigns) => {
          if (localCampaigns._id == response.data.campaign._id) {
            return response.data.campaign;
          }
          return localCampaigns;
        })
      );
      toast.success(`Campaign status changed to ${newStatus}`);
    } catch {
      toast.error("Failed to update campaign status.");
    }
  };

  const deleteCampaign = async (id: string) => {
    try {
      await axios.delete(`/campaign/${id}`);
      fetchCampaigns();
      toast.success("Campaign has been successfully deleted.");
    } catch {
      toast.error("Failed to delete campaign.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Campaigns</h1>
        <Link to="/campaigns/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </Link>
      </div>

      <div className="rounded-md border">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                  Name
                </th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                  Description
                </th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                  Status
                </th>
                <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            {loading && (
              <>
                <p>Loading....</p>
              </>
            )}

            {!loading && campaigns.length ? (
              <>
                <tbody className="[&_tr:last-child]:border-0">
                  {campaigns.map((campaign) => (
                    <CampaignCard
                      campaign={campaign}
                      key={campaign._id}
                      deleteCampaign={deleteCampaign}
                      toggleStatus={toggleStatus}
                    />
                  ))}
                </tbody>
              </>
            ) : null}
          </table>

          {!loading && !campaigns.length ? (
            <div className="flex items-center justify-center min-h-[200px] p-4 w-full">
              <h1 className="font-bold text-xl">😥 No Campaigns found</h1>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CampaignList;
