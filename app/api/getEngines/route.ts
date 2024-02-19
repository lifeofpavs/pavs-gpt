import openai from "@/lib/chatgpt";
import { NextRequest } from "next/server";

type Option = {
  value: string;
  label: string;
};

type Data = {
  modelOptions: Option[];
};

const handler = async (req: NextRequest) => {
  const models = await openai.models.list().then((res) => res.data);

  const modelOptions = models.map((model) => ({
    value: model.id,
    label: model.id,
  }));

  return new Response(JSON.stringify(modelOptions), {
    status: 200,
  });
};

export { handler as GET };
