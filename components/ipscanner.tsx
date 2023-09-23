import { useState, useEffect } from "react";
import axios from "axios";
import { FiCheck } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { FaSpinner } from "react-icons/fa";

export function IPScanner() {
    const [ipPartials, setIpPartials] = useState(["192", "168", "1"]);
    const [port, setPort] = useState("8060");
    const [rokuList, setRokuList]: any = useState([]);
    const [currentRoku, setCurrentRoku]: any = useState(null);
    const [scanning, setScanning] = useState(false);
    const [currentIPIndex, setCurrentIPIndex] = useState(0);

    useEffect(() => {
        const ip = localStorage.getItem("ip");
        const port = localStorage.getItem("port");
        if (ip && port) {
            setCurrentRoku({ ip, port });
        }
    }, []);

    const scanNetwork = async () => {
        setScanning(true);
        let foundRokus = [];
        for (let i = 1; i <= 254; i++) {
            setCurrentIPIndex(i);
            const ip = `${ipPartials[0]}.${ipPartials[1]}.${ipPartials[2]}.${i}`;
            try {
                const resp = await axios.get(`http://${ip}:${port}/query/icon/12`, {
                    timeout: 500,
                    headers: {
                        "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                        "accept-language": "en-US,en;q=0.9",
                        "Referrer-Policy": "strict-origin-when-cross-origin"
                    }
                });
                if (resp.headers['server'].includes('Roku')) {
                    foundRokus.push({ ip, port });
                }
            } catch (error: any) {
                console.log(ip + JSON.stringify(error));
                if (error.response && error.response.headers['server'].includes('Roku')) {
                    foundRokus.push({ ip, port });
                }
            }
            setRokuList([...foundRokus]);
        }
        setScanning(false);
    };

    const saveCurrentRoku = (ip: any, port: any) => {
        localStorage.setItem("ip", ip);
        localStorage.setItem("port", port);
        setCurrentRoku({ ip, port });
    };

    return (
        <Card className="border-2 border-primary">
            <CardHeader>
                <CardTitle>Roku Finder</CardTitle>
                <CardDescription>Find and select a Roku device on your network.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 w-full items-center">
                    <Label>IP</Label>
                    <div className="flex space-x-2">
                        {ipPartials.map((partial, index) => (
                            <Input
                                key={index}
                                value={partial}
                                placeholder="0"
                                onChange={(e) => {
                                    let newPartials = [...ipPartials];
                                    newPartials[index] = e.target.value;
                                    setIpPartials(newPartials);
                                }}
                            />
                        ))}
                        <Input
                            key={3}
                            value={"*"}
                            disabled={true}
                        />
                    </div>
                    <Label>Port</Label>
                    <Input value={port} onChange={(e) => setPort(e.target.value)} />
                    <Button className="h-12" onClick={scanNetwork}>
                        {scanning ? <FaSpinner className="animate-spin" /> : "Scan"}
                    </Button>
                    <div className="text-center h-7">{scanning ? `Scanning: ${currentIPIndex}/254` : ""}</div>
                    <div className="h-16 overflow-y-auto">
                        <AnimatePresence>
                            <ul>
                                {rokuList.map((roku: any, index: number) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="flex justify-between items-center transition-transform duration-200"
                                    >
                                        {`${roku.ip}:${roku.port}`}
                                        <FiCheck className="text-green-500 cursor-pointer" onClick={() => saveCurrentRoku(roku.ip, roku.port)} />
                                    </motion.li>
                                ))}
                            </ul>
                        </AnimatePresence>
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <div>Current Roku: {currentRoku ? `${currentRoku.ip}:${currentRoku.port}` : "None"}</div>
            </CardFooter>
        </Card>
    );
}
