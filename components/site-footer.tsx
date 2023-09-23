import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full text-center p-4 mt-4 bg-background text-foreground">
            <p>Made with ❤️ by <Link href={"kacey.dev"} className="text-red-600">kacey.dev</Link></p>
        </footer>
    )
}