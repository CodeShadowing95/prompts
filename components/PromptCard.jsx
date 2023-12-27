"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router  = useRouter();

  const [copied, setCopied] = useState('');

  const editTags = (p) => {
    let tags = p.split(',');
    
    tags = tags.map(tag => tag.trim().startsWith('#') ? tag : '#' + tag);

    return tags;
  }

  const hashtags = editTags(post.tag);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  }

  const searchForTag = (t) => {
    router.push(`/tags?tag=${t}`)
  }

  const viewUser = (userPost) => {
    router.push(`/users?email=${userPost.creator.email}&name=${userPost.creator.username}`)
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={() => viewUser(post)}>
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            <p className="font-inter text-sm text-gray-500">{post.creator.email}</p>
          </div>
        </div>

        <div className="copy_btn" onClick={() => handleCopy()}>
          <Image
            src={copied === post.prompt
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'
            }
            alt={copied === post.prompt
              ? 'tick icon'
              : 'copy icon'
            }
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div className="flex gap-1">
        {hashtags.map((tag) => (
            <p className="font-inter text-sm blue-gradient cursor-pointer hover:underline" onClick={() => searchForTag(tag.substring(1))}>{tag}</p>
        ))}
      </div>

      {/* The code block `{session?.user.id === post.creator.id && pathName === '/profile' && (...)}` is
      checking if the current user's ID matches the ID of the post creator and if the current path is
      '/profile'. If both conditions are true, it will render the content inside the parentheses. */}
      {session?.user.id === post.creator._id &&
      pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEdit}>Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDelete}>Delete</p>
        </div>
      )}
    </div>
  )
};

export default PromptCard