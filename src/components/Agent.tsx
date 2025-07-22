"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { set } from "zod";
import { Vapi } from "@/lib/vapi.sdk";

enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}

interface SavedMessage{
  role: "user" | "system" | "assistant";
  constent: string;
}

const Agent = ({ userName, userId, type }: AgentProps) => {
  const router = useRouter();
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE)
  const [messages, setMessages] = useState<SavedMessage[]>([])
  const message =[
    'What is your name?',
    'My name i Rishabh nice to meet you'
  ]
  const lastMessage = message[message.length - 1]; 

  useEffect(() => {
   const onCallStart =()=>setCallStatus(CallStatus.ACTIVE);
   const onCallEnd =()=>setCallStatus(CallStatus.FINISHED);

   const onMessage = (message: Message) => {
   if(message.type === 'transcript' && message.transcriptType === 'final'){
     const newMessage = {role: message.role, content: message.transcript}
     setMessages((prev)=>[...prev, newMessage])
   }
  }

  const onSpeechStart = () => setIsSpeaking(true);
  const onSpeechEnd = () => setIsSpeaking(false);

  const onError =(error: Error)=> console.log("Error ", error);

  Vapi.on("call:start", onCallStart);
  Vapi.on("call:end", onCallEnd);
  Vapi.on("message", onMessage);
  Vapi.on("speech:start", onSpeechStart);
  Vapi.on("speech:end", onSpeechEnd);
  Vapi.on("error", onError);

  }, [])
  

  return (
    <>
      <div className="call-view ">
        <div className="card-interviewer">
          <div className="avatar">
            <Image
              src="/ai-avatar.png"
              alt="vapi"
              width={65}
              height={54}
              className="object-cover"
            />
            {isSpeaking && <span className="animate-speak" />}
          </div>
          <h3>Ai Interviewer</h3>
        </div>
        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt="user avatar"
              width={540}
              height={540}
              className="rounded-full object-cover size-[120px]"
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      {message.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p key={lastMessage} className={cn('transition-opacity duration-500 opacity-0','animate-fadeIn opacity-100')} > 
              {lastMessage} 
              </p>
          </div>

        </div>
      )}
      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                (callStatus === "CONNECTING") & "hidden"
              )}
            />
            <span>
              {" "}
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                ? "Call"
                : ". . ."}
            </span>
          </button>
        ) : (
          <button className="btn-disconnect">END</button>
        )}
      </div>
    </>
  );
};

export default Agent;
