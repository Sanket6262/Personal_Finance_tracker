import mongoose from "mongoose";

const transactionSchema = mongoose.Schema({
	amount: {
		type: "Number",
		require: true,
	},
	type: {
		type: "String",
        enum: ["INCOME","EXPENCE"],
	},
    category:{
        type: "String",
       
    },
   date:{
    type:"date",
   }
});

export default mongoose.model("transaction", transactionSchema);
