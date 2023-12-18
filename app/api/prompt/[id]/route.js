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

// DELETE (delete)