import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HtmlService } from '../../../services/html/html.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEllipsis, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../services/common/common.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface ChatMsg {
    type: 'sent' | 'received';
    msg: String;
}

@Component({
    selector: 'app-chat',
    standalone: true,
    imports: [FontAwesomeModule, CommonModule, HttpClientModule],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss',
})
export class ChatComponent implements AfterViewInit {
    @ViewChild('msgInput') msgInput!: ElementRef<HTMLInputElement>;

    chat: Array<{
        type: 'sent' | 'received';
        msg: String;
    }> = [];

    faEllipsis = faEllipsis;
    faPaperPlane = faPaperPlane;

    constructor(private htmlService: HtmlService, public commonService: CommonService, private http: HttpClient) {}

    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
    }

    sendMsg(_msg: any): void {
        if (_msg == '') {
            return;
        }
        this.chat.push({ type: 'sent', msg: _msg });
        this.msgInput.nativeElement.value = '';
        this.msgInput.nativeElement.disabled = true;
        this.http
            .post('http://127.0.0.1:5000/api/chat-message', {
                msg: _msg,
            })
            .subscribe((e: any) => {
                this.chat.push({ type: 'received', msg: e['response'] });
                this.msgInput.nativeElement.disabled = false;
                this.msgInput.nativeElement.focus();
            });
    }
}
