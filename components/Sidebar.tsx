"use client";

import { signOut, useSession } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";
import ModelSelection from "./ModelSelection";

function Sidebar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session && query(collection(db, "users", session.user?.email!, "chats"), orderBy('createdAt', 'asc'))
  );

  return (
    <div className=" p-2 flex flex-col  min-h-screen">
      <div className="flex-1">
        <div>
          {/*New chat*/}
          <NewChat />
          <div className="hidden sm:inline">
            <ModelSelection />
          </div>
        </div>
        <div className="py-3 space-y-2">
          {loading && (
            <div className="animate-pulse text-white text-center">
              <p>Loading chats ...</p>
            </div>
          )}
          {chats?.docs.map((chat) => {
            return <ChatRow key={chat.id} id={chat.id} />;
          })}
        </div>
      </div>
      {session && (
        <div className="flex-row flex space-x-3 items-center">
          <img
            src={session?.user?.image!}
            alt="Profile picture"
            className="h-10 w-10 rounded-full cursor-pointer mb-2 hover:opacity-50"
            onClick={() => signOut()}
          />
          <p className="text-white text-sm font-bold">{session?.user?.name}</p>
        </div>
      )}
    </div>
  );
}

export default Sidebar;
