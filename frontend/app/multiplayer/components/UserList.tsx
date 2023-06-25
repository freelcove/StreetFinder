"use client";
import { useContext } from 'react';
import { MultiplayerGameContext } from '../context/MultiplayerGameContext';

export default function UserList() {
  const { users } = useContext(MultiplayerGameContext);

  return (
    <div className="p-4 bg-white bg-opacity-70 text-sm">
      <h2>Users:</h2>
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
