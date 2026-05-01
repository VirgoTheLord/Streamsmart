import { config } from "./config";
import { connectDB } from "./db";
import app from "./app";

async function main(): Promise<void> {
  await connectDB();

  const server = app.listen(config.port, () => {
    console.log(
      `[server] Running in ${config.env} mode on port ${config.port}`
    );
  });

  // Graceful shutdown
  const shutdown = (signal: string) => {
    console.log(`[server] ${signal} received — shutting down`);
    server.close(() => {
      console.log("[server] HTTP server closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

main().catch((err) => {
  console.error("[startup] Fatal error:", err);
  process.exit(1);
});
