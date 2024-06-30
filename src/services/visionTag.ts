import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function VisionTag(imagePath?: string, urlAddress?: string) {
    try {
        let response;
        if (imagePath) {
            //function to encode image and get the base64 string 
            const base64Image = fs.readFileSync(imagePath).toString("base64");

              response = await openai.chat.completions.create({
                model: "gpt-4o",
                messages: [
                  {
                    role: "user",
                    content: [
                      {
                        type: "text",
                        text: `Create tags using lowercase for this image.Please response in array format`,
                      },
                      {
                        type: "image_url",
                        image_url: {
                          url: `data:image/jpeg;base64,${base64Image}`,
                          detail: "low",
                        },
                      },
                    ],
                  },
                ],
                max_tokens: 200,
              });
         

            
        } else {
            response = await openai.chat.completions.create({
              model: "gpt-4o",
              messages: [
                {
                  role: "user",
                  content: [
                    { type: "text", text: "What’s in this image?" },
                    {
                      type: "image_url",
                      image_url: {
                        url: urlAddress,
                      },
                    },
                  ],
                },
              ],
            });
        }
      
      console.log(response.choices[0]);
      return response.choices[0];
    } catch (error) {
        return { error: true, message: "Error during OpenAI vision check" };
 }
}

