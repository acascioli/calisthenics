import { NextResponse } from "next/server";
import * as xlsx from "xlsx";
import * as fs from "fs";

async function toJSON(body: any) {
  const reader = body.getReader(); // `ReadableStreamDefaultReader`
  const decoder = new TextDecoder();
  const chunks: string[] = [];

  async function read() {
    const { done, value } = await reader.read();

    // all chunks have been read?
    if (done) {
      return JSON.parse(chunks.join(""));
    }

    const chunk = decoder.decode(value, { stream: true });
    chunks.push(chunk);
    return read(); // read the next chunk
  }

  return read();
}

export async function POST(req: Request) {
  try {
    const jsonData = await toJSON(req.body);

    await fs.writeFile(
      "./data/training.json",
      JSON.stringify(jsonData.body),
      (err) => {
        if (err) console.log("Error writing file:", err);
      }
    );
    return new NextResponse("Ok!", { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
