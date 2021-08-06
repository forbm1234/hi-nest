import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from 'src/dto/create-chat.dto';
import { UpdateChatDto } from 'src/dto/update-chat.dto';
import { Chat } from '../entities/chat.entity';

@Injectable()
export class ChattingService {
    private chat: Chat[] = [];

    getAll(): Chat[] {
        return this.chat;
    }

    getOne(id:number): Chat {
        const chat = this.chat.find(chat => chat.id === id); // parseInt(id), +id : id가 string일떄 number로 파싱 문법 두가지
        if(!chat) {
            throw new NotFoundException(`Chat with ID ${id} not found.`);
        }
        return chat;
    }

    deleteOne(id:number) {
        this.getOne(id);
        this.chat = this.chat.filter(chat => chat.id !== id); // filter 요소 제거
    }

    create(chatData : CreateChatDto) {
        this.chat.push({
            id: this.chat.length +1,
            ...chatData // json output 문법
        });
    }

    update(id:number, updateData : UpdateChatDto) {
        const chat = this.getOne(id);
        this.deleteOne(id);
        this.chat.push({...chat, ...updateData});
    }
}
