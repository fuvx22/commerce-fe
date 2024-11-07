type Props = {
  message: string | null;
};

const Message = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-full text-center"
      role="alert"
    >
      <span className="block font-bold sm:inline">{message}</span>
    </div>
  );
};

export default Message;
