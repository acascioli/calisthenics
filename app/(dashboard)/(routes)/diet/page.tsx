import { Heading } from "@/components/heading";
import { ChefHat } from "lucide-react";
import fs from "fs";
import ReactMarkdown from "react-markdown";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@tremor/react";

const getDocContent = () => {
  const content_m = fs.readFileSync("data/diet_muscles.md", "utf8");
  const content_w = fs.readFileSync("data/diet_lose_weight.md", "utf8");
  return { content_m, content_w };
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
        <TabGroup>
          <TabList className="my-8">
            <Tab>Gain muscles</Tab>
            <Tab>Lose weight</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ReactMarkdown className="prose dark:prose-invert">
                {content.content_m}
              </ReactMarkdown>
            </TabPanel>
            <TabPanel>
              <ReactMarkdown className="prose dark:prose-invert">
                {content.content_w}
              </ReactMarkdown>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
