import { useEffect, useState } from "react"
import axios from 'axios';
import CheckIcon from "../../assets/check-icon.svg"
import ErrorIcon from "../../assets/error-icon.svg"

interface ResponseFetch {
    success: boolean;
    message: string;
    hostname: string;
    time: number;
}

export const StatusCard = ({ apiName }:{ apiName: string}) => {
    const [status, setStatus] = useState<ResponseFetch | null>(null)

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}${apiName}/health/status`);
            setStatus(response.data);
          } catch (error) {
            console.error(error);
          }
        };
        if (apiName) {
          fetchData();
        }
        const intervalId = setInterval(() => {
          if (apiName) {
            fetchData();
          }
        }, 15000);
        return () => clearInterval(intervalId);
      }, [apiName]);

    return (
        <div className="
            flex 
            justify-center
            items-center
            flex-col
            bg-white 
            shadow
            rounded-lg
            gap-4
            p-4
        ">
            <p className="text-xl capitalize">{apiName}</p>
            <img 
                width={80}
                src={status?.message ? CheckIcon:ErrorIcon}
                alt={`status-${status?.time}`}
            />
            <span className={`
                inline-flex 
                items-center 
                rounded-full 
                px-2 
                py-1 
                text-xs 
                font-medium 
                ring-1 
                ring-inset 
                ${status?.message ? 'bg-green-50 text-green-700 ring-green-600/20': 'bg-red-50 text-red-700 ring-red-600/20'}`
            }>
                {status?.message ? status.message.split(":")[0]: "Error"}
            </span>
            <p className="text-base">{status?.hostname ? status?.hostname: "Outage"}</p>
            <p className="text-base">{status?.time ? status?.time: "403 Forbidden"}</p>
        </div>
    )
}