import { Sequelize, DataTypes } from "sequelize";

const POSTGRES_URL = process.env.DATABASE_URL as unknown as string;

// Configure Sequelize with explicit dialect for Vercel deployment
const sequelize = new Sequelize(POSTGRES_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: process.env.NODE_ENV === "production" ? {
      require: true,
      rejectUnauthorized: false
    } : false
  },
  logging: false
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("Connection Successful");
    } catch (error) {
        console.error("Unable to connect to database: ", error);
    }
}

export { connectDB, sequelize, Sequelize, DataTypes };