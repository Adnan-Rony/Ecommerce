import { useMutation, useQuery } from "@tanstack/react-query"
import { AllOrderFetch, myorderFetch, ordercreate } from "./OrderApi.js"


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


export const UseAllOrderFetch=()=>{
    return useQuery({
         queryKey: ['all-orders'], 
        queryFn:AllOrderFetch
    })}