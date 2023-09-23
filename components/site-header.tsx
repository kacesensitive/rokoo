"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCog } from "react-icons/fa";

import { siteConfig } from "@/config/site";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function SiteHeader() {
  const [ipInput, setIpInput] = useState('');
  const [portInput, setPortInput] = useState('');
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const handleSave = () => {
    localStorage.setItem('ip', ipInput);
    localStorage.setItem('port', portInput);
    setPopoverOpen(false);
  };

  useEffect(() => {
    const ip = localStorage.getItem('ip') || '192.168.1.234';
    const port = localStorage.getItem('port') || '8060';
    setIpInput(ip);
    setPortInput(port);
  }, []);

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Popover open={isPopoverOpen}>
              <PopoverTrigger onClick={() => setPopoverOpen(!isPopoverOpen)}>
                <div
                  className={buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  })}
                  style={{ transition: "transform 0.3s" }}
                >
                  <FaCog className="h-5 w-5 transform transition-transform duration-300 hover:rotate-180" />
                  <span className="sr-only">Settings</span>
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex flex-col space-y-2 text-center">
                  <input
                    type="text"
                    placeholder="IP Address"
                    value={ipInput}
                    onChange={(e) => setIpInput(e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Port"
                    value={portInput}
                    onChange={(e) => setPortInput(e.target.value)}
                    className="p-2 border rounded"
                  />
                  <button
                    className="p-2 border rounded bg-muted-foreground text-secondary hover:bg-foreground transition-color duration-300"
                    onClick={handleSave}
                  >
                    Save
                  </button>
                </div>
              </PopoverContent>
            </Popover>
            <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div
                className={buttonVariants({
                  size: "icon",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
