import { useEffect, useState } from "react";

export const StatusBar = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if(progress === 100){
                setProgress(0);
            }else {
                setProgress((prev) => prev + 1);
            }
          }, 145);
          return () => clearInterval(intervalId);
    })

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
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    )
}