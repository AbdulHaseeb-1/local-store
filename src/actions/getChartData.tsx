"use server";
import prisma from "@/lib/prismaClient";

export default async function getChartData(){

    const ordersByMonth = await prisma.orders.groupBy({
        by: ['order_date'],
        _count: {
          _all: true,
        },
        orderBy: {
          order_date: 'asc',  // Sort by month in ascending order
        },
      });
      
      const formattedOrdersByMonth = ordersByMonth.map(order => ({
        x: `${order.order_date.getFullYear()}-${String(order.order_date.getMonth() + 1).padStart(2, '0')}`,
        y: order._count._all,
      }));   

      
    

      return formattedOrdersByMonth;
}