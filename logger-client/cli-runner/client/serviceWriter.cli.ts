import { program, InvalidOptionArgumentError } from "commander";
import { createServiceWriter } from "../../client/index";

function myParseInt(value: any, dummyPrevious: any): number {
    // parseInt takes a string and a radix
    const parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) {
        throw new InvalidOptionArgumentError("Not a number.");
    }
    return parsedValue;
}

program
    .requiredOption("--port <integer>", "port number of the server", myParseInt)
    .option("--host <string>", "host of the server", "localhost")
    .option("--protocol <string>", "protocol of the server", "http")
    .option("--path <string>", "path of the server", "/")
    .option("-s, --space <char>", "space of the process to write", "default")
    .requiredOption("-cmd, --command <char>", "command to execute")
    .option("-ka, --keep-alive", "keep the process alive", true)
    .option("-to, --timeout", "initial-timeout", myParseInt, 1000);

program.parse();

const options: {
    port: number;
    host: string;
    protocol: string;
    path: string;
    space: string;
    command: string;
    keepAlive: boolean;
    timeout: number;
} = program.opts() as any

console.log(options);

const { subProcess } = createServiceWriter(
    { port: options.port, space: options.space, host: options.host, protocol: options.protocol, path: options.path, keepAlive: true, timeout: 1000 },
    {
        // sendRequestPayloadOnServerConnect: (payload) => {
        //     payload.token =
        //         "BEARER eyJhbGciOiJSUzI1NiJ9.eyJkYXRhIjp7InVzZXJJZCI6MiwidXNlciI6eyJlbWFpbCI6InNzc2ViaWxsZW1hdGhpc0BnbWFpbC5jb20ifX0sImlhdCI6MTY5MDQwODIzMywiZXhwIjoxNjkwNDA4ODMzfQ.Sqq_4kJGll9kVYZvyWIpux6LC9LEiqjh2HFI333iBztyWCpLpwT64lBe2Tzg1ZK7LXKvmQfubLcYP3XuH5CRNHJ34pymk6skEPo43q2T84FuH6YhjFjzBxprCoSi2KD2bMxOuI0TcHMYmV50vcvqr7izyys2_fjFgWilhPE1Da8MLgA9b2WRO5RJEWgK3yatWFGCZW84ZN2d2DaB7TwvI_FHZzYp9QvCS9A6rNMF80_8Ku4dvXIvZbHygiIfT9exmX-5nBCeSX2PCYN1SY2Txiy4GmjD1kDuje49ZdVwUSA7iXUgCL_dwPmsT5nXkQ-V8h4SwukFh2mdT_ykGmVMMnBOGsm315ZrIODd03i6goMqJxPat4l7Q-SpU2CszliodHPnylyZL0BWE9zTIVoyadqfh4DrqX6dHgjxe8wuyqQohRzREBCcdOdOrumyh8-yA8942H8DYP66H5h38TvWqXCWm_O0-SAdxm8llv7PO_UpCJVWNtJ15X8foFYIwew4CDYHcjo2pAI-2h6vz8DQKlH16pidZj_Ri-4pvXI4Ge5BwJOkSIcwkd-Fs-ZkmEjBYPQCcd8vOhC-uj0_-BeFlhAZ7Fd_hVsl2TWyFwuPFNjVLyt3rqfJre7tgnHHFM6WiCR1PMS-0irC17c47_jv-84CVK-oIThGFQ7qzIzpuVY";
        //     return payload;
        // }
    },
    { command: options.command }
);

subProcess.stdout.on('data', function(data){
    process.stdout.write(data.toString())
})

// TODO: implement the keep alive
// TODO: implement the timeout
