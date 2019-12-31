import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Subject } from "rxjs";

@Injectable()
export class AzSignalRService {

    private readonly _http: HttpClient;
    private readonly _baseUrl: string = "https://localhost:44362/CentralMessagingHub";
    private hubConnection: HubConnection;
    messages: Subject<string> = new Subject();
    colors: Array<Subject<string>> = [];
    numberOfBlocks = 100;

    constructor(http: HttpClient) {
        this._http = http;
    }
    init() {
        for (var idx = 0; idx < this.numberOfBlocks; idx += 1) {
            this.colors.push(new Subject());
        }

        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(this._baseUrl)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.hubConnection.start().catch(err => console.error(err.toString()));

        this.hubConnection.on('ReceiveMessage', (message: string) => {
            this.messages.next(message);
            console.log('Received a message, ' + message);
        });

        this.hubConnection.on('FruitUpdated', (fruit: any) => {
            console.log('Received an event, ' + fruit.FruitName);
        });

        for (var idx = 0; idx < this.numberOfBlocks; idx += 1) {
            this.hubConnection.on('Block' + idx + 'ColorChanged', (blockIndex: number, colorCode: string) => {
                //console.log('Received an event, ' + colorCode);
                this.colors[blockIndex].next(blockIndex + ',' + colorCode);
            });
        }
    }

    send(message: string): void {
        this.hubConnection.send("SendMessage", "Client", message);
    }
}