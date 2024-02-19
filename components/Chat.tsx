"use client";
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  chatId: string;
};
function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt", "asc")
      )
  );

  return <div className="flex-1 overflow-y-auto overflow-x-hidden">
    {messages?.empty && (
      <div className="mx-auto items-center flex flex-col py-10 space-y-4">
        <p className="text-sm font-bold text-center">Type a prompt in below to get started</p>
        <ArrowDownCircleIcon className="text-white h-8 w-8 animate-bounce ease-in"/>
      </div>
    )}
    {
    messages?.docs.map((message) => (
      <Message key={message.id} message={message.data()} />
    ))
  }</div>;
}

export default Chat;
