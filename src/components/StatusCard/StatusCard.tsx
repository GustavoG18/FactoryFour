import CheckIcon from "../../shared/assets/check-icon.svg"
import ErrorIcon from "../../shared/assets/error-icon.svg"

import { useQuery } from 'react-query';

import { ErrorFetch, ResponseFetch, StatusCardProps } from "../../shared/interfaces/status-card.interface";
import { useEffect } from "react";

import "./StatusCard.css"

export const StatusCard = ({ apiName, actionRefecth }:StatusCardProps) => {
    const { data, error, isLoading, refetch } = useQuery<ResponseFetch, ErrorFetch>(['data', apiName], () => {
        return fetch(`${process.env.REACT_APP_API_URL}${apiName}/health/status`).then((res):Promise<ResponseFetch> => {
          return res.json();
        })
      },{
        refetchOnWindowFocus: false, 
        retry: 0
      }
    )

    useEffect(() => {
      if (actionRefecth) {
        refetch();
      }
    }, [actionRefecth, refetch])

    return (
      <div className={
          `flex 
          justify-center
          items-center
          flex-col
          bg-white 
          shadow
          rounded-lg
          gap-4
          p-4
          ${isLoading? "animate-pulse":""}
      `}>
          <p className="text-xl capitalize">{apiName}</p>
          {
            isLoading? 
              <div 
                className="bg-slate-700 rounded-full loading-img">
              </div>:
              <img 
                width={80}
                src={error?.message ? ErrorIcon:CheckIcon}
                alt={`status-${data?.time}`}
              />
          }
          {
            isLoading?
              <span className="
                inline-flex 
                items-center 
                rounded-full 
                px-2 
                py-1 
                text-xs 
                font-medium 
                ring-1 
                ring-inset
                bg-gray-100"
              >
                Loading...
              </span>:
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
                ${error?.message ? 'bg-red-50 text-red-700 ring-red-600/20':'bg-green-50 text-green-700 ring-green-600/20'}`
              }>
                {error?.message ? "Error": data?.message.split(":")[0]}
              </span>
          }
          {
            isLoading? 
              <div className="rounded-full bg-slate-500 loading-div"></div>
              :
              <p className="text-base text-ellipsis overflow-hidden ">{error?.message ? "Outage": data?.hostname}</p>
          }
          {
            isLoading? 
              <div className="rounded-full bg-slate-500 loading-div"></div>
              :
              <p className="text-base text-ellipsis overflow-hidden ">{error?.message ? "403 Forbidden": data?.time}</p>
          }
      </div>
    )
}