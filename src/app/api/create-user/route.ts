import { NextResponse } from "next/server"
import UserData from "@/models/userModel";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
  
    const user = new UserData({ username, password });
    const newUser = await user.save();  
  
    return NextResponse.json({"message": "success"}); 
  } catch (err) {
    return NextResponse.json({"message": "failure"}, {"status": 400})
  }
}