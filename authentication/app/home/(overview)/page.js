'use client'
import { checkUserStatus, getAllPosts } from "@/actions"
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import PostCard from "@/app/ui/postCard";

export default function Home(){

    const router = useRouter();

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        const checkStatus = async ()=>{
            const userStatus = await checkUserStatus();
            if (!userStatus) router.push("/Login");

            return;
        }
        checkStatus();
        
        const getPostAction = async () => {
            const fetchedPosts = await getAllPosts();
            if (!fetchedPosts) {
                alert("unalbe to get posts")
            }
            setPosts(fetchedPosts)
        }
        getPostAction();
    },[])

    console.log(posts)


    const content = "somfdfj asdjfj kdsfk dsfj sklfj kjdfjf sjfdsaf fnknf ififu mf wefh fiuyfdjf fnd fhisafj fnsdfsjadfi nsdnfn idfiuiuu nfhfhj   fdui klfjudhfkpk  if shfyg  fdji ugf7d fdjfih"
    const content1 = "somfdfj asdjfj "
    return (
        <div className="text-white max-h-screen overflow-auto">
            <div className="h-full overflow-auto">
                { posts &&
                    posts.map((post)=>{
                        return <PostCard 
                                content={post.content} 
                                likes={post.likesCount} 
                                replies={post.repliesCount}
                                username={post.user.username}
                                isLiked={post.isLiked}
                                id={post._id}
                                key={post._id}
                            />
                        }
                    )
                }
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content}/>
                <PostCard content={content1}/>
                <PostCard content={content1}/>
                <PostCard content={content1}/>
                <PostCard content={content1}/>
            </div>
        </div>
    )
}