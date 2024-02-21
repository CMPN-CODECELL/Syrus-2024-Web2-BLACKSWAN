'use client'


export default function MessageUserList({ username, profilePic }) {
    
    return (
        <div className="flex items-center gap-2 text-white text-3xl border-b-[0.5px] pb-2 chat-hover relative cursor-pointer">  
            <div className="w-12 h-12 rounded-2xl bg-slate-600">
                <img
                    src={profilePic}
                    className="rounded-2xl"
                />
            </div>
            <div>
                {username}
            </div>
        </div>
    )
}