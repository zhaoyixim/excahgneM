import { MailerModule } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import path from 'path';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.exmail.qq.com', //邮箱服务器地址
                port: 465, //服务器端口 默认 465
                auth: {
                    user: 'teleon.me',//你的邮箱地址
                    pass: 'GqAyKk29QV4DQ9q'
                }
            },
            preview: true,//是否开启预览，开启了这个属性，在调试模式下会自动打开一个网页，预览邮件
            defaults: {
                from: '测试邮件 <user@email.com>' //发送人 你的邮箱地址
            },
            template: {
                dir: path.join(process.cwd(), './src/email/template'),//这里就是你的ejs模板文件夹路径
                adapter: new EjsAdapter(),
                options: {
                    strict: true //严格模式
                }
            }
        })
    ],
    providers: [EmailService],
    controllers: [EmailController],
    exports: [EmailService]
})
export class EmailModule {}