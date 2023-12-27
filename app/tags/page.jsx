"use client";

import { useSearchParams } from "next/navigation";

import { Tag } from '@components';
import { useEffect, useState } from "react";

const Tags = () => {
    const [posts, setPosts] = useState([]);

    const searchParams = useSearchParams();
    const tagname = searchParams.get('tag');

    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();

        return data;
    }

    const filterPrompts = async (tag) => {
        const datas = await fetchPosts();

        const regex = new RegExp(tag, 'i');

        const d = datas.filter((item) =>
            regex.test(item.tag)
        );

        setPosts(d);
        return d;
    }

    useEffect(() => {
        filterPrompts(tagname);
    }, [])

    return (
        <Tag
            name={tagname}
            desc="Find all posts related to the selected hashtag"
            data={posts}
        />
    )
}

export default Tags