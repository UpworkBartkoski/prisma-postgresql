import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // query to count the number of transactions at one particular store.
  const transactionCount = await prisma.product.count({
    select: { transactionAt: true },
  });

  console.log("Transaction count", transactionCount);

  // Make a query that gets the total revenue generated by employees sorted by revenue descending
  const revenue = await prisma.product.groupBy({
    by: ["employeeId"],
    _sum: {
      price: true,
    },
    orderBy: {
      _sum: {
        price: "desc",
      },
    },
  });

  // console.dir(revenue, { depth: null });

  // query that returns only the customers who have made at least 5 transactions.
  const groupCustomer = await prisma.customer.findMany({
    include: {
      _count: {
        select: {
          product: true,
        },
      },
    },
  });

  const filterBytxnCount = groupCustomer.filter(
    (c: any) => c._count.product >= 5
  );

  // console.dir(filterBytxnCount, { depth: null });

  //a query that returns the average number of transactions made per day of the week (Mon, Tues, Wed, etc)
  const transactionCountPerDay = await prisma.product.groupBy({
    by: ["transactionAt"],
    where: {
      transactionAt: {
        gte: new Date("2021-11-18"),
        lt: new Date("2021-11-19"),
      },
    },
  });

  console.log(transactionCountPerDay);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
