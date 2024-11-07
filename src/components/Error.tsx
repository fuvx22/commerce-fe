type Props = {
  message: string | null;
};

const Error = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-ful text-center"
      role="alert"
    >
      <span className="block font-bold sm:inline">{message}</span>
    </div>

  );
};

export default Error;
