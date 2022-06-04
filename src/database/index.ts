import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://admin:Iow8tF6wmhvxT9I1@cluster0.k4x76.mongodb.net/sandney?retryWrites=true&w=majority').then(() => {
  console.log('MongoDB connected')
}).catch(err => {
  console.log(err)
})