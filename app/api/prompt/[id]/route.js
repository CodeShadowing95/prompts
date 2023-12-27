import { connect_to_db } from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (req, { params }) => {
    try {
        await connect_to_db();

        /**
         * Retrieves all prompts from the database and populates the "creator" field with the corresponding user object.
         * 
         * @param {object} req - The request object containing information about the incoming request.
         * @returns {Response} - A JSON response containing the retrieved prompts as the response body and a status code of 200 if successful.
         *                       If an error occurs during the execution of the function, a JSON response with an error message and a status code of 500 is returned.
         *
         * @example
         * const response = await GET(request);
         * const data = await response.json();
         * console.log(data); // Output: Array of prompts
         */
        const prompt = await Prompt.findById(params.id).populate('creator');

        if(!prompt) return new Response("Prompt not found", { status: 404 })

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}

// PATCH (update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connect_to_db();

    const existingPrompt = await Prompt.findById(params.id);

    if(!existingPrompt) return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
}

// DELETE (delete)
export const DELETE = async (req, { params }) => {
  try {
    await connect_to_db();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
}