import mongoose from "mongoose";

export class Database {
  private connected = false;

  constructor() {}

  public async connect(): Promise<void> {
    if (this.connected) return;

    await mongoose.connect(process.env.MONGODB_URI as string);
    this.connected = true;
  }
}
