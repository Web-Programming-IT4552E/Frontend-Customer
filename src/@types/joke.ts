export interface JokeData {
  error: boolean;
  category: string;
  type: string;
  setup: string;
  delivery: string;
  id: string;
  safe: boolean;
  lang: string;
  flags: Flag;
}

interface Flag {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}
