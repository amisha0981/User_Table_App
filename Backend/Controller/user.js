const User = require('../Model/user')


// Get paginated users
const getUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const { name, email, ageMin, ageMax } = req.query;

    // query for filtering
    const query = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' }; 
    }
    if (email) {
      query.email = { $regex: email, $options: 'i' }; 
    }
    if (ageMin) {
      query.age = { ...query.age, $gt: parseInt(ageMin) }; 
    }
    if (ageMax) {
      query.age = { ...query.age, $lte: parseInt(ageMax) }; 
    }

    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .select('name email age');
    const total = await User.countDocuments(query);

    if (!users || users.length === 0) {
      return res.status(404).json({
        status: false,
        message: 'Users not found',
        data: [],
        totalPages: 0,
        currentPage: page,
      });
    }

    return res.json({
      status: true,
      data: users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Server error', error });
  }
};



// post 5000 users
const postUsers = async (req, res) => {
  const users = Array.from({ length: 5000 }, (_, i) => ({
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    age: Math.floor(Math.random() * (80 - 18 + 1)) + 18,
  }));

  try {
    await User.deleteMany({});
    await User.insertMany(users);
    res.status(201).json({status : true ,  message: 'Successfully created 5000 users' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding users', error });
  }
};



module.exports = { getUsers, postUsers };