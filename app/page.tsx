"use client"

import { IPScanner } from "@/components/ipscanner"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import axios from "axios"
import { motion } from "framer-motion"
import {
  ArrowBigDown,
  ArrowBigUp,
  CheckCircle,
  FastForwardIcon,
  RewindIcon,
} from "lucide-react"
import { AiOutlineEnter } from "react-icons/ai"
import { FaPlay, FaRegQuestionCircle } from "react-icons/fa"
import {
  IoArrowBack,
  IoArrowDown,
  IoArrowForward,
  IoArrowUp,
  IoHome,
  IoPower,
  IoReturnDownBack,
  IoSearch,
  IoVolumeHigh,
  IoVolumeLow,
  IoVolumeMute,
} from "react-icons/io5"

const buttonVariants = {
  initial: { scale: 1 },
  animate: { scale: 0.95 },
}

const sendCommand = (command: string) => {
  console.log("Sending command:", command)
  const ip = localStorage.getItem("ip") || "192.168.1.234"
  const port = localStorage.getItem("port") || "8060"

  axios
    .post(`http://${ip}:${port}/keypress/${command}`)
    .then((response) => {
      console.log("Pressed ", command)
    })
    .catch((error) => {
      console.error("Error sending command:", error)
    })
}

export default function TVRemote() {
  return (
    <motion.div className="flex flex-col items-center justify-center w-full h-screen">
      <div>
        <Dialog>
          <DialogTrigger>
            <Button className="mb-12">
              <div className="flex">
                Find My Roku
                <FaRegQuestionCircle className="ml-2 mt-1" />
              </div>
            </Button>
          </DialogTrigger>
          <DialogContent className="items-center justify-center">
            <DialogHeader>
              <DialogTitle>IP Scanner</DialogTitle>
              <DialogDescription>
                Find and select a Roku device on your network.
              </DialogDescription>
            </DialogHeader>
            <IPScanner />
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col items-center justify-center w-48 h-fit bg-secondary rounded-lg p-4 space-y-4 text-secondary ring-4 ring-secondary-foreground">
        {/* First Row */}
        <div className="flex space-x-4">
          <motion.button
            onClick={() => sendCommand("PowerOff")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-red-500"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <IoPower />
          </motion.button>
          <motion.button
            onClick={() => sendCommand("Home")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <IoHome />
          </motion.button>
          <motion.button
            onClick={() => sendCommand("Backspace")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <IoReturnDownBack />
          </motion.button>
        </div>

        {/* Second Row */}
        <div className="flex space-x-4">
          <motion.button
            onClick={() => sendCommand("VolumeUp")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <IoVolumeHigh />
          </motion.button>
          <div className="w-12 h-12"></div>
          <motion.button
            onClick={() => sendCommand("ChannelUp")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <ArrowBigUp />
          </motion.button>
        </div>

        {/* Third Row */}
        <div className="flex space-x-4">
          <motion.button
            onClick={() => sendCommand("VolumeDown")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <IoVolumeLow />
          </motion.button>
          <div className="w-12 h-12"></div>
          <motion.button
            onClick={() => sendCommand("ChannelDown")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <ArrowBigDown />
          </motion.button>
        </div>

        {/* Fourth Row */}
        <div className="flex space-x-4">
          <motion.button
            onClick={() => sendCommand("VolumeMute")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <IoVolumeMute />
          </motion.button>
          <motion.button
            onClick={() => sendCommand("Search")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <IoSearch />
          </motion.button>
          <motion.button
            onClick={() => sendCommand("Enter")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <AiOutlineEnter />
          </motion.button>
        </div>

        {/* Fifth Row */}
        <div className="flex space-x-4">
          <div className="w-12 h-12"></div>
          <motion.button
            onClick={() => sendCommand("Up")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <IoArrowUp />
          </motion.button>
          <div className="w-12 h-12"></div>
        </div>

        {/* Sixth Row */}
        <div className="flex space-x-4">
          <motion.button
            onClick={() => sendCommand("Left")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <IoArrowBack />
          </motion.button>
          <motion.button
            onClick={() => sendCommand("Select")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <CheckCircle />
          </motion.button>
          <motion.button
            onClick={() => sendCommand("Right")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <IoArrowForward />
          </motion.button>
        </div>

        {/* Seventh Row */}
        <div className="flex space-x-4">
          <div className="w-12 h-12"></div>
          <motion.button
            onClick={() => sendCommand("Down")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <IoArrowDown />
          </motion.button>
          <div className="w-12 h-12"></div>
        </div>

        {/* Eighth Row */}
        <div className="flex space-x-4">
          <motion.button
            onClick={() => sendCommand("Rev")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <RewindIcon />
          </motion.button>
          <motion.button
            onClick={() => sendCommand("Play")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <FaPlay />
          </motion.button>
          <motion.button
            onClick={() => sendCommand("Fwd")}
            className="w-12 h-12 rounded-full bg-primary flex items-center justify-center"
            variants={buttonVariants}
            initial="initial"
            whileTap="animate"
          >
            <FastForwardIcon />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}
