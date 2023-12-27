"use client";

import { useSession } from "next-auth/react";
import { UserCreation } from "@components";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserCreations = () => {
    const { data: session } = useSession();
    const [userPosts, setUserPosts] = useState([]);
    const searchParams = useSearchParams();
    const emailUser = searchParams.get('email');
    const nameUser = searchParams.get('name');

    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();
        let tab = [];

        for (const item of data) {
            if (item.creator.email === emailUser && item.creator.username === nameUser) {
                tab.push(item);
            }
        }

        setUserPosts(tab);
        return tab;
    }

    useEffect(() => {
        fetchPosts();
    }, []);
    

    return (
        <UserCreation
            session={session}
            name={nameUser}
            desc="Find and appreciate all the creations from the user"
            data={userPosts}
        />
    )
}

export default UserCreations