"use client";

import { useUserRole } from "@/hooks/useUserRole";
import { QUICK_ACTIONS } from "@/constants";
import ActionCard from "@/components/ActionCard";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import MeetingModel from "@/components/MeetingModel";

export default function Home() {
  const router = useRouter();
  
  const {isInterviewer,isCandidate,isLoading} = useUserRole();
  const interviews = useQuery(api.interviews.getMyInterviews);


  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();


  const handleQuickAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`/${title.toLowerCase()}`);
    }
  }

  if(isLoading) return <p>Loading...</p>

  return (
   <div className="container max-w-7xl mx-auto p-6">
    {/* Welcome Section */}
    <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
          Welcome back!
        </h1>
        <p className="text-muted-foreground mt-2">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </div>
        {isInterviewer ? (
          <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {QUICK_ACTIONS.map((action)=>(
              <ActionCard
              key={action.title}
              action={action}
              onClick={()=> handleQuickAction(action.title)}
              />
            ))}
          </div>

          <MeetingModel
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={modalType === "join" ? "Join Meeting" : "Start Meeting"}
          isJoinMeeting={modalType === "join"}
          />
          </>
        ) : (
          <div>
            candidates view here
          </div>
        )}     
   </div>
  );
}
  