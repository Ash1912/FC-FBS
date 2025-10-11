
export type Client = {
  id: number;
  sessionId?: string;
  controller: ReadableStreamDefaultController<string>;
};

export type BuzzPayload = {
  teamName: string;
  buzzTime: string;
  timeTaken?: number;
};

export type BroadcastMessage =
  | { type: "init"; sessionId?: string; payload: BuzzPayload[] }
  | { type: "buzz"; sessionId?: string; payload: BuzzPayload }
  | { type: "unbuzz"; sessionId?: string; payload: { teamName: string } }
  | { type: "reset"; sessionId?: string; payload?: { clearedCount?: number } };
