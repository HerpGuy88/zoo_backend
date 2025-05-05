-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "auth_id" TEXT,
    "username" TEXT NOT NULL,
    "display_name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Behavior" (
    "id" SERIAL NOT NULL,
    "behavior" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Behavior_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Observation" (
    "id" SERIAL NOT NULL,
    "behavior_id" INTEGER NOT NULL,
    "animal_name" TEXT NOT NULL,
    "observer_id" INTEGER NOT NULL,
    "observed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Observation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_auth_id_key" ON "User"("auth_id");

-- CreateIndex
CREATE UNIQUE INDEX "Behavior_id_key" ON "Behavior"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Observation_id_key" ON "Observation"("id");

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_behavior_id_fkey" FOREIGN KEY ("behavior_id") REFERENCES "Behavior"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Observation" ADD CONSTRAINT "Observation_observer_id_fkey" FOREIGN KEY ("observer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
