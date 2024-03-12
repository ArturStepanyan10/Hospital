import { Doctors } from '@/components';
import { useRouter, NextRouter } from 'next/router';


export default function DoctorsPage({ params }: { params: { specialization: string } }) {
    return (
        <div>
            <Doctors />
        </div>
    )
}