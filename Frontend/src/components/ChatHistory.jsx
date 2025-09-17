export default function ChatHistory({ chats }) {
  if (!chats || !chats.length) return <div>No recent chats.</div>;
  return (
    <ul>
      {chats.map((chat, idx) => (
        <li key={idx}>
          <div>{chat.date}: {chat.summary}</div>
        </li>
      ))}
    </ul>
  );
}