interface DemonShowProps {}

export default function DemonShow({}: DemonShowProps) {
  return (
    <div className="m-4">
      <h1 className="text-2xl font-bold my-2">{demon.title}</h1>
      <p className="p-4 border rounded">{demon.content}</p>
    </div>
  );
}
