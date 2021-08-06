import { Controller, Get, Param } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly authService: AuthenticationService) {}

    @Get()
    getAll() {
        return "api succese";
    }

    @Get("/:phoneNumber")
    verificationCode(@Param('phoneNumber') phoneNumber) {
        return this.authService.verificationCode(phoneNumber);
    }

}
