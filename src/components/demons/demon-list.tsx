import type {DemonWithData} from '@/db/queries/demons';
import Link from 'next/link';
import paths from '@/paths';

interface DemonListProps {
  fetchData: () => Promise<DemonWithData[]>
}

// TODO: Get list of posts into this component somehow
export default async function DemonList({fetchData}: DemonListProps) {
  const demons = await fetchData();

  const renderedPosts = demons.map((demon) => {
    const demonUrl = demon.url;

    if (!demonUrl) {
      throw new Error('Need a url to link to a demon');
    }

    return (
      <div key={demon.id} className="border rounded p-2">
        <Link href={paths.demonShow(demonUrl)}>
          <h3 className="text-lg font-bold">{demon.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-400">By {demon.user.name}</p>
            <p className="text-xs text-gray-400">
              {demon._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
