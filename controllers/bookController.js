const Book = require('../models/Book');

const createBook = async (req, res) => {
  try {
    const { bookName, author, price, available } = req.body;

    // Validation
    if (!bookName || !author || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: bookName, author, price',
      });
    }

    // Create new book
    const book = new Book({
      bookName,
      author,
      price,
      available: available !== undefined ? available : true,
    });

    const savedBook = await book.save();

    return res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: savedBook,
    });
  } catch (error) {
    console.error('Error creating book:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    console.error('Error retrieving books:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

module.exports = {
  createBook,
  getBooks,
};
