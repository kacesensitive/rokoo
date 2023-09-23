"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { FiMoon, FiSun } from "react-icons/fi"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FiSun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <FiMoon className="hidden h-5 w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
