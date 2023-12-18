import { connect_to_db } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, { params }) => {
    try {
        await connect_to_db();

        /* The line `const prompts = await Prompt.find({ creator: params.id }).populate('creator');` is
        querying the database to find all prompts where the `creator` field matches the value of
        `params.id`. It then populates the `creator` field with the corresponding user object. This
        means that instead of just having the `creator` field as an ID, it will contain the full
        user object with all its properties. */
        const prompts = await Prompt.find({ creator: params.id }).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}