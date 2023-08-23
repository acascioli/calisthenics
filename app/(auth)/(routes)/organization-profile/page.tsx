"use client";

import { Button } from "@/components/ui/button";
import { OrganizationProfile } from "@clerk/clerk-react";
import { Settings } from "lucide-react";
import { useRouter } from "next/navigation";

const OrganizationProfilePage = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Gestisci l&apos;organizzazione
        </h2>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <OrganizationProfile
          afterLeaveOrganizationUrl={
            process.env.NEXT_PUBLIC_CLERK_AFTER_CREATE_ORGANIZATION_URL
          }
        />
        <Button onClick={() => router.push("/settings")}>
          <Settings className="mr-2 h-4 w-4" /> Torna alle impostazioni
        </Button>
      </div>
    </div>
  );
};

export default OrganizationProfilePage;
