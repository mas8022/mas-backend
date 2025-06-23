-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answerOne" TEXT NOT NULL,
    "answerTwo" TEXT NOT NULL,
    "answerThree" TEXT NOT NULL,
    "answerFour" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "publish" BOOLEAN NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);
