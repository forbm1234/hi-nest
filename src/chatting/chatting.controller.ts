import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateChatDto } from 'src/dto/create-chat.dto';
import { ChattingService } from './chatting.service';

@Controller('chatting')
export class ChattingController {

    constructor(private readonly chattingService: ChattingService) {}

    @Get()
    getAll() {
        return this.chattingService.getAll();
    }

    @Get("/:id") 
    getOne(@Param('id') chattingID: number) {
        return this.chattingService.getOne(chattingID);
    }

    @Post()
    create(@Body() chatData : CreateChatDto) {
        return this.chattingService.create(chatData);
    }

    @Delete("/:id") 
    deleteOne(@Param('id') chattingID: number) {
        return this.chattingService.deleteOne(chattingID);
    }

    @Patch()
    update(@Param('id') chattingID: number, @Body() chatData) {
        return this.chattingService.update(chattingID, chatData);
    }
}
