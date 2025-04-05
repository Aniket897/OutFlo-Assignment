import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import axios from "@/utils/axios";
import ButtonLoader from "./loaders/ButtonLoader";

interface Campaign {
  name: string;
  description: string;
  status: "active" | "inactive";
  leads: string[];
  accountIDs: string[];
}

const CampaignForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [campaign, setCampaign] = useState<Campaign>({
    name: "",
    description: "",
    status: "active",
    leads: [],
    accountIDs: [],
  });

  useEffect(() => {
    if (id) {
      fetchCampaign();
    } else {
      // assuming user creating a new campaign
      setLoading(false);
    }
  }, [id]);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/campaign/${id}`);
      console.log(response);
      setCampaign(response.data.campaign);
    } catch {
      toast.error("Failed to fetch campaign details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      if (id) {
        await axios.patch(`/campaign/${id}`, campaign);
        toast.success("Campaign updated successfully.");
      } else {
        await axios.post("/campaign", campaign);
        toast.success("Campaign created successfully");
      }
      navigate("/");
    } catch {
      toast.error("Failed to save campaign.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLeadsChange = (value: string) => {
    setCampaign({
      ...campaign,
      leads: value.split("\n"),
    });
  };

  const handleAccountIDsChange = (value: string) => {
    setCampaign({
      ...campaign,
      accountIDs: value.split("\n"),
    });
  };

  if (!campaign) {
    return <h1>No campaign found</h1>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">
          {id ? "Edit Campaign" : "New Campaign"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-4">
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="grid gap-2 flex-1">
              <Label htmlFor="name">Name * </Label>
              <Input
                id="name"
                value={campaign.name}
                onChange={(e) =>
                  setCampaign({ ...campaign, name: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2 flex-1">
              <Label htmlFor="status">Status *</Label>
              <Select
                value={campaign.status}
                onValueChange={(value: "active" | "inactive") =>
                  setCampaign({ ...campaign, status: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={campaign.description}
              onChange={(e) =>
                setCampaign({ ...campaign, description: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="leads">
              LinkedIn Profile URLs (one per line) *
            </Label>
            <Textarea
              id="leads"
              value={campaign.leads.join("\n")}
              onChange={(e) => handleLeadsChange(e.target.value)}
              placeholder="https://linkedin.com/in/profile-1&#10;https://linkedin.com/in/profile-2"
              className="min-h-[100px]"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="accountIDs">Account IDs (one per line) *</Label>
            <Textarea
              id="accountIDs"
              value={campaign.accountIDs.join("\n")}
              onChange={(e) => handleAccountIDsChange(e.target.value)}
              placeholder="123&#10;456"
              className="min-h-[100px]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            disabled={isSubmitting}
            type="submit"
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <ButtonLoader />
            ) : (
              <>
                {" "}
                <Save className="mr-2 h-4 w-4" />
                Save Campaign
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CampaignForm;
