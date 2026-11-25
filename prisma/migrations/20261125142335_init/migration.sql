-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "nim" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "semester" INTEGER NOT NULL DEFAULT 1,
    "gpa" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_nim_key" ON "Student"("nim");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");
