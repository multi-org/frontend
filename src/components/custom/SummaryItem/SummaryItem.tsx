export default function SummaryItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col border p-4 rounded-md bg-white">
            <span className="text-gray-600 font-semibold">{label}</span>
            <span className="text-gray-900">{value}</span>
        </div>
    )
}

export { SummaryItem }