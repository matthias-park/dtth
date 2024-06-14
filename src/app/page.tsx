import DemonCreateForm from '@/components/demons/demon-create-form'
import DemonList from '@/components/demons/demon-list'
import { fetch72Demons } from '@/db/queries/demons'

interface HomePageProps {
  
}

export default function Home() {

  return <div className="grid grid-cols-4 gap-4 p-4">
    <div className="col-span-3">
      <h1 className="text-xl m-2">Top Demonds</h1>
      <DemonList fetchData={() => fetch72Demons()}/>
    </div>
    <div>
      <DemonCreateForm />
    </div>
  </div>
}
