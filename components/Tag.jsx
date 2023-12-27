"use client";


import PromptCard from "./PromptCard"

const Tag = ({ name, desc, data }) => {
    return (
        <section className="w-full">
            <h1 className="head_text text-left">Search results for <span className="blue_gradient">#{name}</span></h1>
            <p className="desc text-left">{desc}</p>

            <div className="mt-10 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleEdit={() => handleEdit && handleEdit(post)}
                    handleDelete={() => handleDelete && handleDelete(post)}
                />
            ))}
            </div>
        </section>
    )
}

export default Tag