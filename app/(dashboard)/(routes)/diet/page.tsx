import { Heading } from "@/components/heading";
import { ChefHat } from "lucide-react";
import fs from "fs";
import ReactMarkdown from "react-markdown";

const getDocContent = () => {
  const file = "data/test.md";
  const content = fs.readFileSync(file, "utf8");
  return content;
};

export default function DietPage() {
  const content = getDocContent();
  return (
    <div>
      <Heading
        title="Diet"
        description="Monitor your diet."
        icon={ChefHat}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 md:px-8 space-y-6">
        <ReactMarkdown className="prose">{content}</ReactMarkdown>
      </div>
    </div>
  );
}
