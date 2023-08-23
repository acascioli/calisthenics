"use client";

import { CreateOrganization } from "@clerk/clerk-react";

const CreateOrganizationPage = () => {
  return (
    <CreateOrganization
      afterCreateOrganizationUrl={
        process.env.NEXT_PUBLIC_CLERK_AFTER_CREATE_ORGANIZATION_URL
      }
    />
  );
};

export default CreateOrganizationPage;
