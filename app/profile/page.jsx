"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Profile } from "@components";

const MyProfile = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const { data: session } = useSession();

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");

        if(hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                /* `const filteredPosts = posts.filter((p) => p._id !== post._id);` is filtering the
                `posts` array to remove the post with the same `_id` as the `post` parameter. It
                creates a new array `filteredPosts` that contains all the posts except the one that
                matches the `_id` of the `post` parameter. */
                const filteredPosts = posts.filter((p) => p._id !== post._id);

                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    }

    useEffect(() => {
        if(!session) {
            router.push('/');
            return;
        }

        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
    
            setPosts(data);
        }
    
        if(session?.user.id) {
            fetchPosts();
        }
    }, []);

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={posts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile