import PromptCard from "./PromptCard"

const UserCreation = ({ session, name, desc, data }) => {
    console.log(data);
    return (
        <section className="w-full">
            {session?.user.id ?
                    session?.user.email === data[0]?.creator.email ?
                        <>
                            <h1 className="head_text text-left">My <span className="blue_gradient">Posts</span></h1>
                            <p className="desc text-left">View all your posts</p>
                        </>
                    :
                        <>
                            <h1 className="head_text text-left">Posts from <span className="blue_gradient">{name}</span></h1>
                            <p className="desc text-left">{desc}</p>
                        </>
                :
                <>
                    <h1 className="head_text text-left">Posts from <span className="blue_gradient">{name}</span></h1>
                    <p className="desc text-left">{desc}</p>
                </>
            }

            <div className="mt-10 prompt_layout">
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                />
            ))}
            </div>
        </section>
    )
}

export default UserCreation