import { exportSummaryToNotion } from "@/actions/export_to_notion"
import { Button } from "../ui/button"

import { useUser } from "@clerk/nextjs";

export default function NotionButton({ summary_text, title }: {
    summary_text: string;
    title: string;
}) {
    const { user } = useUser();

    console.log(
        user?.externalAccounts.map((account) => ({
            provider: account.provider,
            id: account.id,
            verification: account.verification?.status,
        }))
    );
    return (
        null
        // <Button className="cursor-pointer" onClick={()=>exportSummaryToNotion({summary_text,title})}>
        //     Export to Notion
        // </Button>
    )
}