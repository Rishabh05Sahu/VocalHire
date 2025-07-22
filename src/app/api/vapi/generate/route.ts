import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { getRandomInterviewCover } from '@/lib/utils';
import { db } from "@/firebase/admin";
export async function GET() {
  return Response.json({success: true, data:"Thank you"},{status:200});
}

export async function POST(request: Request) {
    const {type, role, level, techstack, amount, userid} = await request.json();

    try {
        const {text: questions} = await generateText({
            model: google('gemeini-2.0-flash-001'),
            prompt: `Prepare questions for job interview.
            The job is ${role}.
            The job experience level is ${level}.
            The techstack used in job is: ${techstack}.
            The focus between behavioral and technical questions should lean towards: ${type}.
            The amount of question required is: ${amount}.
            Please return only questions, without any additional text.
            The questions are going to read by boice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
            Retrun the questions like this:
            ["Question 1", "Question 2", "Question 3"]
            Thank you! <3`
        });
        const interview = {role, type, level,
            techstack: techstack.split(','),
            questions:JSON.parse(questions),
            userid:userid,
            finalized: true,
            coverImgae:getRandomInterviewCover(),
            createdAt: new Date().toISOString()
        }
        await db.collection("interview").add(interview);

        return Response.json({success: true},{status: 200});

    } catch (error) {
        console.log(error);
        return Response.json({success: false, error},{status:500});
    }

}