"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
        />
      ))}
    </div>
  )
}

const Feed = () => {
    const [allPosts, setAllPosts] = useState([]);

    const [searchText, setSearchText] = useState('');
    const [searchTimeout, setSearchTimeout] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch('/api/prompt');
        const data = await response.json();

        setAllPosts(data);
    }

    /**
     * The function `filterPrompts` filters an array of posts based on a search text, matching against
     * the creator's username, tag, or prompt.
     * @returns The function `filterPrompts` returns an array of `allPosts` that match the search
     * criteria specified by the `searchText`.
     */
    const filterPrompts = (searchText) => {
        const regex = new RegExp(searchText, 'i');
        return allPosts.filter((item) =>
            regex.test(item.creator.username) ||
            regex.test(item.tag) ||
            regex.test(item.prompt)
        );
    };

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchResults(searchResult);
            }, 500)
        );
    };

    useEffect(() => {
        fetchPosts();
    }, []);
  

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    name="searchText"
                    id="searchText"
                    placeholder="Search for a tag or a username..."
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>

            <PromptCardList
                data={!searchText ? allPosts : searchResults}
            />
        </section>
    )
}

export default Feed