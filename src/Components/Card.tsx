interface CardProps {
  title: string;
  value: string;
}

export const Card = ({ title, value }: CardProps) => {
  return (
    <div className="transform transition duration-500 ease-in-out hover:scale-105 rounded-lg bg-white shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-2 text-gray-700">{title}</h2>
      <p className="text-xl text-gray-500">{value}</p>
    </div>
  );
};