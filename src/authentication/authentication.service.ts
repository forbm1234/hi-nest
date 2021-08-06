import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class AuthenticationService {

    // supersms 에 토큰 요청
    async getToken(): Promise<any> {
        const headers = {
            'Accept': 'application/json',
            'X-IB-Client-Id': 'pelegreen_rest',
            'X-IB-Client-Passwd': 'XCNPP9B93371O92311HJ',
        };

        return await axios.post('https://auth.supersms.co:7000/auth/v3/token', {}, {
            headers,
        }).catch(function (error) {
            if (error.response) {
                // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
    }

    //인증번호 랜덤 생성
    async generateRandom(min, max) {
        return await Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // API 인증문자 전송.
    async sendSmsMessage(schema, accessToken, verificationNumber, phoneNumber) {
        let Authorization = schema + ' ' + accessToken;
        const headers = {
            'Authorization': Authorization,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };
        // console.log('headers', headers);
        return await axios.post('https://sms.supersms.co:7020/sms/v3/multiple-destinations',
            {
                'title': '인증번호 발신',
                'from': '16447338',
                'text': `인증번호는 ${verificationNumber} 입니다.`,
                'fileKey': '',
                'destinations': [
                    {
                        'to': `${phoneNumber}`,
                        'replaceWord1': '',
                        'replaceWord2': '',
                        'replaceWord3': '',
                        'replaceWord4': '',
                        'replaceWord5': '',
                    },
                ],
                'ref': 'ref1',
                'ttl': '100',
                'paymentCode': '1',
                'clientSubId': '1',
            },
            {
                headers,
            }).catch(function (error) {
                if (error.response) {
                    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    return error.response;
                }
            });
    }

    async verificationCode(phoneNumber: string) {

        phoneNumber = phoneNumber.substr(1);
        phoneNumber = '+82' + phoneNumber;
        //console.log(phoneNumber);
        try {
            let token: { data: any } = await this.getToken();
            let verificationCode = await this.generateRandom(10000, 100000);
            await this.sendSmsMessage(token.data.schema, token.data.accessToken, verificationCode, phoneNumber);
            let a = null;
            //   if (request.data.destinations[0].status === 'R000') {
            //     res.json({
            //       err: false,
            //       data: verificationCode,
            //     });
            //   } else {
            //     throw new NotFoundException(`supersms ErrorCode: ${request.data.destinations[0].status}`);
            //   }
        } catch (e) {
            throw new NotFoundException(`Error msg: ${e.message}`);
        }
    }
}
