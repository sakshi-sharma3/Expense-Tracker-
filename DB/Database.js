import mongoose from "mongoose";

export const connectDB = async () => {
    const maxRetries = 3;
    let retries = 0;
    let connected = false;

    while (retries < maxRetries && !connected) {
        try {
            const db = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/expense-tracker";
            
            console.log(`Connecting to MongoDB (Attempt ${retries + 1}/${maxRetries})...`);
            
            // Set mongoose options
            mongoose.set('strictQuery', false);
            
            const {connection} = await mongoose.connect(db, { 
                useNewUrlParser: true,
                useUnifiedTopology: true,
                serverSelectionTimeoutMS: 5000, // Timeout after 5s
            });

            connected = true;
            console.log(`MongoDB Connected Successfully to ${connection.host}`);
            
            // Add connection event listeners
            mongoose.connection.on('error', err => {
                console.error('MongoDB connection error:', err);
            });
            
            mongoose.connection.on('disconnected', () => {
                console.warn('MongoDB disconnected. Attempting to reconnect...');
            });
            
            process.on('SIGINT', async () => {
                await mongoose.connection.close();
                console.log('MongoDB connection closed due to app termination');
                process.exit(0);
            });
            
            return connection;
        } catch (error) {
            retries++;
            console.error(`MongoDB Connection Error (${retries}/${maxRetries}):`, error.message);
            
            if (retries >= maxRetries) {
                console.error('Failed to connect to MongoDB after multiple attempts. Exiting...');
                process.exit(1);
            }
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }
}