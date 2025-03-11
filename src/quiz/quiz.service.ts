import { BadGatewayException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Quiz, QuizChoice } from 'src/typeorm/entities'
import { Repository } from 'typeorm'
import { QuizAnswerDto } from './dto/QuizAnswer.dto'

const skinResult = [
  "Da thường",
  "Da dầu",
  "Da khô",
  "Da nhạy cảmcảm"
]

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>
  ) {}

  async getQuiz() {
    return await this.quizRepository.find({
      relations: ['choices'],
      order: { quizId: 'ASC', choices: { quizChoiceId: 'ASC' } }
    })
  }

  async checkQuiz(userAnswer: QuizAnswerDto[]) {
    const quizList = await this.getQuiz();
  
    const userAnswerList : number[] = quizList.flatMap((quiz) =>
      userAnswer
        .filter((userAn) => userAn.quizId === quiz.quizId)
        .map((userAn) => quiz.choices.findIndex((choice) => choice.quizChoiceId === userAn.quizAnswer))
        .filter((index) => index !== -1) // Remove -1 in case no match is found
    );

    if(userAnswerList.length === 0) throw new BadGatewayException("The quiz is not have an answer")

    const countMap = new Map<number, number>()
    let countMax = 0
    let mostFrequent = userAnswerList[0]

    for(const num of userAnswerList){
      const count = (countMap.get(num) || 0) + 1
      countMap.set(num, count)

      if(count > countMax){
        countMax = count;
        mostFrequent = num
      }
    }

    const result = skinResult.find((skin, index) => index === mostFrequent) 
  
    return result;
  }
}
