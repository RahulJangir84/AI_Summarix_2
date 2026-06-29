"use client";

import { useState } from "react";
import { exportSummaryToNotion } from "@/actions/export_to_notion";
import { Button } from "../ui/button";
import { useUser, useReverification } from "@clerk/nextjs";
import { toast } from "sonner";
import { ExternalLink, Loader2 } from "lucide-react";

export default function NotionButton({ summary_text, title,notion_page_url,summary_id,initial_url }: {
    summary_text: string;
    title: string;
    notion_page_url?: string;
    summary_id:string;
    initial_url?:string
}) {
    const [isConnecting, setIsConnecting] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [notionUrl, setNotionUrl] = useState<string | undefined>(initial_url);
    const { user, isLoaded } = useUser();
    const createExternalAccountWithReverification = useReverification(
        async (args) => {
            if (!user) {
                throw new Error("User not loaded");
            }

            return user.createExternalAccount(args);
        }
    );

    if (!isLoaded) {
        return null;
    }

    if (!user) {
        return null;
    }
    // Check if there is an external account connected for provider "notion"
    console.log(user.externalAccounts);
    const notionAccount = user?.externalAccounts.find(
        (account) => account.provider === "notion"
    );

    async function handleConnectNotion() {
        try {
            setIsConnecting(true);
            // Trigger Clerk's OAuth flow for connecting the Notion account
            const response = await createExternalAccountWithReverification({
                strategy: "oauth_notion",
                redirectUrl: window.location.href,
            });
            // Redirect the user to the Notion authorization URL returned by Clerk
            const redirectUrl = response?.verification?.externalVerificationRedirectURL;
            if (redirectUrl) {
                window.location.href = redirectUrl.toString();
            } else {
                throw new Error("No redirect URL returned from Clerk Notion flow");
            }
        } catch (error: any) {
            console.error("Error connecting Notion account:", error);
            toast.error("Error connecting to Notion", {
                description: error.message || "Failed to initiate Notion connection",
            });
        } finally {
            setIsConnecting(false);
        }
    }

    async function handleExport() {
        try {
            setIsExporting(true);
            const result = await exportSummaryToNotion({ summary_text, title,summary_id });
            if (result?.url) {
                setNotionUrl(result.url);
                toast.success("Exported to Notion", {
                    description: "Summary successfully exported to Notion",
                    action: {
                        label: "Open page",
                        onClick: () => window.open(result.url, "_blank"),
                    },
                });
            }
        } catch (error: any) {
            console.error("Error exporting to Notion:", error);
            toast.error("Error exporting to Notion", {
                description: error.message || "Failed to export summary to Notion",
            });
        } finally {
            setIsExporting(false);
        }
    }

    if (!notionAccount) {
        return (
            <Button
                className="cursor-pointer"
                onClick={handleConnectNotion}
                disabled={isConnecting}
            >
                {isConnecting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Connecting Notion...
                    </>
                ) : (
                    "Connect Notion"
                )}
            </Button>
        );
    }
     if (notionUrl) {
        return (
            <Button 
                className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white" 
                onClick={() => window.open(notionUrl, "_blank")}
            >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in Notion
            </Button>
        );
    }

    return (
        <Button className="cursor-pointer" onClick={handleExport} disabled={isExporting}>

            {isExporting ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Exporting...
                </>
            ) : (
                "Export to Notion"
            )}
        </Button>
    );
}