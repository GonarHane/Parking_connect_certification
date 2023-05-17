import { ConsoleLogger } from "@nestjs/common";
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Server } from "ws";

import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";

const port = new SerialPort({
  path: "/dev/ttyS4",
  baudRate: 9600,
  dataBits: 8,
  parity: "none",
  stopBits: 1,
 
});

const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
parser.on("data", console.log);
port.write("cool");
parser.write("cool");


@WebSocketGateway({ cors: true })
export class ClimatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  logger = new ConsoleLogger();
  fanOn = "0";
  @WebSocketServer()
  public server: Server;

  public socket: Socket;

  /*   constructor(@InjectModel(Climat.name) private climatModel: Model<Climat>) {} */

  handleConnection(@ConnectedSocket() client: Socket) {
  

    client.on("fanOn", (onData) => {
      port.write(onData);
      this.fanOn = onData;
      
    });
    client.on("fanOff", (offData) => {
      this.fanOn = offData;
    });

    parser.on("data", (data) => {
      port.write(this.fanOn);
     

      port.drain((err) => {
       
      });
      this.logger.log(this.fanOn);
      const climat = {
        
        numero: data.split("/")[2],
        p1disponible: data.split("/")[3],
        p2disponible: data.split("/")[4],
        p3disponible: data.split("/")[5],
        luminosite: data.split("/")[6],
        gaz: data.split("/")[7],
        
      };
     
    });
  }

  handleDisconnect(@ConnectedSocket() client: any) {
    client.leave();
  }
}



/* import { ConsoleLogger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';
import { Climat, ClimatDocument } from './entities/climat.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SerialPort } from 'serialport';
import { ReadlineParser } from '@serialport/parser-readline';
const port = new SerialPort({ path: '/dev/ttyUSB0', baudRate: 9600 });

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' })); */
/* parser.on('data', console.log); */

/* @WebSocketGateway({ cors: true })
export class ClimatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  logger = new ConsoleLogger();
  @WebSocketServer()
  public server: Server;

  public socket: Socket;

  constructor(
    @InjectModel(Climat.name) private climatModel: Model<ClimatDocument>,
  ) {} */

  // handleConnection(){}
  /* handleConnection(@ConnectedSocket() client: Socket) {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const temperature = 30;
    const humidity = 20;
    parser.on('data', (data) => {
      
      const climat = {temperature: data.split('/')[0], humidity: data.split('/')[1]}
      client.emit('connection', climat);
      console.log(climat);
      const fullDate = `${day}/${month}/${year}`;
      console.log(hours, minutes);
      if (hours == 8 && minutes == 0 && seconds == 0) {
        const createdClimat = new this.climatModel({
          '8h': {
            temperature: temperature,
            humidity: humidity,
          },
          '12h': {
            temperature: '--',
            humidity: '--',
          },
          '19h': {
            temperature: '--',
            humidity: '--',
          },
          temperature: temperature,
          humidity: humidity,
          date: fullDate,
          heure: `${hours}:${minutes}:${seconds}`,
          moyenne: { temperature, humidity },
        });
        createdClimat.save();
        client.emit('connection', 'climat 8h enregistré');
      }
      if (hours == 12 && minutes == 0 && seconds == 0) {
        this.climatModel
          .updateOne(
            { date: fullDate },
            { '12h': { temperature: temperature, humidity: humidity } },
          )
          .then((data) => {
            console.log(data);
          });
        client.emit('connection', 'climat 12h enregistré');
      }
      if (hours == 19 && minutes == 0 && seconds == 0) {
        this.climatModel
          .updateOne(
            { date: fullDate },
            { '19h': { temperature: temperature, humidity: humidity } },
          )
          .then((data) => {
            console.log(data);
          });
        client.emit('connection', 'climat 19h enregistré');
      }
    }); */
    /* client.join() */
 // }//

  // handleDisconnect(){}
 /*  handleDisconnect(@ConnectedSocket() client: any) {
    client.leave();
  }
 */
  // startMyTimer(){}

  // stopMyTimer(){}
//}//

