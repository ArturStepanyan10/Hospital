import { Admission } from '../../../../components/Admissions/Admissions';


export default function AdmissionPage({ params }: { params: { id: number } }) {
    return (
        <Admission id={params.id} />
    )
}