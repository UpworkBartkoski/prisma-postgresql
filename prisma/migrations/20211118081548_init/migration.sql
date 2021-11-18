/*
  Warnings:

  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_customerId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "employeeId" INTEGER NOT NULL,
ADD COLUMN     "transactionAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Transaction";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
