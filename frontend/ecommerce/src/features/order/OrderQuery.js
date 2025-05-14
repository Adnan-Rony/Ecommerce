import { useMutation, useQuery } from "@tanstack/react-query"
import { myorderFetch, ordercreate } from "./OrderApi.js"


export const UseMyOrders=()=>{
    return useQuery({
        queryKey:["myorders"],
        queryFn:myorderFetch,
        
    })
}


export const UseMyOrderCreate=()=>{
    return useMutation({
        mutationFn:ordercreate
    })
}