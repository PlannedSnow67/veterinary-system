import { envs } from './config';
import { Server, Routes } from './presentation';


(async () => {
    await main();
})();


async function main() {
    // creation server
    const server = new Server({
        port: envs.port,
        routes: Routes.routes
    });

    await server.start();
    
}