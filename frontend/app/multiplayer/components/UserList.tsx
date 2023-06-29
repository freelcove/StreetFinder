"use client";
import React, { useContext } from 'react';
import { MultiplayerGameContext } from '../context/MultiplayerGameContext';
import { useSession } from 'next-auth/react';

const UserList = () => {
    const { data: session } = useSession();
    const { users, userScores } = useContext(MultiplayerGameContext);

    // Order users by score
    const orderedUsers = [...users].sort((a, b) => userScores[b.id] - userScores[a.id]);
    return (
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-y-auto max-h-[80vh] md:max-w-2xl">
            <div>
                <div className="p-6">
                    <div className="tracking-wide text-sm font-semibold mb-2">User List</div>
                    {orderedUsers.map(user => (
                        <div key={user.id} className={`block mt-1 text-lg leading-tight font-medium text-black hover:underline ${user.id === session!.user.id ? 'bg-blue-200' : ''}`}>
                            {user.name}: {userScores[user.id] || 0}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserList;
