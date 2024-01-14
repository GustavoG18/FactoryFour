interface StatusBarProps {
    progress: number;
    total: number;
}

export const StatusBar = ({progress, total}: StatusBarProps) => {
    const PROGRESS_MULTIPLY = 100 / total;

    return (
        <div className="
            w-full
            bg-green-200
            relative
            mb-4
        ">
            <p className="text-xl text-white absolute start-4 inset-y-3">Dashboard Status</p>
            <div
                className="
                bg-green-600  
                leading-none
                p-6
                "
                style={{ width: `${progress * PROGRESS_MULTIPLY}%` }}
            ></div>
        </div>
    )
}