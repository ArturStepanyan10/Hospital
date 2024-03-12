import { DoctRout } from '@/components/DoctRout/DoctRout';
import { useRouter, NextRouter } from 'next/router';


export default function DoctorsPage({ params }: { params: { specialName: string } }) {
    return (
        <div>
            <DoctRout specialName={params.specialName} id={0} />
        </div>
    )
}