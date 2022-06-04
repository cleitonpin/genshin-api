import mongoose from 'mongoose'

mongoose.connect('').then(() => {
  console.log('MongoDB connected')
}).catch(err => {
  console.log(err)
})