import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full text-center p-4 mt-4 bg-background text-foreground">
            <Link href="/privacy">
                <span className="ml-4">Privacy Policy</span>
            </Link>
            <Link href="/terms">
                <span className="ml-4">Terms of Service</span>
            </Link>
            <p className="text-sm mt-2">© {new Date().getFullYear()} {siteConfig.name}</p>
        </footer>
    )
}