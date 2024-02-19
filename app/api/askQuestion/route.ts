import { adminDB } from "@/firebaseAdmin";
import { query } from "@/lib/queryApi";
import { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

type Data = {
  answer: string;
};

const handler = async (req: NextRequest, res: NextResponse) => {
  const { prompt, chatId, model, session } = await req.json();

  if (!prompt) {
    return new Response(
      JSON.stringify({ answer: "Please provide a prompt!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (!chatId) {
    return new Response(
      JSON.stringify({ answer: "Please provide a chat ID!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // ChatGPT query

  const response = await query(prompt, chatId, model);

  console.log(`res`, response)

  const message: Message = {
    text: response || "Chat GPT could not fulfill your request",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "Pavs GPT",
      name: "Pavs GPT",
      avatar: "http://links.papareact.com/89k",
    },
  };

  await adminDB
    .collection("users")
    .doc(session?.user?.email!)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  return new Response(JSON.stringify({ answer: message.text }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

export { handler as GET, handler as POST };
