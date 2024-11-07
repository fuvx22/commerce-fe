type Props = {
  message: string | null;
};

const Message = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 py-2 rounded relative w-full text-center"
      role="alert"
    >
      <span className="block font-semibold sm:inline">{message}</span>
    </div>
  );
};

export default Message;
