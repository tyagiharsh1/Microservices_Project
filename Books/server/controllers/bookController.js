const bookOutput = require("../bookUtils");
const Book = require("../model/Book");
const cloudinary=require('cloudinary').v2;
//createBook
const createBookController = async (req, res) => {
  try {
    const { title, author, numberOfPages, publisher,bookImg } = req.body; //destruct the data from body
    const cloudImg=await cloudinary.uploader.upload(bookImg,{
      folder:'Books'
    })
    await Book.create({
      title,
      author,
      publisher,
      numberOfPages,
      bookImage:
      {
        url:cloudImg.secure_url,
        publicId:cloudImg.public_id
      }
    });
    return res.send("book created");
  } catch (error) {
    console.log(error);
  }
};
//deleteBook
const deleteBookController = async (req, res) => {
  try {
    const { bookIdToDelete } = req.body;
    //if book not present
    const bookToDelete = await Book.findById(bookIdToDelete);
    if (!bookToDelete) return res.send("Book Not Found");
    await Book.deleteOne({_id:bookIdToDelete });
    return res.send("Book deleted successfully");
  } catch (error) {
    console.log(error);
  }
};
//list Details of Book
const showBookController = async (req, res) => {
  const {bookId}=req.body;
  try {
    const book = await Book.findById(bookId);
    if(!book)return res.status(404).send("book not found");
    return res.status(200).json(book)
  } catch (error) {
     return res.status(500).send(error);
  }
};
//listAllBooks
const listAllBooksController = async (req, res) =>{
  const Books=await Book.find();
  const allBooks=Books.map(book=>bookOutput(book));
  return res.json({allBooks})
}
module.exports = {
  createBookController,
  deleteBookController,
  showBookController,
  listAllBooksController,
};
