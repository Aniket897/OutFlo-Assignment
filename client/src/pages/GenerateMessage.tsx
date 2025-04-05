import React, { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import axios from "@/utils/axios";
import ButtonLoader from "@/components/loaders/ButtonLoader";

interface LinkedInProfile {
  name: string;
  job_title: string;
  company: string;
  location: string;
  summary: string;
}

function GenerateMessage() {
  const [profile, setProfile] = useState<LinkedInProfile>({
    name: "",
    job_title: "",
    company: "",
    location: "",
    summary: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/personalized-message", profile);
      setMessage(response.data.message);
      toast.success("Message generated successfully.");
    } catch {
      toast.error("Failed to generate message.");
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground">
          LinkedIn Message Generator
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="job_title">Job Title *</Label>
                <Input
                  id="job_title"
                  value={profile.job_title}
                  onChange={(e) =>
                    setProfile({ ...profile, job_title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="company">Company *</Label>
                <Input
                  id="company"
                  value={profile.company}
                  onChange={(e) =>
                    setProfile({ ...profile, company: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="summary">Summary *</Label>
                <Textarea
                  id="summary"
                  value={profile.summary}
                  onChange={(e) =>
                    setProfile({ ...profile, summary: e.target.value })
                  }
                  className="min-h-[100px]"
                  required
                />
              </div>

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <ButtonLoader />
                ) : (
                  <>
                    <MessageSquare /> Generate Message
                  </>
                )}
              </Button>
            </form>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">
              Generated Message
            </h2>
            <div className="rounded-lg border bg-card p-4 min-h-[200px]">
              {message ? (
                <p className="text-card-foreground whitespace-pre-wrap text-xs">
                  {message}
                </p>
              ) : (
                <p className="text-muted-foreground italic">
                  Generated message will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GenerateMessage;
