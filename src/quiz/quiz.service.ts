import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Quiz, QuizChoice } from 'src/typeorm/entities'
import { Repository } from 'typeorm'

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) 
    private readonly quizRepository: Repository<Quiz>,
  ) {}

  async getQuiz() {
    return await this.quizRepository.find({
        relations: ['choices'],
        order: {quizId: 'ASC', choices: {quizChoiceId: 'ASC'}}
    })
  }
}
