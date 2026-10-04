"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

const WhatsAppContact = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-fit">
      <div className="relative">
        {/* Button to open chat */}
        {!open && (
          <button
            onClick={() => setOpen(true)}
            className="bg-green-500 overflow-hidden rounded-full p-2 flex items-center transition-all"
          >
            <Image
              unoptimized
              alt="whatsapp"
              src="/whatsapp.svg"
              width={30}
              height={30}
              className="mx-auto min-w-[30px]"
            />
            <span className="text-white text-sm font-medium ml-2">
              Whatsapp
            </span>
          </button>
        )}

        {/* Chat Card */}
        {open && (
          <Card className="max-w-2xs w-2xs border-none pt-0 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom duration-300">
            <CardHeader className="p-4 bg-green-600">
              <div className="flex items-center gap-2 text-white">
                <Image
                  unoptimized
                  src="/logo.png"
                  alt="MakranaPremium"
                  width={40}
                  height={40}
                />
                <div>
                  <CardTitle>Makrana Premium</CardTitle>
                  <CardDescription className="text-white">
                    Replies within 1 day
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Card>
                <CardHeader>
                  <CardTitle>Makrana Premium</CardTitle>
                  <CardDescription>
                    <p>Hi there!</p>
                    <p>How can I help you?</p>
                  </CardDescription>
                </CardHeader>
              </Card>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <Button variant="ghost" size="default" onClick={() => setOpen(false)} className="flex-1/2">
                Close
              </Button>
              <a
                href="https://wa.me/917976973338?text=How can I buy these products?"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-green-500 hover:bg-green-600 flex gap-2">
                  <Image
                    unoptimized
                    alt="whatsapp"
                    src="/whatsapp.svg"
                    width={20}
                    height={20}
                  />
                  Start Chat
                </Button>
              </a>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WhatsAppContact;
