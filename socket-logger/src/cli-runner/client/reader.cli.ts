import { createReader } from "../../client";
import {program, InvalidOptionArgumentError, Option} from "commander"

function myParseInt(value, dummyPrevious) {
    // parseInt takes a string and a radix
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
        throw new InvalidOptionArgumentError("Not a number.");
    }
    return parsedValue;
}

program
    .requiredOption("--port <integer>", "port number of the server", myParseInt, 1338)
    .option("--host <string>", "host of the server", "localhost")
    .option("--protocol <string>", "protocol of the server", "http")
    .option("--path <string>", "path of the server", "/")
    .option("-s, --space <char>", "space of the process to read", "default")
    .addOption(new Option("-ls, --list-space", "list all ids").conflicts("space").defaultValue(false))
    .option("-ka, --keep-alive", "keep the process alive", true)
    .option("-to, --timeout", "initial-timeout", myParseInt, 1000);

program.parse();

const options: {
    port: number;
    host: string;
    protocol: string;
    path: string;
    space: string;
    listSpace: boolean;
    keepAlive: boolean;
    timeout: number;
} = program.opts() as any;

console.log(options);

const client = createReader({ port: options.port, space: options.space, host: options.host, protocol: options.protocol, path: options.path, keepAlive: true, timeout: 1000 });

client.listenOnServerConnection("data", (data) => {
    process.stdout.write(data.toString())
});

// TODO: implement the list space
// TODO: implement the keep alive
// TODO: implement the timeout
