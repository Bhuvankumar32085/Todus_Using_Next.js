"use client";

const Error = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="mb-4 text-red-500">{error.message}</p>
    </div>
  );
};

export default Error;
