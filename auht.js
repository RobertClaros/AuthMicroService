const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://audioprobolivia:znlz4KRkSJUy0SWD@cluster0.i33ai1o.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


// Función para cerrar la conexión a MongoDB
const closeMongoDBConnection = async () => {
  try {
    await client.close();
    console.log("Connection to MongoDB Atlas closed");
  } catch (error) {
    console.error("Error closing connection to MongoDB Atlas", error);
    process.exit(1);
  }
};

const registerUser = async (username, password) => {
  try {
    const specialCharacters = /[!@#$%^&*(),.?":{}|<>]/;
    if (specialCharacters.test(username)) {
      throw new Error('Invalid username');
    }

    const db = client.db();
    const existingUser = await db.collection('users').findOne({ username });
    if (existingUser) {
      throw new Error('User already registered');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.collection('users').insertOne({ username, password: hashedPassword });

    return { success: true, message: 'Registration successful' };
  } catch (error) {
    console.error(error);
    if (error.message === 'Invalid username') {
      return { success: false, message: 'Invalid username' };
    }
    return { success: false, message: 'Registration failed' };
  }
};

const loginUser = async (username, password) => {
  try {
    const db = client.db();
    const user = await db.collection('users').findOne({ username });
    if (!user) {
      throw new Error('Invalid username or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ username }, 'mySecretKey');
    
    return { success: true, token };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Login failed' };
  }
};

const authenticateToken = async (token) => {
  try {
    const decoded = jwt.verify(token, 'mySecretKey');
    return { success: true, user: decoded };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Invalid token' };
  }
};

module.exports = { registerUser, loginUser, authenticateToken };

// Cierra la conexión a MongoDB después de la ejecución del código
closeMongoDBConnection();
