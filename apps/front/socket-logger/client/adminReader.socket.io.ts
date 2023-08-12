// import { Client, IAutorestartBehavior, IInfo } from "./utils";
// import { ChildProcessWithoutNullStreams } from "child_process";

// const { program, InvalidArgumentError, Option } = require("commander");
// const io = require("socket.io-client");
// const clc = require("cli-color");

// function myParseInt(value, dummyPrevious) {
//     // parseInt takes a string and a radix
//     const parsedValue = parseInt(value, 10);
//     if (isNaN(parsedValue)) {
//         throw new InvalidArgumentError("Not a number.");
//     }
//     return parsedValue;
// }

// program
//     .option("--port <integer>", "port number of the server", myParseInt, 1338)
//     .option("-s, --space <char>", "space of the process to read", "default")
//     .addOption(new Option("-ls, --list-space", "list all ids", false).conflicts("space"));

// program.parse();

// const options: {
//     port: number;
//     space: string;
//     listSpace: boolean;
// } = program.opts();

// console.log(options);

// throw new Error("TODO: change the argv and the options to use the new protocol, and redo all the code for the admin client");

// class ReaderClient extends Client {
//     constructor(info: IInfo) {
//         super(info);

//         this.onConnect(async () => {
//             console.log(clc.green("Connected to server, waiting for metadata..."));
//             this.emit("request", {
//                 type: "reader",
//                 space: options.space
//             });
//             const [data] = await this.awaitFor("connection");
//             if (data.status === "KO") {
//                 console.log("\n\nError: " + data.message);
//                 process.exit(1);
//             }
//             if (data.isCluster) {
//                 console.log(clc.yellow("Cluster detected, waiting for connection..."));
//                 return false;
//             }
//             console.log(clc.green("Connection established"));
//             this.emit("subscribe", {
//                 type: "reader",
//                 space: options.space
//             });
//             this.on("data", (data) => {
//                 console.log(data);
//             });
//             return true;
//         });
//         this.onDisconnect(() => {
//             console.log(clc.red("Disconnected from server"));
//         });
//     }
// }

// const host: string = "localhost";

// new ReaderClient({ port: options.port, host, protocol: "http", path: "" });
