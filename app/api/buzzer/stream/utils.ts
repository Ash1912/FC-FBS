import type { Client, BroadcastMessage } from "./types";

export let clients: Client[] = [];
let _clientId = 0;

export function getNextClientId() {
  return _clientId++;
}


export function broadcast(data: BroadcastMessage) {
  const message = `data: ${JSON.stringify(data)}\n\n`;

  clients
    .filter((c) => !data.sessionId || c.sessionId === data.sessionId)
    .forEach((c) => {
      try {
        c.controller.enqueue(message);
      } catch (err) {
        console.error("Remove the client:", err);
        clients = clients.filter((cc) => cc.id !== c.id);
      }
    });
}
