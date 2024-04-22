import { AdmissionService } from '@/components/AdmissionsService/AdmissionsService';


export default function AdmissionServicePage({ params }: { params: { id: number } }) {
    return (
        <AdmissionService id={params.id} />
    )
}