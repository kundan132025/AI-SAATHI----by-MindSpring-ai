export default function Button({ text, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold shadow-md transition ${className}`}
    >
      {text}
    </button>
  )
}
