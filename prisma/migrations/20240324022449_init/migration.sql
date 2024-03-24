-- CreateTable
CREATE TABLE "Mood" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "gdb" JSONB NOT NULL,
    "zt_num" INTEGER NOT NULL,
    "zt_fbl" DOUBLE PRECISION NOT NULL,
    "dt_num" INTEGER NOT NULL,
    "dt_fbl" DOUBLE PRECISION NOT NULL,
    "zt_jjl" JSONB NOT NULL,
    "high_100" INTEGER NOT NULL,
    "dm_num" INTEGER NOT NULL,
    "ths_mood" INTEGER NOT NULL,
    "all_vol" INTEGER NOT NULL,
    "zt_vol" INTEGER NOT NULL,
    "zr_jsy" JSONB NOT NULL,
    "bx" JSONB NOT NULL,

    CONSTRAINT "Mood_pkey" PRIMARY KEY ("id")
);
