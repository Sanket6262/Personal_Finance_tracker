import transactionModel from "../model/transaction.model.js";

const createtransaction = async (req, res) => {
	const { amount, type ,category,date} = req.body;

	try {
		const transaction = new transactionModel({ amount, type ,category,date});
		const createtransaction= await transaction.save();
		if (createtransaction) {
			res.status(201).send(createtransaction);
		}
	} catch (e) {
		res.status(500).send(e);
	}
};
const getAlltransaction = async (req, res) => {
		try {
		  const transaction = await transaction.find({});
		} catch (err) {
		  console.error(err.message);
		  res.status(500).send('Server error');
		}
	  };

const updatetransactionById = async (req, res) => {
	const transactionId = req.params.id;

	const transaction = await transactionModel.findOne({ _id: transactionId });

	if (!transaction) {
		res.status(404).send({ message: "Unknown transactionId" });
	} else {
		transaction.amount = req.body.amount;
		transaction.type = req.body.type;
        transaction.category=req.body.category;
        transaction.date=req.body.date;
		

		const updatetransaction= await transaction.save();

		if (updatetransaction) {
			res.status(200).send(updatetransaction);
            
		}
	}
};
const deletetransactionById = async (req, res) => {
	const  transactionId = req.params.id;
	const  transaction = await  transactionModel.findOneAndDelete({ _id: transactionId });

	if ( transaction) {
        res.status(200).send({message:" transaction is deleted permanently"});
    }else{
		res.status(500).send({ message: "Server error" });
    }
};
const getReport = async (req,res) => {
	const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    try {
        if (!startDate || !endDate) {
            return res
              .status(400)
              .send({ error: "Startdate and Enddate is requires" });
          }
          const start = new Date(startDate);
          const end = new Date(endDate);
          const transaction = await transactionModel.find({
            date: { $gte: start, $lte: end }
          },{type:1,amount:1});
        
          res.status(200).json(transaction);
       

          
    } catch (error) {
        res.status(500).send(error);   
    }
};


export default {createtransaction,getAlltransaction,updatetransactionById,deletetransactionById,getReport};