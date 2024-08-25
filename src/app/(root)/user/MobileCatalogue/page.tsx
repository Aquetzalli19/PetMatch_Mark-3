'use client'

import React, { useEffect, useState } from "react";
import PostCardMobile, { PostCardPropsMobile } from "@/Components/PostCardMobile/PostCardMobile";
import { useRouter } from "next/navigation";

export default function MobileCatalogue() {
  const [posts, setPosts] = useState<PostCardPropsMobile[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        console.log(data.data);

        const formattedPosts = data.data.map((post: any, index: number) => ({
          id: post.id, // Asigna el id correcto aquí
          urlImage: post.urlImage,
          avatar: post.avatar,
          fullname: post.fullname,
          username: post.username,
          content: post.content,
          race: post.race,
          size: post.size,
          age: post.age,
          instagram: post.instagram,
          whatsapp: post.whatsapp,
          facebook: post.facebook
        }));

        setPosts(formattedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id: string) => {
    router.push(`/user/MobileCatalogue/${id}`);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <header className="w-full">
        <h1 className="text-center font-bold text-xl">Catalogo</h1>
      </header>
      <div className="grid grid-cols-3 gap-4 mt-4 sm:gap-2">
        {posts.map((post, index) => (
          <PostCardMobile
            key={index}
            id={post.id}
            urlImage={post.urlImage}
            onClick={() => handleCardClick(post.id)} // Maneja el click
          />
        ))}
      </div>
    </div>
  );
}
