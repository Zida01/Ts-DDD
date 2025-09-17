import app from "./app";
import { connectDB, disconnectDB } from "./shared/config/db";
import { ENV } from "./shared/config/env"

const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(ENV.PORT, () => {
      console.log(`🚀 Server running in ${ENV.NODE_ENV} on port ${ENV.PORT}`);
    });

    // Graceful shutdown
    const shutdown = async (signal: string) => {
      console.log(`\n🛑 ${signal} received. Shutting down gracefully...`);

      server.close(async () => {
        console.log("💤 HTTP server closed.");
        await disconnectDB();
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
// 