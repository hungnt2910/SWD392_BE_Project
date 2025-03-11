import { Body, Controller, Get, Post } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizAnswerDto } from './dto/QuizAnswer.dto';

@Controller('quiz')
export class QuizController {
    constructor(private readonly quizService: QuizService){}

    @Get()
    getAllQuiz(){
        return this.quizService.getQuiz()
    }

    @Post()
    checkQuizResult(@Body() userAnswer: QuizAnswerDto[]){
        // console.log(userAnswer)
        return this.quizService.checkQuiz(userAnswer)
    }
}
