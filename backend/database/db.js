import { connect } from "mongoose";

const connectToMongo = async () => {
  try {
    await connect(
      "mongodb+srv://rahul123:11223344@firstmerndb.2za3m2k.mongodb.net/Notesmaker"
    );
    console.log("---***Database Connected Successfully***---");
  } catch (error) {
    console.log(error);
  }
};

export default connectToMongo;
