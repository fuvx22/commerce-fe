type Props = {
  message: string | null;
};

const Error = ({ message }: Props) => {
  if (!message) return null;

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 py-2 rounded relative w-ful text-center"
      role="alert"
    >
      <span className="block font-semibold sm:inline">{message}</span>
    </div>

  );
};

export default Error;
