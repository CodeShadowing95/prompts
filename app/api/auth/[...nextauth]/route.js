import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connect_to_db } from "@utils/database";

import User from "@models/user";

// To handle Google authentication
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        // To know which user is currently online
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            })

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            try {
                await connect_to_db();

                // Check if a user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });

                // If not, create a new user
                if(!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    })
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };