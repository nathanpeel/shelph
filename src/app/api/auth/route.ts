import { NextResponse } from "next/server"
import User from "../../../../models/userModel";
import dbConnect from "../../../../lib/dbConnect";
const bcrypt = require('bcrypt');

export async function POST(request: Request) {

  await dbConnect();

  try {
    const { username, password } = await request.json();

    const hashedPassword = await bcrypt.hash(password, 5);
  
    const user = new User({ username, password: hashedPassword });
    await user.save();  
  
    return NextResponse.json({"message": "success"}); 
  } catch (err) {
    return NextResponse.json({"message": "failure"}, {"status": 400})
  }
}

export async function PUT(request: Request) {
  await dbConnect();

  const { username, password } = await request.json()
  
  
  try {
    //find the user in the database
    const data = await User.findOne({ username });

    const passwordIsValid = await bcrypt.compare(password, data.password)

    //redirect here if possible
    if (passwordIsValid) return NextResponse.json({ "message": true })
    return NextResponse.json({ "": false})
  } catch (err) {
    return NextResponse.json({message: `Could not login ${err}`}, {"status": 400})
  }
}
