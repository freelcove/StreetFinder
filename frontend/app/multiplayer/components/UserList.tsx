export default function UserList({ users }) {
  return (
    <div>
      <h2>Connected Users:</h2>
      <ul>
        {users.map((user, i) => (
          <li key={i}>{user}</li>
        ))}
      </ul>
    </div>
  );
}
