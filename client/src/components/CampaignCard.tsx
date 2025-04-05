import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ButtonLoader from "./loaders/ButtonLoader";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Campaign {
  _id: string;
  name: string;
  description: string;
  status: "active" | "inactive" | "deleted";
  leads: string[];
  accountIDs: string[];
}

interface CampaignCardProps {
  campaign: Campaign;
  toggleStatus: (id: string, currentStatus: string) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
}

const CampaignCard = ({
  campaign,
  toggleStatus,
  deleteCampaign,
}: CampaignCardProps) => {
  const [toggleLoading, setToggleLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleToggleStatus = () => {
    setToggleLoading(true);
    toggleStatus(campaign._id, campaign.status).finally(() =>
      setToggleLoading(false)
    );
  };

  const handleDelete = () => {
    setDeleteLoading(true);
    deleteCampaign(campaign._id).finally(() => setDeleteLoading(false));
  };

  return (
    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle">{campaign.name}</td>
      <td className="p-4 align-middle">{campaign.description}</td>
      <td className="p-4 align-middle">
        <Button
        className="w-[100px]"
          disabled={toggleLoading}
          variant={campaign.status === "active" ? "default" : "secondary"}
          size="sm"
          onClick={handleToggleStatus}
        >
          {toggleLoading ? (
            <ButtonLoader />
          ) : (
            <>
              {campaign.status.charAt(0).toUpperCase() +
                campaign.status.slice(1)}
            </>
          )}
        </Button>
      </td>
      <td className="p-4 align-middle">
        <div className="flex items-center gap-2">
          <Link to={`/campaigns/edit/${campaign._id}`}>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Campaign</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this campaign? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={deleteLoading}
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deleteLoading ? <ButtonLoader /> : <> Delete</>}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </td>
    </tr>
  );
};

export default CampaignCard;
