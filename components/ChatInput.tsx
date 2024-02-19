'use client'

import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useState } from "react";
import toast, { useToaster } from "react-hot-toast";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [textInput, setTextInput] = useState( "");

  const {data: model} = useSWR('model', {
    fallbackData: "gpt-3.5-turbo"
  })


  const {
    data: session
  } = useSession();

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(!textInput) return;

    const input = textInput.trim();
    setTextInput("")

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || `https://ui-avatars.com/api?name=${session?.user?.email}`
      }
    }

    await addDoc(collection(db,'users', session?.user?.email!, 'chats', chatId, 'messages'), message)

    const notification = toast.loading('Chat GPT is thinking ...')

    const r = await fetch('/api/askQuestion', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: input, chatId, model, session
      })
    }). then((response) => {
      // Toast notifiation to say successful
      toast.success('Chat GPT has responded', {
        id: notification
      })

      return response.json()
    })

    console.log(`r`, r)
  }

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInput(e?.target?.value);
  };

  return (
    <div className="w-full items-center flex flex-col space-y-3 pb-2 bg-transparent">
      <div className="w-full pt-2 md:pt-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:w-[calc(100%-.5rem)]">
        <form
          className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl"
          onSubmit={sendMessage}
        >
          <div className="overflow-hidden [&:has(textarea:focus)]:border-token-border-xheavy [&:has(textarea:focus)]:shadow-[0_2px_6px_rgba(0,0,0,.05)] flex flex-row py-2 px-6 w-full dark:border-token-border-heavy flex-grow relative border border-token-border-heavy dark:text-white rounded-2xl bg-token-main-surface-primary">
            <input
              type="text"
              className="text-gray-400 text-sm focus:outline-none focus:ring-0 bg-transparent flex-1 focus-visible:ring-0 disabled:cursor-not-allowed disabled:text-gray-300"
              value={textInput}
              onChange={onChangeText}
              placeholder="Type your message here..."
              disabled={!session}
            />
            <button
              type="submit"
              disabled={!session || !textInput}
              className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              <PaperAirplaneIcon className="w-4 h-4 -rotate-45 " />
            </button>
          </div>
        </form>
        <div className="md:hidden py-4"><ModelSelection /></div>
      </div>
      <p className="text-xs text-[#424242]">
        ChatGPT can make mistakes. Consider checking important information.
      </p>
    </div>
  );
}

export default ChatInput;
