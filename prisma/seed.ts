import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const employeeData: Prisma.EmployeeCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
  },
  {
    name: "Chris",
    email: "chris@prisma.io",
  },
  {
    name: "John",
    email: "john@prisma.io",
  },
];

const customerData: Prisma.CustomerCreateInput[] = [
  {
    name: "Mike",
    email: "mike@prisma.io",
  },
  {
    name: "Doug",
    email: "doug@prisma.io",
  },
  {
    name: "Elsa",
    email: "elsa@prisma.io",
  },
];

const productData: Prisma.ProductCreateManyInput[] = [
  {
    transactionAt: new Date(),
    name: "Coca-cola",
    type: "drinks",
    price: 1,
    employeeId: 1,
    customerId: 1,
  },
  {
    transactionAt: new Date(),
    name: "Coffee",
    type: "drinks",
    price: 0.25,
    employeeId: 2,
    customerId: 1,
  },
  {
    transactionAt: new Date(),
    name: "Root Beer",
    type: "drinks",
    price: 1,
    employeeId: 1,
    customerId: 1,
  },
  {
    transactionAt: new Date(),
    name: "Diet Coke",
    type: "drinks",
    price: 1,
    employeeId: 3,
    customerId: 1,
  },
  {
    transactionAt: new Date(),
    name: "Sprite",
    type: "drinks",
    price: 1,
    employeeId: 1,
    customerId: 1,
  },
  {
    transactionAt: new Date(),
    name: "Bottle Water",
    type: "drinks",
    price: 1,
    employeeId: 2,
    customerId: 2,
  },
];

async function main() {
  console.log(`Starting seeding...`);

  for (const e of employeeData) {
    const employee = await prisma.employee.create({
      data: e,
    });
    console.log(`Created employee with id: ${employee.id}`);
  }

  for (const c of customerData) {
    const customer = await prisma.customer.create({
      data: c,
    });
    console.log(`Created customer with id: ${customer.id}`);
  }

  for (const p of productData) {
    const product = await prisma.product.create({
      data: p,
    });
    console.log(`Created customer with id: ${product.id}`);
  }
}

main()
  .catch((e) => {
    console.error(e), process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
