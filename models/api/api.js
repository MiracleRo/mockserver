import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const apiSchema = new Schema({
	url: String,
	method: String,
	id: Number,
	description: String,
	rules: {}
})

apiSchema.index({id: 1});

const Api = mongoose.model('Api', apiSchema);


export default Api